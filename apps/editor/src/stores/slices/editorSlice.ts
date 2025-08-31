import { EntityWithChildren, EntityComponent } from "../../types/scene";

// ============================================================================
// EDITOR SLICE - UI State, Selection, Inspector
// ============================================================================

export interface EditorSlice {
    // Selection state
    selectedEntityId: string | null;

    // Entity inspector state
    entityInspector: {
        entityName: string;
        entityEnabled: boolean;
        collapsedComponents: Set<string>;
        components: Map<string, EntityComponent>;
    };

    // Actions
    selectEntity: (entity: EntityWithChildren | null) => void;
    setEntityName: (name: string) => void;
    setEntityEnabled: (enabled: boolean) => void;
    toggleComponentCollapsed: (componentId: string) => void;
    setComponentEnabled: (componentId: string, enabled: boolean) => void;
    updateComponentProperty: (componentId: string, propertyName: string, value: unknown) => void;
}

export const createEditorSlice = (set: any, get: any): EditorSlice => ({
    selectedEntityId: null,
    entityInspector: {
        entityName: "",
        entityEnabled: true,
        collapsedComponents: new Set(),
        components: new Map(),
    },

    selectEntity: (entity) => {
        set((state: any) => {
            state.selectedEntityId = entity?.id || null;

            if (entity) {
                state.entityInspector.entityName = entity.name;
                state.entityInspector.entityEnabled = entity.enabled;

                const components = get().componentsMap.get(entity.id);
                state.entityInspector.components = components
                    ? new Map(components.map((c: EntityComponent) => [c.id, c]))
                    : new Map();
            } else {
                state.entityInspector.entityName = "";
                state.entityInspector.entityEnabled = true;
                state.entityInspector.components = new Map();
            }
        });
    },

    setEntityName: (name) => {
        set((state: any) => {
            state.entityInspector.entityName = name;
            if (state.selectedEntityId) {
                get().updateEntity(state.selectedEntityId, { name });
            }
        });
    },

    setEntityEnabled: (enabled) => {
        set((state: any) => {
            state.entityInspector.entityEnabled = enabled;
            if (state.selectedEntityId) {
                get().updateEntity(state.selectedEntityId, { enabled });
            }
        });
    },

    setComponentEnabled: (componentId, enabled) => {
        set((state: any) => {
            const component = state.entityInspector.components.get(componentId);
            if (component) {
                component.enabled = enabled;
                if (state.selectedEntityId) {
                    get().updateComponent(state.selectedEntityId, componentId, { enabled });
                }
            }
        });
    },

    toggleComponentCollapsed: (componentId) => {
        set((state: any) => {
            if (state.entityInspector.collapsedComponents.has(componentId)) {
                state.entityInspector.collapsedComponents.delete(componentId);
            } else {
                state.entityInspector.collapsedComponents.add(componentId);
            }
        });
    },

    updateComponentProperty: (componentId, propertyName, value) => {
        set((state: any) => {
            const component = state.entityInspector.components.get(componentId);
            if (component && component.data) {
                const updatedComponent = {
                    ...component,
                    data: {
                        ...component.data,
                        [propertyName]: value,
                    },
                };

                state.entityInspector.components.set(componentId, updatedComponent);

                if (state.selectedEntityId) {
                    get().updateComponent(state.selectedEntityId, componentId, {
                        data: updatedComponent.data,
                    });
                }
            }
        });
    },
});
