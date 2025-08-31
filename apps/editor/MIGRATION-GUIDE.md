# Migration Guide: From Separate Stores to Consolidated AppStore

This guide helps you migrate from the old separate stores (`editorStore` and `sceneStore`) to the new consolidated `appStore` with slices organized in separate files.

## Quick Migration Checklist

- [ ] Replace `useEditorStore()` with `useAppStore()` or specific selectors
- [ ] Replace `useSceneStore()` with `useAppStore()` or specific selectors
- [ ] Update imports from `../stores/editorStore` to `../stores`
- [ ] Update imports from `../stores/sceneStore` to `../stores`
- [ ] Use `useEditor()` hook for components that need multiple slices
- [ ] Use specific selectors for components that only need specific state

## New File Structure

```
src/stores/
├── index.ts                 # Exporta todo desde stores
├── appStore.ts             # Store principal consolidado
├── slices/                 # Directorio de slices
│   ├── index.ts           # Exporta todos los slices
│   ├── editorSlice.ts     # EditorSlice interface y creator
│   ├── sceneSlice.ts      # SceneSlice interface y creator
│   └── uiSlice.ts         # UISlice interface y creator
├── editorStore.ts          # Store legacy (durante migración)
└── sceneStore.ts           # Store legacy (durante migración)
```

## Migration Examples

### 1. Basic Store Usage

**Before:**
```typescript
import { useEditorStore } from "../stores/editorStore";
import { useSceneStore } from "../stores/sceneStore";

const MyComponent = () => {
    const { selectedEntityId, selectEntity } = useEditorStore();
    const { scene, updateEntity } = useSceneStore();
    // ...
};
```

**After (Option 1 - Direct store access):**
```typescript
import { useAppStore } from "../stores";

const MyComponent = () => {
    const { selectedEntityId, selectEntity, scene, updateEntity } = useAppStore();
    // ...
};
```

**After (Option 2 - Specific selectors):**
```typescript
import { useSelectedEntity, useScene, useSelectEntity, useUpdateEntity } from "../stores";

const MyComponent = () => {
    const selectedEntityId = useSelectedEntity();
    const scene = useScene();
    const selectEntity = useSelectEntity();
    const updateEntity = useUpdateEntity();
    // ...
};
```

**After (Option 3 - Unified hook):**
```typescript
import { useEditor } from "../hooks/useEditor";

const MyComponent = () => {
    const { selectedEntityId, scene, selectEntity, updateEntity } = useEditor();
    // ...
};
```

### 2. Component Updates

**Before:**
```typescript
const { selectedEntityId, entityInspector } = useEditorStore();
const { entitiesMap, componentsMap } = useSceneStore();
```

**After:**
```typescript
const { selectedEntityId, entityInspector, entitiesMap, componentsMap } = useAppStore();
```

### 3. Action Calls

**Before:**
```typescript
const { selectEntity } = useEditorStore();
const { updateEntity } = useSceneStore();

const handleClick = () => {
    selectEntity(entity);
    updateEntity(entityId, { name: "New Name" });
};
```

**After:**
```typescript
const { selectEntity, updateEntity } = useAppStore();

const handleClick = () => {
    selectEntity(entity);
    updateEntity(entityId, { name: "New Name" });
};
```

## Performance Optimization with Selectors

### Use Specific Selectors for Better Performance

**Instead of:**
```typescript
const { selectedEntityId, entityInspector, panelSizes, scene, entitiesMap } = useAppStore();
```

**Use:**
```typescript
const selectedEntityId = useSelectedEntity();
const entityInspector = useEntityInspector();
const panelSizes = usePanelSizes();
const scene = useScene();
const entitiesMap = useEntitiesMap();
```

This ensures components only re-render when the specific state they use changes.

## Available Selectors

### Editor Selectors
- `useSelectedEntity()` - Returns `selectedEntityId`
- `useEntityInspector()` - Returns `entityInspector` object
- `useSelectEntity()` - Returns `selectEntity` function
- `useSetEntityName()` - Returns `setEntityName` function
- `useSetEntityEnabled()` - Returns `setEntityEnabled` function
- `useToggleComponentCollapsed()` - Returns `toggleComponentCollapsed` function
- `useSetComponentEnabled()` - Returns `setComponentEnabled` function
- `useUpdateComponentProperty()` - Returns `updateComponentProperty` function

### Scene Selectors
- `useScene()` - Returns `scene` object
- `useEntitiesMap()` - Returns `entitiesMap`
- `useComponentsMap()` - Returns `componentsMap`
- `useSystemsMap()` - Returns `systemsMap`
- `useGetSceneJson()` - Returns `getSceneJson` function
- `useGetEntityById()` - Returns `getEntityById` function
- `useGetComponentById()` - Returns `getComponentById` function
- `useGetSystemById()` - Returns `getSystemById` function

### UI Selectors
- `usePanelSizes()` - Returns `panelSizes` object
- `useSetPanelSize()` - Returns `setPanelSize` function

## Migration Strategy

### Phase 1: Quick Wins (Immediate)
1. Replace `useEditorStore()` with `useAppStore()`
2. Replace `useSceneStore()` with `useAppStore()`
3. Update imports to use `../stores` instead of specific files

### Phase 2: Performance Optimization (Next Sprint)
1. Replace `useAppStore()` with specific selectors
2. Use `useEditor()` hook for complex components
3. Profile and optimize re-renders

### Phase 3: Cleanup (Future)
1. Remove old store files
2. Update documentation
3. Add new selectors as needed

## Common Patterns

### For Components That Need Everything
```typescript
import { useEditor } from "../hooks/useEditor";

const ComplexComponent = () => {
    const store = useEditor();
    // Access everything through store object
};
```

### For Components That Need Specific State
```typescript
import { 
    useSelectedEntity, 
    useEntityInspector, 
    usePanelSizes 
} from "../stores";

const InspectorComponent = () => {
    const selectedEntityId = useSelectedEntity();
    const entityInspector = useEntityInspector();
    const panelSizes = usePanelSizes();

    // Only re-renders when these specific values change
};
```

### For Components That Need Actions
```typescript
import { useSelectEntity, useUpdateEntity } from "../stores";

const ActionComponent = () => {
    const selectEntity = useSelectEntity();
    const updateEntity = useUpdateEntity();
    // Only re-renders when these functions change (rarely)
};
```

## Import Patterns

### Recommended Import Structure

**For most components:**
```typescript
import { useEditor } from "../hooks/useEditor";
```

**For specific selectors:**
```typescript
import { useSelectedEntity, usePanelSizes } from "../stores";
```

**For direct store access:**
```typescript
import { useAppStore } from "../stores";
```

**For types and interfaces:**
```typescript
import type { EditorSlice, SceneSlice, UISlice } from "../stores";
```

## Troubleshooting

### Common Issues

1. **"Cannot read property of undefined"**
   - Make sure you're importing from `../stores` (not specific files)
   - Check that the selector exists

2. **Component not updating**
   - Verify you're using the correct selector
   - Check that the state is actually changing

3. **Performance issues**
   - Use specific selectors instead of accessing the entire store
   - Consider using `useEditor()` hook for complex components

### Debug Tips

1. Use Redux DevTools to inspect state changes
2. Add console.logs to verify state updates
3. Check that selectors are returning the expected values

## Need Help?

If you encounter issues during migration:

1. Check the `README-STORES.md` for detailed architecture information
2. Look at existing migrated components for examples
3. Use the `useEditor()` hook as a fallback for complex cases
4. Create specific selectors for new use cases
5. Verify imports are using `../stores` instead of specific slice files
