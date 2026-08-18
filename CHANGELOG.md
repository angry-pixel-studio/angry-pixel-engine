# Changelog

## [2.3.6] - 2026-08-18

### Fixed

#### Tiled

-   `TiledWrapperSystem` failed when the `TiledWrapper` had no tilemap, and when mapping the animations of a tilemap that declares no tilesets.

## [2.3.5] - 2026-08-15

### Added

#### Tiled

-   `TiledWrapper.objects`: a map keyed by the class of the Tiled object, whose value is an archetype, a collection of components, or a factory function that builds either of them from the properties of the object. One entity is created per matching object, once, the first time the component is processed.
-   Object properties of type `object` are given to the factory as the entity created for the referenced Tiled object. All the entities are created before any factory runs, so entities can be linked to each other regardless of the order of the objects in the tilemap.
-   The position of the entity is taken from the `x` and `y` of the object, and its rotation from `rotation`. Tile objects (those with a `gid`) are treated as bottom-left origin, the rest as top-left. A `Transform` is added when the blueprint does not include one.
-   The tiles animated in Tiled are mapped to the `animations` of the tileset, translated with the `firstgid` of the tileset they belong to. Tiled defines a duration per frame and the engine renders every frame at the same rate, so the average duration is used, which preserves the total duration of the animation.
-   Group layers: the layer to render and the objects are searched inside them. Their offset, their visibility and their opacity are applied to the layers they contain.
-   The `offsetx` / `offsety`, `opacity`, `tintcolor` and `visible` of the rendered layer are applied to the `TilemapRenderer`. The offset is applied to the `TilemapCollider` as well, so the colliders follow the tiles.
-   Infinite tilemaps are placed from the `startx` / `starty` of the layer, so the chunks painted above or to the left of the origin are no longer written to negative positions of the tile data.
-   Tiled format types: `TiledTileset`, `TiledTilesetTile`, `TiledTileAnimationFrame`, `TiledGroupLayer`, `TiledObjectBlueprint`, `TiledObjectFactory` and `TiledObjectProperties`.

#### Components

-   `TiledWrapper.refresh()`, `TilemapRenderer.refresh()` and `TilemapCollider.refresh()`: process the data of the tilemap again to apply the changes made at runtime, such as rendering another layer. They are expensive operations, they should not be called on every frame.
-   `TilemapRenderer.offset`: X-Y axis offset from the position of the entity.

#### ECS

-   `EntityManager.addArchetype(entity, archetype)`: adds the components of an archetype to an existing entity, with the same clone, children and `enabled` semantics as `createEntity`.

#### Debug

-   `debug.buttons` and `debug.buttonColor` game options, and the `DebugButtonSystem` that draws the shape of the buttons.

### Changed

#### Tiled

-   The size of the tilemap and the size of its tiles are taken from the tilemap instead of being inferred from the tile data and the tileset. Infinite tilemaps use the bounds of the layer.
-   The tilemap is read once instead of on every frame. Use `refresh` to read it again.
-   The class of an object is read from `class` (Tiled 1.9) or from `type` (the other versions).

### Fixed

#### ECS

-   `EntityManager.createEntity()` returned an identifier without registering the entity, so those entities failed `isEntity`, could not be given a parent, and survived `removeAllEntities(preserveComponentType)`.
-   `createEntity` skipped the parent when it was the entity `0`, which is the first entity of every scene.

#### Rendering

-   The entities created from Tiled objects are placed with the size and the tile size the tilemap is rendered with, which differ from the ones declared by Tiled in infinite tilemaps and whenever the tile size of the tileset is not the tile size of the tilemap.
-   The height of a chunk in the tilemap render data was calculated by dividing the tile count of the whole tilemap by the width of the chunk, which gave a wrong `realHeight`.
-   The tileset texture data is skipped when the image has no natural size, and the tilemap is not rendered until the data is available, instead of rendering with the vertices of another tilemap.
-   The `DebugButtonSystem` ignores a `Button` without a shape, instead of queuing render data with no vertices.

#### Physics

-   The time scale check moved from `LoopManager` to `ApplyVelocitySystem`, so the rest of the physics systems keep running when the time scale is zero.

## [2.3.4] - 2026-08-06

### Breaking changes

#### Tilemap

-   `Tileset.width` no longer exists. The number of columns is derived from the image.
-   `Tileset.margin` and `Tileset.spacing` are `number` instead of `Vector2`, with corrected semantics: `margin` is the space between the tiles and the four edges of the image, `spacing` is the separation between adjacent tiles. A tilesheet whose tiles are extruded by 1 px has `margin: 1` and `spacing: 2`.
-   `Tileset.correction` has been removed.
-   `TilemapRenderer.animations` moved to `Tileset.animations`. An animated tile is a property of the tileset image, not of a particular map, so the tilemaps that share a tileset play their animations in sync.

### Performance

-   Everything `processTileset` computed is cached on the tileset object and calculated once instead of every frame, since the tileset cannot be updated at runtime. Texture vertices are emitted directly in texture coordinates, so the per-frame texture matrix scale is gone.

## [2.3.3] - 2026-07-13

### Added

#### Tilemap

-   `TileAnimation`: cycles a tile through a sequence of tile ids, with a configurable speed in frames per second. Animations always loop.

#### Physics

-   `RigidBody.staticForLayers`: the collision layers against which a dynamic body behaves as a static one.

## [2.3.2] - 2026-06-24

### Added

#### Audio

-   `AudioPlayer.loopStart` and `AudioPlayer.loopEnd` (seconds): when `loop` is TRUE and `loopEnd` is greater than zero, the audio loops between these two time marks (mirrors the Web Audio API). Otherwise the whole buffer loops.
-   `AudioPlayer.startAt` (seconds): time mark playback starts from when playing from a stopped state. Default is 0.
-   `AudioPlayer.currentTime` (READONLY): the current playback time mark in seconds, updated each frame.

## [2.3.1] - 2026-06-03

### Changed

#### ECS

-   `EntityManager.createEntity(components)` now clones component instances before attaching them, matching the archetype overload. The entity stores a copy, so the component array — and any instances in it — can be safely reused to create multiple entities. Retrieve the attached instance with `getComponent` (keeping a reference to the original passed-in instance no longer affects the entity).

## [2.3.0] - 2026-05-31

> **Note:** This release includes breaking changes in the ECS, archetype, and audio APIs. If you follow strict semver, consider it a major (3.0.0) bump.

### Breaking changes

#### ECS

-   `EntityManager.search` no longer accepts a filter predicate as the second argument. Use `.filter()` on the returned array, or short-circuit inside the new callback overload.
-   `EntityManager.createEntityFromArchetype` has been removed. Use `createEntity(archetype, parent?)`:
    ```ts
    // before
    entityManager.createEntityFromArchetype(playerArchetype);
    // now
    entityManager.createEntity(playerArchetype);
    ```
-   The `disableComponent` helper and the `DisabledComponent` type have been removed. Use the new `Archetype.disabledComponents` array (see below).

#### Audio

-   `AssetManager.loadAudio` and `getAudio` now return an `AudioSource` object — `{ buffer: AudioBuffer; element: HTMLAudioElement }` — instead of `HTMLAudioElement`. `loadAudio` remains synchronous; `buffer` is populated when decoding finishes (poll via `getAssetsLoaded`).
-   `AudioPlayer.audioSource` is now `AudioSource | string` (was `HTMLAudioElement | string`).
-   `playSfx` / `stopSfx` accept `AudioSource` instead of `HTMLAudioElement`. The call shape is unchanged when you pass the result of `assetManager.getAudio(...)`.

### Added

#### ECS

-   `search` callback overload: `search(componentType, callback, includeDisabled?)`. Iterates without allocating an intermediate result array.
-   `createEntity` archetype overload: `createEntity(archetype, parent?)`.
-   `Archetype.disabledComponents` — components attached to the entity that start disabled. Same shape as `components` (instances or classes):
    ```ts
    const archetype = {
        components: [new Transform(), new Enemy()],
        disabledComponents: [new BoxCollider()],
    };
    ```

#### Audio

-   New `AudioSource` type returned by `AssetManager`. Its `buffer` powers gapless `AudioPlayer` playback via the Web Audio API; its `element` is used by `playSfx` / `stopSfx`.
-   `AudioPlayer` playback now uses the Web Audio API. Looping is gapless, pause/resume keeps the loop-aware offset, volume and time-scale updates apply live.
-   `AudioPlayer.play(audioSource?: AudioSource | string)` — accepts a new source on play.
-   `AudioContext` is available via DI (`SYMBOLS.AudioContext`) and as `this.audioContext` on `GameSystem`. `null` in headless mode.

#### Components

-   `Animator.play(animation?: string)` — start/resume playback; switching animation name resets.
-   `Animator.pause()` — stop playback, keep current frame.
-   `Animator.stop()` — stop playback and reset frame/time.

### Performance

-   Internal `EntityManager` indexing optimizations: reverse component index for per-entity reads, `WeakMap` reverse lookup for component → entity, and smallest-set-first joins. Most noticeable in scenes with many entities or colliders. No API impact.

### Tooling

-   Upgraded TypeScript to `^6.0.3`.
-   Upgraded `typescript-eslint` to `^8.60.0` and `typedoc` to `^0.28.19`.
-   Added `tslib` as a dev dependency.
-   `tsconfig.json` now uses `"moduleResolution": "bundler"` with `"skipLibCheck": true`. Demo `tsconfig.json` drops the deprecated `"baseUrl"`.
