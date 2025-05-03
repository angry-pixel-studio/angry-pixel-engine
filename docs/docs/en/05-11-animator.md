## Animator & Animation

The `Animator` component manages sprite animations.  
It contains a map of animations (`Animation`) and controls which one is currently playing, its speed, and playback state.  
Each `Animation` defines properties such as the source image(s), slice dimensions, frame sequence, playback speed (fps), and looping behavior.

---

### Animation

The `Animation` object configures a specific animation.

#### Properties

| Property | Type                                                                 | Description                                                                                                           |
| -------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `image`  | `HTMLImageElement` \| `HTMLImageElement[]` \| `string` \| `string[]` | The image or images used for the animation frames.                                                                    |
| `slice`  | `{ size: Vector2; offset?: Vector2; padding?: Vector2 }`             | Specifies the frame size and optional offset/padding if using a sprite sheet. Not required when using an image array. |
| `frames` | `number[]`                                                           | Frame indices to use. If not specified, all frames will be used sequentially.                                         |
| `fps`    | `number`                                                             | Frames per second for the animation.                                                                                  |
| `loop`   | `boolean`                                                            | If `true`, the animation will repeat indefinitely.                                                                    |

---

### Animator

The `Animator` component manages multiple animations and allows switching between them, adjusting the playback speed, and controlling the playback state.

#### Properties

| Property       | Type                     | Description                                                               |
| -------------- | ------------------------ | ------------------------------------------------------------------------- |
| `animations`   | `Map<string, Animation>` | A map of animations where each key is the name of the animation.          |
| `animation`    | `string`                 | The name of the currently selected animation.                             |
| `speed`        | `number`                 | Playback speed multiplier (default is `1`).                               |
| `reset`        | `boolean`                | If `true`, the animation will reset to the first frame on the next cycle. |
| `playing`      | `boolean`                | `true` if the animation is currently playing.                             |
| `currentFrame` | `number`                 | The current frame (read-only).                                            |
| `currentTime`  | `number`                 | The accumulated playback time (read-only).                                |

---

### Basic Example — Sprite Sheet Animations

```typescript
const walkAnimation = new Animation({
    image: "walk.png",
    slice: { size: new Vector2(32, 32) },
    frames: [0, 1, 2, 3, 4, 5],
    fps: 12,
    loop: true,
});

const idleAnimation = new Animation({
    image: "idle.png",
    slice: { size: new Vector2(32, 32) },
    frames: [6, 7, 8, 9],
    fps: 8,
    loop: true,
});

const animator = new Animator({
    animations: new Map([
        ["walk", walkAnimation],
        ["idle", idleAnimation],
    ]),
    animation: "idle",
    speed: 1,
    playing: true,
});
```

---

### Alternative Example — Animations Using Image Arrays

```typescript
const runAnimation = new Animation({
    image: [
        this.assetManager.getImage("run_frame0.png"),
        this.assetManager.getImage("run_frame1.png"),
        this.assetManager.getImage("run_frame2.png"),
        this.assetManager.getImage("run_frame3.png"),
    ],
    frames: [0, 1, 2, 3],
    fps: 10,
    loop: true,
});

const animator = new Animator({
    animations: new Map([["run", runAnimation]]),
    animation: "run",
    speed: 1,
    playing: true,
});
```

---

### Notes

-   Animations must be preloaded and their images accessible before being assigned to the `Animator`.
-   You can change the active animation by assigning another value to `animation`. Example: `animator.animation = "walk"`; the change will be applied by the animation system in the next cycle.
-   To reset an animation to the first frame, set `animator.reset = true`.
-   The `speed` value adjusts the overall playback speed without changing the `fps` of the animation.
-   When using an array of images (`image[]`), **no slice configuration is necessary**.
