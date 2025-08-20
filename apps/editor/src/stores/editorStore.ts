import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { exampleScene } from "../data/example-scene";
import { Scene, Entity, EntityComponent } from "../types/scene";

export interface EditorState {
    // Scene data
    scene: Scene;
    selectedEntity: Entity | null;
    selectedComponent: EntityComponent | null;

    // Editor state
    camera: {
        position: { x: number; y: number };
        zoom: number;
    };
    tool: "select" | "move" | "create" | "delete";
    grid: {
        enabled: boolean;
        size: number;
        snap: boolean;
    };
    panelSizes: {
        sceneTree: number;
        filesystemNav: number;
        entityInspector: number;
    };

    // History for undo/redo
    history: {
        operations: any[];
        currentIndex: number;
        maxSize: number;
    };
}

interface EditorActions {
    // Scene actions
    selectEntity: (entity: Entity | null) => void;
    selectComponent: (component: EntityComponent | null) => void;
    updateEntity: (entityId: string, updates: Partial<Entity>) => void;
    updateComponent: (entityId: string, componentId: string, updates: Partial<EntityComponent>) => void;
    addEntity: (entity: Entity, parentId?: string) => void;
    removeEntity: (entityId: string) => void;
    duplicateEntity: (entityId: string) => void;
    updateScene: (updates: Partial<Scene>) => void;

    // Editor actions
    setTool: (tool: EditorState["tool"]) => void;
    setCameraPosition: (position: { x: number; y: number }) => void;
    setCameraZoom: (zoom: number) => void;
    toggleGrid: () => void;
    setGridSize: (size: number) => void;
    toggleGridSnap: () => void;
    setPanelSize: (panel: keyof EditorState["panelSizes"], size: number) => void;

    // History actions
    undo: () => void;
    redo: () => void;
    addToHistory: (operation: any) => void;
}

export const useEditorStore = create<EditorState & EditorActions>()(
    devtools(
        (set, get) => ({
            // Initial state
            scene: exampleScene,
            selectedEntity: null,
            selectedComponent: null,
            camera: {
                position: { x: 0, y: 0 },
                zoom: 1,
            },
            tool: "select",
            grid: {
                enabled: true,
                size: 16,
                snap: true,
            },
            panelSizes: {
                sceneTree: 256,
                filesystemNav: 192,
                entityInspector: 320,
            },
            history: {
                operations: [],
                currentIndex: -1,
                maxSize: 50,
            },

            // Actions
            // Scene actions
            selectEntity: (entity) => {
                set({ selectedEntity: entity, selectedComponent: null });
            },

            selectComponent: (component) => {
                set({ selectedComponent: component });
            },

            updateEntity: (entityId, updates) => {
                set((state) => {
                    const updateEntityRecursive = (entities: Entity[]): Entity[] => {
                        return entities.map((entity) => {
                            if (entity.id === entityId) {
                                return { ...entity, ...updates };
                            }
                            if (entity.children) {
                                return { ...entity, children: updateEntityRecursive(entity.children) };
                            }
                            return entity;
                        });
                    };

                    return {
                        scene: {
                            ...state.scene,
                            entities: updateEntityRecursive(state.scene.entities),
                        },
                    };
                });
            },

            updateComponent: (entityId, componentId, updates) => {
                set((state) => {
                    const updateComponentRecursive = (entities: Entity[]): Entity[] => {
                        return entities.map((entity) => {
                            if (entity.id === entityId) {
                                return {
                                    ...entity,
                                    components: entity.components.map((comp) =>
                                        comp.id === componentId ? { ...comp, ...updates } : comp,
                                    ),
                                };
                            }
                            if (entity.children) {
                                return { ...entity, children: updateComponentRecursive(entity.children) };
                            }
                            return entity;
                        });
                    };

                    return {
                        scene: {
                            ...state.scene,
                            entities: updateComponentRecursive(state.scene.entities),
                        },
                    };
                });
            },

            addEntity: (entity, parentId) => {
                set((state) => {
                    if (!parentId) {
                        return {
                            scene: {
                                ...state.scene,
                                entities: [...state.scene.entities, entity],
                            },
                        };
                    }

                    const addEntityRecursive = (entities: Entity[]): Entity[] => {
                        return entities.map((e) => {
                            if (e.id === parentId) {
                                return { ...e, children: [...(e.children || []), entity] };
                            }
                            if (e.children) {
                                return { ...e, children: addEntityRecursive(e.children) };
                            }
                            return e;
                        });
                    };

                    return {
                        scene: {
                            ...state.scene,
                            entities: addEntityRecursive(state.scene.entities),
                        },
                    };
                });
            },

            removeEntity: (entityId) => {
                set((state) => {
                    const removeEntityRecursive = (entities: Entity[]): Entity[] => {
                        return entities.filter((entity) => {
                            if (entity.id === entityId) return false;
                            if (entity.children) {
                                entity.children = removeEntityRecursive(entity.children);
                            }
                            return true;
                        });
                    };

                    return {
                        scene: {
                            ...state.scene,
                            entities: removeEntityRecursive(state.scene.entities),
                        },
                        selectedEntity: state.selectedEntity?.id === entityId ? null : state.selectedEntity,
                    };
                });
            },

            duplicateEntity: (entityId) => {
                set((state) => {
                    const duplicateEntityRecursive = (entities: Entity[]): Entity[] => {
                        return entities.map((entity) => {
                            if (entity.id === entityId) {
                                const duplicated = {
                                    ...entity,
                                    id: crypto.randomUUID(),
                                    name: `${entity.name} (Copy)`,
                                    children: entity.children ? duplicateEntityRecursive(entity.children) : undefined,
                                };
                                return duplicated;
                            }
                            if (entity.children) {
                                return { ...entity, children: duplicateEntityRecursive(entity.children) };
                            }
                            return entity;
                        });
                    };

                    return {
                        scene: {
                            ...state.scene,
                            entities: duplicateEntityRecursive(state.scene.entities),
                        },
                    };
                });
            },

            updateScene: (updates) => {
                set((state) => ({
                    scene: { ...state.scene, ...updates },
                }));
            },

            // Editor actions
            setTool: (tool) => {
                set({ tool });
            },

            setCameraPosition: (position) => {
                set((state) => ({
                    camera: { ...state.camera, position },
                }));
            },

            setCameraZoom: (zoom) => {
                set((state) => ({
                    camera: { ...state.camera, zoom },
                }));
            },

            toggleGrid: () => {
                set((state) => ({
                    grid: { ...state.grid, enabled: !state.grid.enabled },
                }));
            },

            setGridSize: (size) => {
                set((state) => ({
                    grid: { ...state.grid, size },
                }));
            },

            toggleGridSnap: () => {
                set((state) => ({
                    grid: { ...state.grid, snap: !state.grid.snap },
                }));
            },

            setPanelSize: (panel, size) => {
                set((state) => ({
                    panelSizes: { ...state.panelSizes, [panel]: size },
                }));
            },

            // History actions
            undo: () => {
                set((state) => {
                    if (state.history.currentIndex > 0) {
                        return {
                            history: {
                                ...state.history,
                                currentIndex: state.history.currentIndex - 1,
                            },
                        };
                    }
                    return state;
                });
            },

            redo: () => {
                set((state) => {
                    if (state.history.currentIndex < state.history.operations.length - 1) {
                        return {
                            history: {
                                ...state.history,
                                currentIndex: state.history.currentIndex + 1,
                            },
                        };
                    }
                    return state;
                });
            },

            addToHistory: (operation) => {
                set((state) => {
                    const newOperations = state.history.operations.slice(0, state.history.currentIndex + 1);
                    newOperations.push(operation);

                    if (newOperations.length > state.history.maxSize) {
                        newOperations.shift();
                    }

                    return {
                        history: {
                            operations: newOperations,
                            currentIndex: newOperations.length - 1,
                            maxSize: state.history.maxSize,
                        },
                    };
                });
            },
        }),
        {
            name: "editor-store",
        },
    ),
);
