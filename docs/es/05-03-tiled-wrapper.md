## TiledWrapper

El componente `TiledWrapper` conecta un mapa creado en el editor Tiled con el motor.  
Se encarga de interpretar el formato de mapa de Tiled y especificar qué capa de tiles debe renderizarse.

### Propiedades

| Propiedad       | Tipo                       | Descripción                                                                     |
| --------------- | -------------------------- | ------------------------------------------------------------------------------- |
| `tilemap`       | `TiledTilemap` \| `string` | El mapa de Tiled. Puede ser un objeto ya parseado o una ruta a un archivo JSON. |
| `layerToRender` | `string`                   | El nombre de la capa de tiles que se desea renderizar dentro del mapa.          |

### Ejemplo

```typescript
const tiledWrapper = new TiledWrapper({
    tilemap: "tilemap.json",
    layerToRender: "Ground",
});

// También puede usarse con un mapa ya cargado
const tiledWrapper = new TiledWrapper({
    tilemap: assetManager.getJson("tilemap.json"),
    layerToRender: "Ground",
});
```

### Notas

-   Este componente **solo soporta capas de tiles**. Las capas de objetos definidas en el mapa serán ignoradas.
-   Para que el mapa sea renderizado, **la entidad debe contar también con un componente `TilemapRenderer`**.
-   Por razones de compatibilidad, el tileset sugerido en el archivo de mapa exportado desde Tiled será ignorado. **El tileset debe definirse en el componente `TilemapRenderer`**.
-   El componente `TiledWrapper` únicamente define qué mapa y qué capa utilizar. La lógica de renderizado es gestionada por el sistema encargado de procesar los componentes `TilemapRenderer`.
