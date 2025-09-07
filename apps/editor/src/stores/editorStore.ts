import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { EntityWithChildren, EntityComponent } from "../types/scene";
import { useSceneStore } from "./sceneStore";
import { BuiltInComponent } from "../types/component";
import { v4 as uuid } from "uuid";
import { exampleScene } from "../data/example-scene";

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

    // Inspector tabs
    activeInspectorTab: string;

    layers: {
        renderLayers: string[];
        collisionLayers: string[];
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
    addComponent: (componentName: BuiltInComponent) => void;

    // Panel size management
    setPanelSize: (panel: keyof EditorState["panelSizes"], size: number) => void;

    // Inspector tab management
    setActiveInspectorTab: (tabId: string) => void;

    // Layers actions
    setRenderLayers: (layers: string[]) => void;
    setCollisionLayers: (layers: string[]) => void;
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
            activeInspectorTab: "entityInspector",
            layers: {
                renderLayers:
                    (exampleScene.entities
                        .find((e) => e.components.some((c) => c.name === BuiltInComponent.Camera))
                        ?.components?.find((c) => c.name === BuiltInComponent.Camera)?.data?.layers as string[]) ?? [],
                collisionLayers: [],
            },

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

                        // Automatically switch to entity inspector tab when an entity is selected
                        state.activeInspectorTab = "entityInspector";
                    } else {
                        state.entityInspector.entityName = "";
                        state.entityInspector.entityEnabled = true;
                        state.entityInspector.components = new Map();
                    }
                });
            },

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

            addComponent: (componentName: BuiltInComponent) => {
                set((state) => {
                    const sceneStore = useSceneStore.getState();
                    const component = {
                        enabled: true,
                        id: uuid(),
                        name: componentName,
                        data: {},
                        builtIn: true,
                    };
                    if (state.selectedEntityId) {
                        state.entityInspector.components.set(component.id, component);
                        sceneStore.addComponent(state.selectedEntityId, component);
                    }
                });
            },

            updateComponentProperty: (componentId, propertyName, value) => {
                set((state) => {
                    const component = state.entityInspector.components.get(componentId);
                    if (component) {
                        const updatedComponent = {
                            ...component,
                            data: {
                                ...(component.data ?? {}),
                                [propertyName]: value,
                            },
                        };

                        state.entityInspector.components.set(componentId, updatedComponent);

                        if (state.selectedEntityId) {
                            const sceneStore = useSceneStore.getState();
                            sceneStore.updateComponent(state.selectedEntityId, componentId, {
                                data: updatedComponent.data,
                            });
                        }
                    }
                });
            },

            setPanelSize: (panel, size) => {
                set((state) => {
                    state.panelSizes[panel] = size;
                });
            },

            setActiveInspectorTab: (tabId) => {
                set((state) => {
                    state.activeInspectorTab = tabId;
                });
            },

            setRenderLayers: (layers) => {
                set((state) => {
                    state.layers.renderLayers = layers;
                });
            },

            setCollisionLayers: (layers) => {
                set((state) => {
                    state.layers.collisionLayers = layers;
                });
            },
        })),
        {
            name: "editor-store",
        },
    ),
);
