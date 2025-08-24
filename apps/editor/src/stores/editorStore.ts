import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { EntityWithChildren, EntityComponent } from "../types/scene";
import { useSceneStore } from "./sceneStore";

// Enable MapSet support for Immer
enableMapSet();

export interface EditorState {
    // Selection state
    selectedEntityId: string | null;

    // Entity inspector state
    entityInspector: {
        entityName: string;
        entityEnabled: boolean;
        collapsedComponents: Set<string>;
        components: Map<string, EntityComponent>;
    };

    // Panel sizes
    panelSizes: {
        sceneTree: number;
        filesystemNav: number;
        entityInspector: number;
    };
}

interface EditorActions {
    // Selection actions
    selectEntity: (entity: EntityWithChildren | null) => void;

    // Entity inspector actions
    setEntityName: (name: string) => void;
    setEntityEnabled: (enabled: boolean) => void;
    toggleComponentCollapsed: (componentId: string) => void;
    setComponentEnabled: (componentId: string, enabled: boolean) => void;
    updateComponentProperty: (componentId: string, propertyName: string, value: unknown) => void;

    // Panel size management
    setPanelSize: (panel: keyof EditorState["panelSizes"], size: number) => void;
}

export const useEditorStore = create<EditorState & EditorActions>()(
    devtools(
        immer((set) => ({
            // Initial state
            selectedEntityId: null,
            entityInspector: {
                entityName: "",
                entityEnabled: true,
                collapsedComponents: new Set(),
                components: new Map(),
            },
            panelSizes: {
                sceneTree: 256,
                filesystemNav: 220,
                entityInspector: 380,
            },

            // Actions
            // Selection actions
            selectEntity: (entity) => {
                set((state) => {
                    state.selectedEntityId = entity?.id || null;

                    if (entity) {
                        state.entityInspector.entityName = entity.name;
                        state.entityInspector.entityEnabled = entity.enabled;

                        const components = useSceneStore.getState().componentsMap.get(entity.id);
                        state.entityInspector.components = components
                            ? new Map(components.map((c) => [c.id, c]))
                            : new Map();
                    } else {
                        state.entityInspector.entityName = "";
                        state.entityInspector.entityEnabled = true;
                        state.entityInspector.components = new Map();
                    }
                });
            },

            // Entity inspector actions
            setEntityName: (name) => {
                set((state) => {
                    state.entityInspector.entityName = name;
                    if (state.selectedEntityId) {
                        const sceneStore = useSceneStore.getState();
                        sceneStore.updateEntity(state.selectedEntityId, { name });
                    }
                });
            },

            setEntityEnabled: (enabled) => {
                set((state) => {
                    state.entityInspector.entityEnabled = enabled;
                    if (state.selectedEntityId) {
                        const sceneStore = useSceneStore.getState();
                        sceneStore.updateEntity(state.selectedEntityId, { enabled });
                    }
                });
            },

            setComponentEnabled: (componentId, enabled) => {
                set((state) => {
                    const component = state.entityInspector.components.get(componentId);
                    if (component) {
                        component.enabled = enabled;
                        if (state.selectedEntityId) {
                            const sceneStore = useSceneStore.getState();
                            sceneStore.updateComponent(state.selectedEntityId, componentId, { enabled });
                        }
                    }
                });
            },

            toggleComponentCollapsed: (componentId) => {
                set((state) => {
                    if (state.entityInspector.collapsedComponents.has(componentId)) {
                        state.entityInspector.collapsedComponents.delete(componentId);
                    } else {
                        state.entityInspector.collapsedComponents.add(componentId);
                    }
                });
            },

            updateComponentProperty: (componentId, propertyName, value) => {
                set((state) => {
                    const component = state.entityInspector.components.get(componentId);
                    if (component && component.data) {
                        // Create a new component object to avoid proxy conflicts
                        const updatedComponent = {
                            ...component,
                            data: {
                                ...component.data,
                                [propertyName]: value,
                            },
                        };

                        // Replace the component in the array
                        state.entityInspector.components.set(componentId, updatedComponent);

                        // Update the scene store automatically
                        if (state.selectedEntityId) {
                            const sceneStore = useSceneStore.getState();
                            sceneStore.updateComponent(state.selectedEntityId, componentId, {
                                data: updatedComponent.data,
                            });
                        }
                    }
                });
            },

            // Panel size management
            setPanelSize: (panel, size) => {
                set((state) => {
                    state.panelSizes[panel] = size;
                });
            },
        })),
        {
            name: "editor-store",
        },
    ),
);
