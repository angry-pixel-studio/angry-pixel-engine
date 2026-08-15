# TiledWrapper

El componente `TiledWrapper` envuelve un tilemap exportado desde el editor de mapas [Tiled](https://www.mapeditor.org/) y selecciona qué capa renderizar. Funciona junto con un [`TilemapRenderer`](tilemap-renderer.md) en la misma entidad, que dibuja los tiles usando un tileset. También puede crear entidades a partir de los objetos ubicados en el tilemap.

> **Nota:** Solo se admiten mapas de Tiled ortogonales.

## Opciones

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `tilemap` | `TiledTilemap \| string` | Los datos del mapa de Tiled, como un objeto ya parseado o una cadena con la URL/nombre del recurso de un JSON cargado. |
| `layerToRender` | `string` | El nombre de la capa de Tiled a renderizar. |
| `objects` | `Map<string, TiledObjectBlueprint>` | Las entidades a crear a partir de los objetos del tilemap, indexadas por la clase del objeto de Tiled. |

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
            tileWidth: 16,
            tileHeight: 16,
        },
    }),
]);
```

El JSON de Tiled se carga a través del [Asset Manager](../asset-manager.md) con `loadJson`, normalmente en el método `loadAssets` de la escena. Consulta [`TilemapRenderer`](tilemap-renderer.md) para la configuración del tileset.

## Tiles animados

Los tiles animados en Tiled se mapean a las `animations` del tileset del [`TilemapRenderer`](tilemap-renderer.md) la primera vez que se procesa el componente, por lo que se reproducen sin ninguna configuración adicional.

Los ids de los tiles se traducen desde el tileset al que pertenecen: un tile se indexa con el `firstgid` de su tileset más el id que tiene dentro de él. Las animaciones ya definidas en el tileset tienen precedencia sobre las declaradas en Tiled.

Tiled permite una duración distinta para cada frame, mientras que el motor renderiza todos los frames de una animación al mismo ritmo. Se usa la duración promedio, lo que conserva la duración total de la animación y es exacto siempre que todos los frames duren lo mismo.

> **Nota:** El tileset debe estar embebido en el mapa. Los tilesets externos (`.tsx`) se referencian por archivo y el motor no los lee.

## Crear entidades a partir de objetos de Tiled

El mapa `objects` asocia una clase de objeto de Tiled con un blueprint. Se crea una entidad por cada objeto de esa clase, y los objetos cuya clase no está en el mapa se ignoran. Las entidades se crean una sola vez, la primera vez que se procesa el componente.

Un blueprint puede ser:

-   Un [archetype](../adding-entities-to-the-scene.md).
-   Una colección de componentes (instancias o clases).
-   Una función factory que recibe las propiedades del objeto y devuelve cualquiera de los dos.

```typescript
import { TiledWrapper, TiledObjectBlueprint, Transform, SpriteRenderer } from "angry-pixel";
import { playerArchetype } from "../entity/Player";
import { Door } from "../component/Door";

const objects = new Map<string, TiledObjectBlueprint>([
    // un archetype
    ["Player", playerArchetype],
    // una colección de componentes
    ["Coin", [new Transform(), new SpriteRenderer({ image: "coin.png" })]],
    // una función factory
    ["Door", (properties) => [new Door({ locked: properties.get("locked") as boolean })]],
]);

new TiledWrapper({ tilemap: "map.json", layerToRender: "Ground", objects });
```

### Propiedades de los objetos

La función factory recibe las propiedades del objeto de Tiled como un `Map` indexado por el nombre de la propiedad, y el objeto de Tiled en sí como segundo argumento (útil para leer su `name`, `width`, `height`, `polygon`, etc.).

El valor de una propiedad puede ser un `number` (`int` y `float`), un `boolean` (`bool`), un `string` (`string`, `color` y `file`), una `Entity` (`object`), o un conjunto anidado de valores (`class`), por lo que debe castearse al tipo esperado.

Las propiedades de tipo `object` referencian a otro objeto de Tiled por su id. La factory las recibe como la **entidad** creada para el objeto referenciado, de modo que las entidades pueden vincularse entre sí. Todas las entidades se crean antes de llamar a cualquier factory, por lo que el orden de los objetos en el tilemap no importa. Una propiedad que referencia a un objeto para el cual no se creó ninguna entidad se recibe como `undefined`.

### Posición

La posición del `Transform` de la entidad se calcula a partir de las propiedades `x` e `y` del objeto, relativa al centro del tilemap, más la posición de la entidad que contiene el `TiledWrapper`. Si el blueprint no incluye un `Transform`, se le agrega uno.

La posición se calcula desde el centro del objeto, en el espacio en el que se renderiza el tilemap: el tamaño y el tamaño de tile del [`TilemapRenderer`](tilemap-renderer.md), que no siempre coinciden con los declarados por Tiled. Un tilemap infinito se renderiza con el tamaño de sus chunks, y el tamaño de tile proviene del tileset. Cuando la entidad no tiene un `TilemapRenderer`, se usan los valores declarados en el tilemap.

Los tile objects (los objetos con `gid`) tienen su origen en la esquina inferior izquierda; el resto lo tiene en la esquina superior izquierda.

### Reglas

-   Los objetos se buscan por clase en todas las capas de objetos del tilemap, sin importar a qué capa pertenecen.
-   Los objetos con la visibilidad desactivada se ignoran, al igual que todos los objetos de una capa con la visibilidad desactivada.
-   La relación padre-hijo entre objetos de Tiled no está soportada.
-   Tiled 1.9 exporta la clase de un objeto como `class`, y el resto de las versiones como `type`. Ambas están soportadas.
