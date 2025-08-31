# Editor Stores Architecture

Este documento explica la nueva arquitectura de stores del editor, que consolida todas las responsabilidades en un solo store principal con slices organizados en archivos separados para mejor mantenibilidad.

## Nueva Arquitectura: Store Consolidado con Slices Separados

### 1. AppStore (`appStore.ts`) - Store Principal

**Responsabilidades:**

- **Store único** que consolida toda la funcionalidad
- **Slices organizados** importados desde archivos separados
- **Mejor rendimiento** con un solo store y selectores optimizados
- **Debugging simplificado** con devtools unificados

**Estructura:**

```typescript
interface AppState extends EditorSlice, SceneSlice, UISlice {}
```

### 2. EditorSlice (`slices/editorSlice.ts`) - Estado del Editor

**Responsabilidades:**

- Maneja el estado del editor (herramientas, selección, inspector)
- Gestiona la selección de entidades y componentes
- Controla el estado del inspector de entidades

**Estado:**

```typescript
interface EditorSlice {
    selectedEntityId: string | null;
    entityInspector: {
        entityName: string;
        entityEnabled: boolean;
        collapsedComponents: Set<string>;
        components: Map<string, EntityComponent>;
    };
}
```

**Acciones principales:**

- `selectEntity()` - Selecciona una entidad
- `setEntityName()` - Establece el nombre de la entidad
- `setEntityEnabled()` - Habilita/deshabilita la entidad
- `toggleComponentCollapsed()` - Expande/colapsa un componente
- `updateComponentProperty()` - Actualiza propiedades de componentes

### 3. SceneSlice (`slices/sceneSlice.ts`) - Datos de la Escena

**Responsabilidades:**

- Maneja el estado de la escena (entidades, componentes, sistemas)
- Proporciona acciones para modificar la escena
- Genera el JSON de la escena para exportar

**Estado:**

```typescript
interface SceneSlice {
    scene: Scene;
    entitiesMap: Map<string, EntityWithParent>;
    componentsMap: Map<string, EntityComponent[]>;
    systemsMap: Map<string, System>;
    entityUpdated?: string;
    componentUpdated?: [string, string];
}
```

**Acciones principales:**

- `updateEntity()` - Actualiza una entidad
- `updateComponent()` - Actualiza un componente
- `addSystem()` - Añade un nuevo sistema
- `removeSystem()` - Elimina un sistema
- `getSceneJson()` - Genera JSON de la escena

### 4. UISlice (`slices/uiSlice.ts`) - Interfaz de Usuario

**Responsabilidades:**

- Maneja el estado de la interfaz (tamaños de paneles, layout)
- Controla las preferencias de visualización

**Estado:**

```typescript
interface UISlice {
    panelSizes: {
        sceneTree: number;
        filesystemNav: number;
        entityInspector: number;
    };
}
```

**Acciones principales:**

- `setPanelSize()` - Cambia el tamaño de un panel

## Estructura de Archivos

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

## Uso en Componentes

### Hook Unificado (`useEditor`)

Para facilitar el uso, se proporciona un hook que combina todos los slices:

```typescript
import { useEditor } from "../hooks/useEditor";

const MyComponent = () => {
    const {
        // Editor state
        selectedEntity,
        entityInspector,
        panelSizes,

        // Editor actions
        selectEntity,
        setEntityName,
        setPanelSize,

        // Scene state
        entitiesMap,
        componentsMap,
        systemsMap,

        // Scene actions
        updateEntity,
        updateComponent,
        getSceneJson,
    } = useEditor();

    // Usar las funciones y estado...
};
```

### Uso Directo del Store Principal

Si prefieres usar el store principal directamente:

```typescript
import { useAppStore } from "../stores";

const MyComponent = () => {
    const { selectedEntityId, selectEntity, updateEntity } = useAppStore();

    // Usar el store directamente...
};
```

### Selectores Optimizados para Mejor Rendimiento

Para componentes que solo necesitan partes específicas del estado:

```typescript
import { 
    useSelectedEntity, 
    useEntityInspector, 
    usePanelSizes 
} from "../stores";

const MyComponent = () => {
    const selectedEntity = useSelectedEntity();
    const entityInspector = useEntityInspector();
    const panelSizes = usePanelSizes();

    // Solo se re-renderiza cuando cambian estos valores específicos
};
```

## Ventajas de la Nueva Arquitectura

### 1. **Consolidación de Estado**

- **Un solo store** en lugar de múltiples stores
- **Mejor coordinación** entre diferentes partes del estado
- **Debugging simplificado** con devtools unificados

### 2. **Mejor Organización**

- **Slices claros** para cada responsabilidad
- **Archivos separados** para mejor mantenibilidad
- **Separación de responsabilidades** sin duplicación
- **Fácil navegación** del código

### 3. **Rendimiento Optimizado**

- **Selectores granulares** para evitar re-renders innecesarios
- **Un solo store** reduce la complejidad de suscripciones
- **Immer** optimiza las actualizaciones de estado

### 4. **Mantenibilidad**

- **Código más organizado** y fácil de entender
- **Cada slice tiene su propio archivo** con responsabilidad clara
- **Fácil de testear y debuggear**
- **Imports limpios** desde el índice principal

## Migración de Código Existente

### Antes (Stores separados):

```typescript
import { useEditorStore } from "../stores/editorStore";
import { useSceneStore } from "../stores/sceneStore";

const { selectedEntity } = useEditorStore();
const { scene, updateEntity } = useSceneStore();
```

### Después (Store consolidado):

```typescript
import { useEditor } from "../hooks/useEditor";

const { selectedEntity, scene, updateEntity } = useEditor();
```

### O con selectores optimizados:

```typescript
import { useSelectedEntity, useScene } from "../stores";

const selectedEntity = useSelectedEntity();
const scene = useScene();
```

## Ejemplos de Uso

### Actualizar una entidad:

```typescript
const { updateEntity } = useEditor();

const handleNameChange = (newName: string) => {
    updateEntity(entityId, { name: newName });
};
```

### Generar JSON de la escena:

```typescript
const { getSceneJson } = useEditor();

const handleSave = () => {
    const json = getSceneJson();
    // Guardar archivo...
};
```

### Cambiar tamaño de panel:

```typescript
const { setPanelSize, panelSizes } = useEditor();

const handleResize = (newSize: number) => {
    setPanelSize("entityInspector", newSize);
};
```

## Uso de Immer

El store usa Immer para permitir mutaciones directas del estado. Esto simplifica enormemente el código:

### Sin Immer (modo tradicional):

```typescript
updateEntity: (entityId, updates) => {
    set((state) => ({
        scene: {
            ...state.scene,
            entities: state.scene.entities.map((entity) =>
                entity.id === entityId ? { ...entity, ...updates } : entity,
            ),
        },
    }));
};
```

### Con Immer (modo actual):

```typescript
updateEntity: (entityId, updates) => {
    set((state) => {
        const entity = state.entitiesMap.get(entityId);
        if (entity) {
            Object.assign(entity, updates);
        }
    });
};
```

**Ventajas de Immer:**

- Código más legible y directo
- Menos propenso a errores de inmutabilidad
- Mejor performance en actualizaciones complejas
- Sintaxis intuitiva similar a mutación directa

## Consideraciones de Diseño

1. **Immer**: Todos los slices usan Immer para mutaciones inmutables y mejor performance
2. **DevTools**: El store incluye middleware de devtools para debugging
3. **TypeScript**: Tipado completo para mejor DX y seguridad
4. **Hooks**: API consistente basada en hooks de React
5. **Performance**: Estados granulares para evitar re-renders innecesarios
6. **Selectores**: Hooks optimizados para acceso específico al estado
7. **Slices**: Organización clara por responsabilidad funcional
8. **Archivos separados**: Mejor mantenibilidad y navegación del código

## Migración Gradual

La nueva arquitectura permite migración gradual:

1. **Fase 1**: Usar `useEditor()` hook (ya implementado)
2. **Fase 2**: Migrar componentes a selectores específicos
3. **Fase 3**: Eliminar stores antiguos (opcional)

Los stores antiguos pueden mantenerse durante la transición para compatibilidad.

## Imports Recomendados

### Para la mayoría de casos:
```typescript
import { useEditor } from "../hooks/useEditor";
```

### Para selectores específicos:
```typescript
import { useSelectedEntity, usePanelSizes } from "../stores";
```

### Para acceso directo al store:
```typescript
import { useAppStore } from "../stores";
```

### Para tipos y interfaces:
```typescript
import type { EditorSlice, SceneSlice, UISlice } from "../stores";
```
