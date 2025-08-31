// ============================================================================
// STORES INDEX - Export everything from stores
// ============================================================================

// Main consolidated store
export { useAppStore } from './appStore';
export type { AppState } from './appStore';

// Slice interfaces and creators
export * from './slices';

// Performance-optimized selectors
export {
    // Editor selectors
    useSelectedEntity,
    useEntityInspector,
    useSelectEntity,
    useSetEntityName,
    useSetEntityEnabled,
    useToggleComponentCollapsed,
    useSetComponentEnabled,
    useUpdateComponentProperty,
    
    // Scene selectors
    useScene,
    useEntitiesMap,
    useComponentsMap,
    useSystemsMap,
    useGetSceneJson,
    useGetEntityById,
    useGetComponentById,
    useGetSystemById,
    
    // UI selectors
    usePanelSizes,
    useSetPanelSize,
} from './appStore';
