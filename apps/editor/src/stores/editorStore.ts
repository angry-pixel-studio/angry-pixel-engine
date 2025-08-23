import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Entity, EntityComponent } from "../types/scene";

export interface EditorState {
    // Selection state
    selectedEntity: Entity | null;
    selectedComponent: EntityComponent | null;

    // Entity inspector state
    entityInspector: {
        entityName: string;
        entityEnabled: boolean;
        expandedComponents: Set<string>;
        expandedProperties: Set<string>;
    };

    // Panel sizes for resizable panels
    panelSizes: {
        sceneTree: number;
        filesystemNav: number;
        entityInspector: number;
    };
}

interface EditorActions {
    // Selection actions
    selectEntity: (entity: Entity | null) => void;
    selectComponent: (component: EntityComponent | null) => void;

    // Entity inspector actions
    setEntityName: (name: string) => void;
    setEntityEnabled: (enabled: boolean) => void;
    toggleComponentExpanded: (componentId: string) => void;
    togglePropertyExpanded: (propertyId: string) => void;

    // Panel size management
    setPanelSize: (panel: keyof EditorState["panelSizes"], size: number) => void;
}

export const useEditorStore = create<EditorState & EditorActions>()(
    devtools(
        immer((set) => ({
            // Initial state
            selectedEntity: null,
            selectedComponent: null,
            entityInspector: {
                entityName: "",
                entityEnabled: true,
                expandedComponents: new Set(),
                expandedProperties: new Set(),
            },
            panelSizes: {
                sceneTree: 256,
                filesystemNav: 192,
                entityInspector: 320,
            },

            // Actions
            // Selection actions
            selectEntity: (entity) => {
                set((state) => {
                    state.selectedEntity = entity;
                    state.selectedComponent = null;

                    // Update entity inspector state
                    if (entity) {
                        state.entityInspector.entityName = entity.name;
                        state.entityInspector.entityEnabled = entity.enabled;
                    } else {
                        state.entityInspector.entityName = "";
                        state.entityInspector.entityEnabled = true;
                    }
                });
            },

            selectComponent: (component) => {
                set((state) => {
                    state.selectedComponent = component;
                });
            },

            // Entity inspector actions
            setEntityName: (name) => {
                set((state) => {
                    state.entityInspector.entityName = name;
                    if (state.selectedEntity) {
                        state.selectedEntity.name = name;
                    }
                });
            },

            setEntityEnabled: (enabled) => {
                set((state) => {
                    state.entityInspector.entityEnabled = enabled;
                    if (state.selectedEntity) {
                        state.selectedEntity.enabled = enabled;
                    }
                });
            },

            toggleComponentExpanded: (componentId) => {
                set((state) => {
                    if (state.entityInspector.expandedComponents.has(componentId)) {
                        state.entityInspector.expandedComponents.delete(componentId);
                    } else {
                        state.entityInspector.expandedComponents.add(componentId);
                    }
                });
            },

            togglePropertyExpanded: (propertyId) => {
                set((state) => {
                    if (state.entityInspector.expandedProperties.has(propertyId)) {
                        state.entityInspector.expandedProperties.delete(propertyId);
                    } else {
                        state.entityInspector.expandedProperties.add(propertyId);
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
