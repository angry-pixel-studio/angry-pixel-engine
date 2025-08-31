import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { 
    EditorSlice, 
    SceneSlice, 
    UISlice,
    createEditorSlice,
    createSceneSlice,
    createUISlice
} from "./slices";

// Enable MapSet support for Immer
enableMapSet();

// ============================================================================
// MAIN APP STORE
// ============================================================================

export interface AppState extends EditorSlice, SceneSlice, UISlice {}

export const useAppStore = create<AppState>()(
    devtools(
        immer((set, get) => ({
            ...createEditorSlice(set, get),
            ...createSceneSlice(set, get),
            ...createUISlice(set),
        })),
        {
            name: "app-store",
        },
    ),
);

// ============================================================================
// SELECTORS FOR BETTER PERFORMANCE
// ============================================================================

// Editor selectors
export const useSelectedEntity = () => useAppStore((state) => state.selectedEntityId);
export const useEntityInspector = () => useAppStore((state) => state.entityInspector);
export const useSelectEntity = () => useAppStore((state) => state.selectEntity);
export const useSetEntityName = () => useAppStore((state) => state.setEntityName);
export const useSetEntityEnabled = () => useAppStore((state) => state.setEntityEnabled);
export const useToggleComponentCollapsed = () => useAppStore((state) => state.toggleComponentCollapsed);
export const useSetComponentEnabled = () => useAppStore((state) => state.setComponentEnabled);
export const useUpdateComponentProperty = () => useAppStore((state) => state.updateComponentProperty);

// Scene selectors
export const useScene = () => useAppStore((state) => state.scene);
export const useEntitiesMap = () => useAppStore((state) => state.entitiesMap);
export const useComponentsMap = () => useAppStore((state) => state.componentsMap);
export const useSystemsMap = () => useAppStore((state) => state.systemsMap);
export const useGetSceneJson = () => useAppStore((state) => state.getSceneJson);
export const useGetEntityById = () => useAppStore((state) => state.getEntityById);
export const useGetComponentById = () => useAppStore((state) => state.getComponentById);
export const useGetSystemById = () => useAppStore((state) => state.getSystemById);

// UI selectors
export const usePanelSizes = () => useAppStore((state) => state.panelSizes);
export const useSetPanelSize = () => useAppStore((state) => state.setPanelSize);
