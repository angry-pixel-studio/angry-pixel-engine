// ============================================================================
// UI SLICE - Layout, Panel Sizes, Preferences
// ============================================================================

export interface UISlice {
    // Panel sizes
    panelSizes: {
        sceneTree: number;
        filesystemNav: number;
        entityInspector: number;
    };

    // Actions
    setPanelSize: (panel: keyof UISlice["panelSizes"], size: number) => void;
}

export const createUISlice = (set: any): UISlice => ({
    panelSizes: {
        sceneTree: 256,
        filesystemNav: 220,
        entityInspector: 380,
    },

    setPanelSize: (panel, size) => {
        set((state: any) => {
            state.panelSizes[panel] = size;
        });
    },
});
