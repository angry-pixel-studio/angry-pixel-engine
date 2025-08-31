# Editor Stores Architecture

Este documento explica la nueva arquitectura de stores del editor, que separa las responsabilidades entre el estado del editor y el estado de la escena.

## Estructura de Stores

### 1. SceneStore (`sceneStore.ts`)

**Responsabilidades:**

-   Maneja el estado de la escena (entidades, componentes, sistemas)
-   Proporciona acciones para modificar la escena
-   Genera el JSON de la escena para exportar

**Estado:**

```typescript
interface SceneState {
    scene: Scene;
}
```

**Acciones principales:**

-   `updateEntity()` - Actualiza una entidad
-   `updateComponent()` - Actualiza un componente
-   `addEntity()` - Añade una nueva entidad
-   `removeEntity()` - Elimina una entidad
-   `duplicateEntity()` - Duplica una entidad
-   `getSceneJson()` - Genera JSON de la escena
-   `getEntityById()` - Busca entidad por ID
-   `getComponentById()` - Busca componente por ID

### 2. EditorStore (`editorStore.ts`)

**Responsabilidades:**

-   Maneja el estado del editor (herramientas, cámara, paneles)
-   Gestiona la selección de entidades y componentes
-   Controla el estado del inspector de entidades

**Estado:**

```typescript
interface EditorState {
    selectedEntity: Entity | null;
    selectedComponent: EntityComponent | null;
    entityInspector: {
        entityName: string;
        entityEnabled: boolean;
        expandedComponents: Set<string>;
        expandedProperties: Set<string>;
    };
    camera: { position: { x: number; y: number }; zoom: number };
    tool: "select" | "move" | "create" | "delete";
    grid: { enabled: boolean; size: number; snap: boolean };
    panelSizes: { sceneTree: number; filesystemNav: number; entityInspector: number };
    history: { operations: any[]; currentIndex: number; maxSize: number };
}
```

**Acciones principales:**

-   `selectEntity()` - Selecciona una entidad
-   `selectComponent()` - Selecciona un componente
-   `setEntityName()` - Establece el nombre de la entidad
-   `setEntityEnabled()` - Habilita/deshabilita la entidad
-   `toggleComponentExpanded()` - Expande/colapsa un componente
-   `setTool()` - Cambia la herramienta activa
-   `setCameraPosition()` - Mueve la cámara
-   `setCameraZoom()` - Cambia el zoom de la cámara

## Uso en Componentes

### Hook Unificado (`useEditor`)

Para facilitar el uso, se proporciona un hook que combina ambos stores:

```typescript
import { useEditor } from "../hooks/useEditor";

const MyComponent = () => {
    const {
        // Editor state
        selectedEntity,
        entityInspector,
        camera,
        tool,

        // Editor actions
        selectEntity,
        setEntityName,
        setTool,

        // Scene state
        scene,

        // Scene actions
        updateEntity,
        addEntity,

        // Scene utilities
        getSceneJson,
    } = useEditor();

    // Usar las funciones y estado...
};
```

### Uso Directo de Stores

Si prefieres usar los stores por separado:

```typescript
import { useEditorStore } from "../stores/editorStore";
import { useSceneStore } from "../stores/sceneStore";

const MyComponent = () => {
    const { selectedEntity, selectEntity } = useEditorStore();
    const { scene, updateEntity } = useSceneStore();

    // Usar los stores por separado...
};
```

## Ventajas de la Nueva Arquitectura

### 1. Separación de Responsabilidades

-   **SceneStore**: Solo maneja datos de la escena
-   **EditorStore**: Solo maneja estado del editor

### 2. Mejor Reactividad

-   Los componentes del inspector se actualizan automáticamente
-   Estados más granulares (ej: `entityName`, `entityEnabled`)
-   Uso de Immer para mutaciones inmutables

### 3. Mantenibilidad

-   Código más organizado y fácil de entender
-   Cada store tiene una responsabilidad clara
-   Fácil de testear y debuggear

### 4. Performance

-   Solo se re-renderizan los componentes que dependen de estados específicos
-   Immer optimiza las actualizaciones de estado

## Migración de Código Existente

### Antes (EditorStore único):

```typescript
const { scene, selectedEntity, updateEntity } = useEditorStore();
```

### Después (Stores separados):

```typescript
const { scene, selectedEntity, updateEntity } = useEditor();
```

### O por separado:

```typescript
const { selectedEntity } = useEditorStore();
const { scene, updateEntity } = useSceneStore();
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

### Cambiar herramienta del editor:

```typescript
const { setTool, tool } = useEditor();

const handleToolChange = (newTool: "select" | "move" | "create" | "delete") => {
    setTool(newTool);
};
```

## Uso de Immer

Los stores usan Immer para permitir mutaciones directas del estado. Esto simplifica enormemente el código:

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
        const entity = state.scene.entities.find((e) => e.id === entityId);
        if (entity) {
            Object.assign(entity, updates);
        }
    });
};
```

**Ventajas de Immer:**

-   Código más legible y directo
-   Menos propenso a errores de inmutabilidad
-   Mejor performance en actualizaciones complejas
-   Sintaxis intuitiva similar a mutación directa

## Consideraciones de Diseño

1. **Immer**: Todos los stores usan Immer para mutaciones inmutables y mejor performance
2. **DevTools**: Los stores incluyen middleware de devtools para debugging
3. **TypeScript**: Tipado completo para mejor DX y seguridad
4. **Hooks**: API consistente basada en hooks de React
5. **Performance**: Estados granulares para evitar re-renders innecesarios
6. **Sintaxis simplificada**: Con Immer puedes mutar directamente el estado draft sin crear nuevos objetos
