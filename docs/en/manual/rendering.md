# Rendering

The engine renders with WebGL during the rendering phase of the [game loop](../welcome/architecture.md). Rendering is built from three pieces:

- A **Camera** decides which layers are drawn to the screen.
- **Layers** group what is drawn and control draw order.
- **Render components** (sprites, text, shapes, etc.) produce the visuals.

Every renderable entity needs a [`Transform`](built-in-components/transform.md): render components draw at the entity's position, plus their own `offset`.

## Camera

A camera is an entity with a [`Camera`](built-in-components/camera.md) component and a `Transform`. Nothing is drawn unless a camera renders the layer the content is on. A scene needs at least one camera.

```typescript
import { Transform, Camera } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new Camera({ layers: ["Default", "UI"], zoom: 1 }),
]);
```

The `Camera` component has these options:

| Option | Type | Description |
|--------|------|-------------|
| `layers` | `string[]` | The layers this camera renders. |
| `zoom` | `number` | Zoom level. Defaults to `1`. |
| `depth` | `number` | With multiple cameras, the lower depth renders first. Defaults to `0`. |
| `debug` | `boolean` | Renders debug data when `true`. Defaults to `false`. |

Multiple cameras can be used together — for example, one for the game world and one for the UI — ordered by their `depth`.

## Layers

Every render component has a `layer` property: a string naming the layer it belongs to. A camera draws only the layers listed in its `layers` array, in the order they appear — earlier layers are drawn first (behind), later layers on top. Content on a layer no camera renders is not drawn.

```typescript
import { Transform, SpriteRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new SpriteRenderer({ image: this.assetManager.getImage("player.png"), layer: "Default" }),
]);
```

Layer names are arbitrary strings; pick a convention and use the same names on your render components and your camera. A common practice is to keep layer names in a configuration file under `src/config/`.

## Loading images

Images used by render components are loaded through the [asset manager](asset-manager.md) with `loadImage`, typically in a scene's `loadAssets` method. Once loaded, an image is retrieved with `getImage` and passed to the render component.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadImage("player.png");
    }
}
```

## Render components

The engine provides the following render components. See [Built-in Components](built-in-components/index.md) for the full options of each.

| Component | Renders |
|-----------|---------|
| [`SpriteRenderer`](built-in-components/sprite-renderer.md) | Images (sprites). |
| [`TextRenderer`](built-in-components/text-renderer.md) | Text. |
| [`TilemapRenderer`](built-in-components/tilemap-renderer.md) | Tile-based maps from a tileset image. |
| [`MaskRenderer`](built-in-components/mask-renderer.md) | Filled shapes (rectangle, circle, polygon). |
| [`GeometricRenderer`](built-in-components/geometric-renderer.md) | Hollow (stroke-only) shapes and lines. |
| [`VideoRenderer`](built-in-components/video-renderer.md) | Video content. |
| [`LightRenderer`](built-in-components/light-renderer.md) | A circular light source. Requires a `DarknessRenderer` in the scene. |
| [`DarknessRenderer`](built-in-components/darkness-renderer.md) | A darkness mask, affected by light renderers. |

Animated sprites are driven by the [`Animator`](built-in-components/animator.md) component together with a `SpriteRenderer`.

```typescript
import { Transform, TextRenderer, TextAlignment } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TextRenderer({
        text: "Score: 0",
        color: "#FFFFFF",
        fontSize: 24,
        layer: "UI",
        alignment: TextAlignment.Left,
    }),
]);
```
