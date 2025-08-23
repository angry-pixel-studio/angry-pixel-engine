import { useEditorStore } from "../stores/editorStore";
import { useSceneStore } from "../stores/sceneStore";

/**
 * Custom hook that combines both editor and scene stores
 * This provides a unified interface for components that need both stores
 */
export const useEditor = () => {
    const editorStore = useEditorStore();
    const sceneStore = useSceneStore();

    return {
        // Editor state (selection and inspector)
        selectedEntity: editorStore.selectedEntity,
        selectedComponent: editorStore.selectedComponent,
        entityInspector: editorStore.entityInspector,
        panelSizes: editorStore.panelSizes,

        // Editor actions (selection and inspector)
        selectEntity: editorStore.selectEntity,
        selectComponent: editorStore.selectComponent,
        setEntityName: editorStore.setEntityName,
        setEntityEnabled: editorStore.setEntityEnabled,
        toggleComponentExpanded: editorStore.toggleComponentExpanded,
        togglePropertyExpanded: editorStore.togglePropertyExpanded,
        setPanelSize: editorStore.setPanelSize,

        // Scene state
        scene: sceneStore.scene,

        // Scene actions
        updateEntity: sceneStore.updateEntity,
        updateComponent: sceneStore.updateComponent,
        addEntity: sceneStore.addEntity,
        removeEntity: sceneStore.removeEntity,
        duplicateEntity: sceneStore.duplicateEntity,
        updateScene: sceneStore.updateScene,

        // Scene utilities
        getSceneJson: sceneStore.getSceneJson,
        getEntityById: sceneStore.getEntityById,
        getComponentById: sceneStore.getComponentById,
    };
};
