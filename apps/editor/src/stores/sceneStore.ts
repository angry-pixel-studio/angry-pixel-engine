import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Scene, Entity, EntityComponent } from "../types/scene";
import { exampleScene } from "../data/example-scene";

interface SceneState {
    // Scene data
    scene: Scene;

    // Scene actions
    updateEntity: (entityId: string, updates: Partial<Entity>) => void;
    updateComponent: (entityId: string, componentId: string, updates: Partial<EntityComponent>) => void;
    addEntity: (entity: Entity, parentId?: string) => void;
    removeEntity: (entityId: string) => void;
    duplicateEntity: (entityId: string) => void;
    updateScene: (updates: Partial<Scene>) => void;

    // Utility functions
    getSceneJson: () => string;
    getEntityById: (id: string) => Entity | null;
    getComponentById: (entityId: string, componentId: string) => EntityComponent | null;
}

export const useSceneStore = create<SceneState>()(
    devtools(
        immer((set, get) => ({
            // Initial state
            scene: exampleScene,

            // Scene actions
            updateEntity: (entityId, updates) => {
                set((state) => {
                    const updateEntityRecursive = (entities: Entity[]) => {
                        for (const entity of entities) {
                            if (entity.id === entityId) {
                                Object.assign(entity, updates);
                                return;
                            }
                            if (entity.children && entity.children.length > 0) {
                                updateEntityRecursive(entity.children);
                            }
                        }
                    };

                    updateEntityRecursive(state.scene.entities);
                });
            },

            updateComponent: (entityId, componentId, updates) => {
                set((state) => {
                    const updateComponentRecursive = (entities: Entity[]) => {
                        for (const entity of entities) {
                            if (entity.id === entityId) {
                                const component = entity.components.find((comp) => comp.id === componentId);
                                if (component) {
                                    Object.assign(component, updates);
                                }
                                return;
                            }
                            if (entity.children && entity.children.length > 0) {
                                updateComponentRecursive(entity.children);
                            }
                        }
                    };

                    updateComponentRecursive(state.scene.entities);
                });
            },

            addEntity: (entity, parentId) => {
                set((state) => {
                    if (!parentId) {
                        state.scene.entities.push(entity);
                        return;
                    }

                    const addEntityRecursive = (entities: Entity[]) => {
                        for (const e of entities) {
                            if (e.id === parentId) {
                                if (!e.children) {
                                    e.children = [];
                                }
                                e.children.push(entity);
                                return;
                            }
                            if (e.children && e.children.length > 0) {
                                addEntityRecursive(e.children);
                            }
                        }
                    };

                    addEntityRecursive(state.scene.entities);
                });
            },

            removeEntity: (entityId) => {
                set((state) => {
                    const removeEntityRecursive = (entities: Entity[]) => {
                        for (let i = entities.length - 1; i >= 0; i--) {
                            const entity = entities[i];
                            if (entity.id === entityId) {
                                entities.splice(i, 1);
                                return;
                            }
                            if (entity.children && entity.children.length > 0) {
                                removeEntityRecursive(entity.children);
                            }
                        }
                    };

                    removeEntityRecursive(state.scene.entities);
                });
            },

            duplicateEntity: (entityId) => {
                set((state) => {
                    const duplicateEntityRecursive = (entities: Entity[]) => {
                        for (const entity of entities) {
                            if (entity.id === entityId) {
                                const duplicated = {
                                    ...entity,
                                    id: crypto.randomUUID(),
                                    name: `${entity.name} (Copy)`,
                                    children: entity.children ? JSON.parse(JSON.stringify(entity.children)) : undefined,
                                };

                                // Update children IDs recursively
                                if (duplicated.children) {
                                    const updateChildrenIds = (children: Entity[]) => {
                                        for (const child of children) {
                                            child.id = crypto.randomUUID();
                                            if (child.children && child.children.length > 0) {
                                                updateChildrenIds(child.children);
                                            }
                                        }
                                    };
                                    updateChildrenIds(duplicated.children);
                                }

                                entities.push(duplicated);
                                return;
                            }
                            if (entity.children && entity.children.length > 0) {
                                duplicateEntityRecursive(entity.children);
                            }
                        }
                    };

                    duplicateEntityRecursive(state.scene.entities);
                });
            },

            updateScene: (updates) => {
                set((state) => {
                    Object.assign(state.scene, updates);
                });
            },

            // Utility functions
            getSceneJson: () => {
                const state = get();
                return JSON.stringify(state.scene, null, 2);
            },

            getEntityById: (id) => {
                const state = get();
                const findEntity = (entities: Entity[]): Entity | null => {
                    for (const entity of entities) {
                        if (entity.id === id) {
                            return entity;
                        }
                        if (entity.children && entity.children.length > 0) {
                            const found = findEntity(entity.children);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                return findEntity(state.scene.entities);
            },

            getComponentById: (entityId, componentId) => {
                const entity = get().getEntityById(entityId);
                if (!entity) return null;

                return entity.components.find((comp) => comp.id === componentId) || null;
            },
        })),
        {
            name: "scene-store",
        },
    ),
);
