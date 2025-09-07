import { useEditorStore } from "../stores/editorStore";
import { useSceneStore } from "../stores/sceneStore";

/**
 * Custom hook that combines both editor and scene stores
 * This provides a unified interface for components that need both stores
 */
export const useEditor = () => {
    const editorStore = useEditorStore();
    const sceneStore = useSceneStore();

    // Get the selected entity from scene store using the ID
    const selectedEntity = editorStore.selectedEntityId ? sceneStore.getEntityById(editorStore.selectedEntityId) : null;

    return {
        // Editor state (selection and inspector)
        selectedEntityId: editorStore.selectedEntityId,
        selectedEntity,
        entityInspector: editorStore.entityInspector,
        panelSizes: editorStore.panelSizes,
        activeInspectorTab: editorStore.activeInspectorTab,
        layers: editorStore.layers,

        // Editor actions
        selectEntity: editorStore.selectEntity,
        setEntityName: editorStore.setEntityName,
        setEntityEnabled: editorStore.setEntityEnabled,
        toggleComponentCollapsed: editorStore.toggleComponentCollapsed,
        setComponentEnabled: editorStore.setComponentEnabled,
        updateComponentProperty: editorStore.updateComponentProperty,
        addComponent: editorStore.addComponent,
        setPanelSize: editorStore.setPanelSize,
        setActiveInspectorTab: editorStore.setActiveInspectorTab,
        setRenderLayers: editorStore.setRenderLayers,
        setCollisionLayers: editorStore.setCollisionLayers,

        // Scene state
        // scene: sceneStore.scene,
        systemsMap: sceneStore.systemsMap,
        entitiesMap: sceneStore.entitiesMap,
        componentsMap: sceneStore.componentsMap,
        assetsMap: sceneStore.assetsMap,

        // Scene actions
        updateSystems: sceneStore.updateSystems,
        getSceneJson: sceneStore.getSceneJson,
        getEntityById: sceneStore.getEntityById,
        getComponentById: sceneStore.getComponentById,
        getSystemById: sceneStore.getSystemById,
        getAssetsByType: sceneStore.getAssetsByType,
    };
};
