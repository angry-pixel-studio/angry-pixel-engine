import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface EditorState {
    entities: any[];
    selectedEntity: any | null;
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
}

interface EditorActions {
    setTool: (tool: EditorState["tool"]) => void;
    setCameraPosition: (position: { x: number; y: number }) => void;
    setCameraZoom: (zoom: number) => void;
    toggleGrid: () => void;
    setGridSize: (size: number) => void;
    toggleGridSnap: () => void;
    setPanelSize: (panel: keyof EditorState["panelSizes"], size: number) => void;
}

export const useEditorStore = create<EditorState & EditorActions>()(
    devtools(
        (set, get) => ({
            // Initial state
            entities: [],
            selectedEntity: null,
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

            // Actions
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
        }),
        {
            name: "editor-store",
        },
    ),
);
