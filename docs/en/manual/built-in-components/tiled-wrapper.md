# TiledWrapper

The `TiledWrapper` component wraps a tilemap exported from the [Tiled](https://www.mapeditor.org/) map editor and selects which layer to render. It works together with a [`TilemapRenderer`](tilemap-renderer.md) on the same entity, which draws the tiles using a tileset. It can also create entities from the objects placed in the tilemap.

> **Note:** Only orthogonal Tiled maps are supported.

## Limitations

-   **One tileset per tilemap.** The `TilemapRenderer` draws with a single tileset, so the tile ids of a map that uses more than one are not translated with the `firstgid` of the tileset they belong to. Support for multiple tilesets in both components is planned.
-   **Tiles flipped or rotated in Tiled are not supported yet.** Their ids carry the flip flags, so they are not rendered as expected. Support is planned.

## Options

| Option | Type | Description |
|--------|------|-------------|
| `tilemap` | `TiledTilemap \| string` | The Tiled map data, as a parsed object or an asset URL/name string of a loaded JSON. |
| `layerToRender` | `string` | The name of the Tiled layer to render. |
| `objects` | `Map<string, TiledObjectBlueprint>` | The entities to create from the objects of the tilemap, keyed by the class of the Tiled object. |

## Example

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

The Tiled JSON is loaded through the [asset manager](../asset-manager.md) with `loadJson`, typically in the scene's `loadAssets` method. See [`TilemapRenderer`](tilemap-renderer.md) for the tileset configuration.

## Layers

The layer named in `layerToRender` is searched in the whole tilemap, including inside group layers. These properties of the layer are applied to the [`TilemapRenderer`](tilemap-renderer.md):

| Layer property | Applied as |
|----------------|------------|
| `offsetx` / `offsety` | The `offset` of the renderer. The offset of the groups that contain the layer is added to it. It is applied to the `TilemapCollider` too, so the colliders follow the tiles. |
| `opacity` | The `opacity` of the renderer, multiplied by the opacity of the groups that contain the layer. |
| `tintcolor` | The `tintColor` of the renderer. The alpha channel is discarded. |
| `visible` | A layer that is not visible, or that belongs to a group that is not visible, renders nothing and generates no colliders. |
| `startx` / `starty` | The origin of an infinite tilemap, whose chunks are placed from the top-left corner of the layer instead of the origin of the map, and can have negative coordinates. |

The size of the tilemap and the size of its tiles are taken from the tilemap, and from the layer bounds in the case of infinite tilemaps.

## Animated tiles

The tiles animated in Tiled are mapped to the `animations` of the [`TilemapRenderer`](tilemap-renderer.md) tileset the first time the component is processed, so they play without any extra configuration.

Tile ids are translated from the tileset they belong to: a tile is keyed by the `firstgid` of its tileset plus the id it has within it. Animations already defined in the tileset take precedence over the ones declared in Tiled.

Tiled allows a different duration for each frame, while the engine renders every frame of an animation at the same rate. The average duration is used, which keeps the total duration of the animation and is exact whenever every frame lasts the same.

> **Note:** The tileset must be embedded in the map. External tilesets (`.tsx`) are referenced by file and are not read by the engine.

## Updating the tilemap at runtime

The tilemap is read once, and the tile data is processed once. To apply a change made at runtime, such as rendering another layer, call `refresh` on the components involved:

```typescript
const tiledWrapper = this.entityManager.getComponent(entity, TiledWrapper);
tiledWrapper.layerToRender = "Background";

tiledWrapper.refresh();
this.entityManager.getComponent(entity, TilemapRenderer).refresh();
this.entityManager.getComponent(entity, TilemapCollider).refresh();
```

`refresh` reads the tilemap again, processes the tile data again and generates the collider shapes again. It is an expensive operation, do not call it on every frame. The entities created from the objects of the tilemap are not created again.

## Creating entities from Tiled objects

The `objects` map associates a Tiled object class with a blueprint. One entity is created for each object of that class, and the objects whose class is not in the map are ignored. The entities are created once, the first time the component is processed.

A blueprint can be:

-   An [archetype](../adding-entities-to-the-scene.md).
-   A collection of components (instances or classes).
-   A factory function that receives the object's properties and returns either of the two.

```typescript
import { TiledWrapper, TiledObjectBlueprint, Transform, SpriteRenderer } from "angry-pixel";
import { playerArchetype } from "../entity/Player";
import { Door } from "../component/Door";

const objects = new Map<string, TiledObjectBlueprint>([
    // an archetype
    ["Player", playerArchetype],
    // a collection of components
    ["Coin", [new Transform(), new SpriteRenderer({ image: "coin.png" })]],
    // a factory function
    ["Door", (properties) => [new Door({ locked: properties.get("locked") as boolean })]],
]);

new TiledWrapper({ tilemap: "map.json", layerToRender: "Ground", objects });
```

### Object properties

The factory function receives the properties of the Tiled object as a `Map` keyed by property name, and the Tiled object itself as a second argument (useful to read its `name`, `width`, `height`, `polygon`, etc.).

A property value can be a `number` (`int` and `float`), a `boolean` (`bool`), a `string` (`string`, `color` and `file`), an `Entity` (`object`), or a nested set of values (`class`), so it needs to be cast to the expected type.

Properties of type `object` reference another Tiled object by its id. They are given to the factory as the **entity** created for the referenced object, so entities can be linked to each other. All the entities are created before any factory is called, so the order of the objects in the tilemap does not matter. A property that references an object for which no entity was created is given as `undefined`.

### Position

The entity's `Transform` position is set from the object's `x` and `y`, relative to the center of the tilemap, plus the position of the entity that holds the `TiledWrapper`. If the blueprint does not include a `Transform`, one is added.

The position is calculated from the center of the object, in the space the tilemap is rendered in: the size and the tile size of the [`TilemapRenderer`](tilemap-renderer.md), which do not always match the ones declared by Tiled. An infinite tilemap is rendered with the size of its chunks. When the entity has no `TilemapRenderer`, the values declared in the tilemap are used.

Tile objects (objects with a `gid`) have their origin in the bottom-left corner; the rest have it in the top-left corner.

The rotation of the object is applied to the `Transform` as well, and the center of the object rotates around its origin, as it does in Tiled. A rotation of zero is not applied, so a blueprint can define a rotation of its own.

### Rules

-   Objects are matched by class in every object layer of the tilemap, regardless of the layer they belong to, including the layers nested in groups.
-   Objects with visibility turned off are ignored, and so are all the objects of a layer or a group with visibility turned off.
-   The offset of the object layer, and of the groups that contain it, is applied to the position of the object.
-   The parent-child relationship between Tiled objects is not supported.
-   Tiled 1.9 exports the class of an object as `class`, and the other versions as `type`. Both are supported.
