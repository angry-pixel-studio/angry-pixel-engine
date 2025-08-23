import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { Scene, Entity, EntityComponent, EntityWithComponentsAndChildren, System } from "../types/scene";
import { exampleScene } from "../data/example-scene";

// Enable MapSet support for Immer
enableMapSet();

interface SceneState {
    // Scene data
    scene: Scene;

    // Internal Maps for better performance
    entitiesMap: Map<string, EntityWithComponentsAndChildren>;
    componentsMap: Map<string, EntityComponent[]>;
    systemsMap: Map<string, System>;

    // Scene actions
    updateEntity: (entityId: string, updates: Partial<Entity>) => void;
    updateComponent: (entityId: string, componentId: string, updates: Partial<EntityComponent>) => void;
    addEntity: (entity: EntityWithComponentsAndChildren, parentId?: string) => void;
    removeEntity: (entityId: string) => void;
    duplicateEntity: (entityId: string) => void;
    updateScene: (updates: Partial<Scene>) => void;

    // System actions
    addSystem: (system: System) => void;
    removeSystem: (systemId: string) => void;
    updateSystem: (systemId: string, updates: Partial<System>) => void;

    // Utility functions
    getSceneJson: () => string;
    getEntityById: (id: string) => EntityWithComponentsAndChildren | null;
    getComponentById: (entityId: string, componentId: string) => EntityComponent | null;
    getSystemById: (id: string) => System | null;

    // Helper to sync Maps with scene data
    syncMapsWithScene: () => void;
}

// Helper function to create Maps from scene data
const createMapsFromScene = (scene: Scene) => {
    const entitiesMap = new Map<string, EntityWithComponentsAndChildren>();
    const componentsMap = new Map<string, EntityComponent[]>();
    const systemsMap = new Map<string, System>();

    const processEntity = (entity: EntityWithComponentsAndChildren) => {
        entitiesMap.set(entity.id, entity);
        componentsMap.set(entity.id, entity.components);

        if (entity.children) {
            entity.children.forEach(processEntity);
        }
    };

    scene.entities.forEach(processEntity);

    // Process systems
    scene.systems.forEach((system) => {
        systemsMap.set(system.id, system);
    });

    return { entitiesMap, componentsMap, systemsMap };
};

export const useSceneStore = create<SceneState>()(
    devtools(
        immer((set, get) => ({
            // Initial state
            scene: exampleScene,
            entitiesMap: createMapsFromScene(exampleScene).entitiesMap,
            componentsMap: createMapsFromScene(exampleScene).componentsMap,
            systemsMap: createMapsFromScene(exampleScene).systemsMap,

            // Initialize Maps
            syncMapsWithScene: () => {
                set((state) => {
                    const { entitiesMap, componentsMap } = createMapsFromScene(state.scene);
                    state.entitiesMap = entitiesMap;
                    state.componentsMap = componentsMap;
                });
            },

            // Scene actions
            updateEntity: (entityId, updates) => {
                set((state) => {
                    // Update in scene
                    const updateEntityRecursive = (entities: EntityWithComponentsAndChildren[]) => {
                        for (const entity of entities) {
                            if (entity.id === entityId) {
                                Object.assign(entity, updates);
                                return;
                            }
                            if (entity.children) {
                                updateEntityRecursive(entity.children);
                            }
                        }
                    };

                    updateEntityRecursive(state.scene.entities);

                    // Update in Maps
                    const entity = state.entitiesMap.get(entityId);
                    if (entity) {
                        Object.assign(entity, updates);
                    }
                });
            },

            updateComponent: (entityId, componentId, updates) => {
                set((state) => {
                    // Update in scene
                    const updateComponentRecursive = (entities: EntityWithComponentsAndChildren[]) => {
                        for (const entity of entities) {
                            if (entity.id === entityId) {
                                const component = entity.components.find((comp) => comp.id === componentId);
                                if (component) {
                                    Object.assign(component, updates);
                                }
                                return;
                            }
                            if (entity.children) {
                                updateComponentRecursive(entity.children);
                            }
                        }
                    };

                    updateComponentRecursive(state.scene.entities);

                    // Update in Maps
                    const entityComponents = state.componentsMap.get(entityId);
                    if (entityComponents) {
                        const component = entityComponents.find((comp) => comp.id === componentId);
                        if (component) {
                            Object.assign(component, updates);
                        }
                    }
                });
            },

            addEntity: (entity, parentId) => {
                set((state) => {
                    if (!parentId) {
                        state.scene.entities.push(entity);
                    } else {
                        const addEntityRecursive = (entities: EntityWithComponentsAndChildren[]) => {
                            for (const e of entities) {
                                if (e.id === parentId) {
                                    if (!e.children) {
                                        e.children = [];
                                    }
                                    e.children.push(entity);
                                    return;
                                }
                                if (e.children) {
                                    addEntityRecursive(e.children);
                                }
                            }
                        };

                        addEntityRecursive(state.scene.entities);
                    }

                    // Update Maps
                    state.entitiesMap.set(entity.id, entity);
                    state.componentsMap.set(entity.id, entity.components);
                });
            },

            removeEntity: (entityId) => {
                set((state) => {
                    // Remove from scene
                    const removeEntityRecursive = (entities: EntityWithComponentsAndChildren[]) => {
                        for (let i = entities.length - 1; i >= 0; i--) {
                            if (entities[i].id === entityId) {
                                entities.splice(i, 1);
                                return;
                            }
                            if (entities[i].children) {
                                removeEntityRecursive(entities[i].children);
                            }
                        }
                    };

                    removeEntityRecursive(state.scene.entities);

                    // Remove from Maps
                    state.entitiesMap.delete(entityId);
                    state.componentsMap.delete(entityId);
                });
            },

            duplicateEntity: (entityId) => {
                set((state) => {
                    // Duplicate in scene
                    const duplicateEntityRecursive = (entities: EntityWithComponentsAndChildren[]) => {
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
                                    const updateChildrenIds = (children: EntityWithComponentsAndChildren[]) => {
                                        for (const child of children) {
                                            child.id = crypto.randomUUID();
                                            if (child.children) {
                                                updateChildrenIds(child.children);
                                            }
                                        }
                                    };
                                    updateChildrenIds(duplicated.children);
                                }

                                entities.push(duplicated);
                                return;
                            }
                            if (entity.children) {
                                duplicateEntityRecursive(entity.children);
                            }
                        }
                    };

                    duplicateEntityRecursive(state.scene.entities);

                    // Update Maps
                    get().syncMapsWithScene();
                });
            },

            updateScene: (updates) => {
                set((state) => {
                    Object.assign(state.scene, updates);
                    // Update Maps after scene changes
                    get().syncMapsWithScene();
                });
            },

            // System actions
            addSystem: (system) => {
                set((state) => {
                    state.scene.systems.push(system);
                    state.systemsMap.set(system.id, system);
                });
            },

            removeSystem: (systemId) => {
                set((state) => {
                    const index = state.scene.systems.findIndex((sys) => sys.id === systemId);
                    if (index !== -1) {
                        state.scene.systems.splice(index, 1);
                    }
                    state.systemsMap.delete(systemId);
                });
            },

            updateSystem: (systemId, updates) => {
                set((state) => {
                    // Update in scene
                    const system = state.scene.systems.find((sys) => sys.id === systemId);
                    if (system) {
                        Object.assign(system, updates);
                    }

                    // Update in Map
                    const mapSystem = state.systemsMap.get(systemId);
                    if (mapSystem) {
                        Object.assign(mapSystem, updates);
                    }
                });
            },

            // Utility functions
            getSceneJson: () => {
                const state = get();
                return JSON.stringify(state.scene, null, 2);
            },

            getEntityById: (id) => {
                const state = get();
                return state.entitiesMap.get(id) || null;
            },

            getComponentById: (entityId, componentId) => {
                const entityComponents = get().componentsMap.get(entityId);
                if (!entityComponents) return null;

                return entityComponents.find((comp) => comp.id === componentId) || null;
            },

            getSystemById: (id) => {
                const state = get();
                return state.systemsMap.get(id) || null;
            },
        })),
        {
            name: "scene-store",
        },
    ),
);
