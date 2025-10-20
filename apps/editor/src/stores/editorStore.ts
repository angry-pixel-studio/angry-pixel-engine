import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { Entity } from "../types/scene";
import { BuiltInComponent } from "../types/component";
import { exampleScene } from "../data/example-scene";

// Enable MapSet support for Immer
enableMapSet();

export interface EditorState {
    selectedEntityId: string | null;
    entityInspector: {
        collapsedComponents: Set<string>;
    };
    panelSizes: {
        sceneTree: number;
        filesystemNav: number;
        entityInspector: number;
    };
    activeInspectorTab: string;
    layers: {
        renderLayers: string[];
        collisionLayers: string[];
    };
}

interface EditorActions {
    selectEntity: (entity: Entity | null) => void;
    toggleComponentCollapsed: (componentId: string) => void;
    setPanelSize: (panel: keyof EditorState["panelSizes"], size: number) => void;
    setActiveInspectorTab: (tabId: string) => void;
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
                    if (entity) state.activeInspectorTab = "entityInspector";
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
