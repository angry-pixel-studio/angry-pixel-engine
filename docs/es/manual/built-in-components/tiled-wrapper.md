# TiledWrapper

El componente `TiledWrapper` envuelve un tilemap exportado desde el editor de mapas [Tiled](https://www.mapeditor.org/) y selecciona qué capa renderizar. Funciona junto con un [`TilemapRenderer`](tilemap-renderer.md) en la misma entidad, que dibuja los tiles usando un tileset.

> **Nota:** Solo se admiten mapas de Tiled ortogonales.

## Opciones

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `tilemap` | `TiledTilemap \| string` | Los datos del mapa de Tiled, como un objeto ya parseado o una cadena con la URL/nombre del recurso de un JSON cargado. |
| `layerToRender` | `string` | El nombre de la capa de Tiled a renderizar. |

## Ejemplo

```typescript
import { Transform, TiledWrapper, TilemapRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TiledWrapper({ tilemap: "map.json", layerToRender: "Ground" }),
    new TilemapRenderer({
        layer: "Foreground",
        tileset: {
            image: this.assetManager.getImage("tileset.png"),
            width: 8,
            tileWidth: 16,
            tileHeight: 16,
        },
    }),
]);
```

El JSON de Tiled se carga a través del [Asset Manager](../asset-manager.md) con `loadJson`, normalmente en el método `loadAssets` de la escena. Consulta [`TilemapRenderer`](tilemap-renderer.md) para la configuración del tileset.
