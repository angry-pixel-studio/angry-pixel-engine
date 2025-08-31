import { useAppStore } from "../stores";

/**
 * Custom hook that provides access to the consolidated app store
 * This provides a unified interface for components that need multiple store slices
 */
export const useEditor = () => {
    const store = useAppStore();

    // Get the selected entity from scene store using the ID
    const selectedEntity = store.selectedEntityId ? store.getEntityById(store.selectedEntityId) : null;

    return {
        // Editor state (selection and inspector)
        selectedEntityId: store.selectedEntityId,
        selectedEntity,
        entityInspector: store.entityInspector,
        panelSizes: store.panelSizes,

        // Editor actions
        selectEntity: store.selectEntity,
        setEntityName: store.setEntityName,
        setEntityEnabled: store.setEntityEnabled,
        toggleComponentCollapsed: store.toggleComponentCollapsed,
        setComponentEnabled: store.setComponentEnabled,
        updateComponentProperty: store.updateComponentProperty,
        setPanelSize: store.setPanelSize,

        // Scene state
        systemsMap: store.systemsMap,
        entitiesMap: store.entitiesMap,
        componentsMap: store.componentsMap,

        // Scene actions
        updateSystems: store.updateSystems,
        getSceneJson: store.getSceneJson,
        getEntityById: store.getEntityById,
        getComponentById: store.getComponentById,
        getSystemById: store.getSystemById,
    };
};
