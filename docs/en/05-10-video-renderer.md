## VideoRenderer

The `VideoRenderer` component renders video content on the screen.  
It supports features such as playback control, scaling, rotation, flipping, opacity, color masking, and tinting.  
Videos can be displayed with custom dimensions, positioned with offsets, and sliced to show specific regions.  
You can control looping, volume, time scaling, and assign the video to specific render layers.

### Properties

| Property           | Type                           | Description                                                |
| ------------------ | ------------------------------ | ---------------------------------------------------------- |
| `action`           | `"play" \| "pause" \| "stop"`  | Current action for the video.                              |
| `fixedToTimeScale` | `boolean`                      | If `true`, playback speed follows the engine’s time scale. |
| `flipHorizontally` | `boolean`                      | If `true`, flips the video horizontally.                   |
| `flipVertically`   | `boolean`                      | If `true`, flips the video vertically.                     |
| `height`           | `number`                       | Custom height of the video.                                |
| `layer`            | `string`                       | Render layer.                                              |
| `loop`             | `boolean`                      | If `true`, plays the video in a loop.                      |
| `maskColor`        | `string`                       | Color mask applied to the video.                           |
| `maskColorMix`     | `number`                       | Intensity of the mask color mix (between 0 and 1).         |
| `offset`           | `Vector2`                      | Offset on the X and Y axes.                                |
| `opacity`          | `number`                       | Opacity of the video (between 0 and 1).                    |
| `rotation`         | `number`                       | Video rotation in radians.                                 |
| `slice`            | `Slice`                        | Coordinates to crop a specific region of the video.        |
| `tintColor`        | `string`                       | Tint color applied to the video.                           |
| `video`            | `HTMLVideoElement` \| `string` | Video to render. Can be an HTML element or an asset name.  |
| `volume`           | `number`                       | Volume of the video (between 0 and 1).                     |
| `width`            | `number`                       | Custom width of the video.                                 |
| `playing`          | `boolean` _(read-only)_        | `true` if the video is currently playing.                  |

---

### Minimal example

```typescript
const videoRenderer = new VideoRenderer({
    video: this.assetManager.getVideo("video.mp4"),
    width: 1920,
    height: 1080,
});
```

---

### Full example

```typescript
const videoRenderer = new VideoRenderer({
    video: this.assetManager.getVideo("video.mp4"),
    width: 1920,
    height: 1080,
    offset: new Vector2(0, 0),
    flipHorizontally: false,
    flipVertically: false,
    rotation: 0,
    opacity: 1,
    maskColor: "#FF0000",
    maskColorMix: 0,
    tintColor: "#00FF00",
    layer: "Default",
    slice: { x: 0, y: 0, width: 1920, height: 1080 },
    volume: 1,
    loop: false,
    fixedToTimeScale: false,
});
```

---

### Playback control

The component provides three public methods to control video playback:

-   `play(videoSource?: HTMLVideoElement)`: Sets the state to playing. Optionally, assigns a new video source.
-   `pause()`: Sets the state to paused.
-   `stop()`: Sets the state to stopped.

**Important:**  
These functions **do not execute any playback logic directly**.  
They only modify the `action` attribute.  
The actual playback logic is handled by the system that processes the component.

```typescript
videoRenderer.play();
videoRenderer.pause();
videoRenderer.stop();
```

---

### Notes

-   To display the video on the screen, the entity must include a `VideoRenderer` component and be part of an active scene.
-   The `fixedToTimeScale` attribute allows synchronizing playback speed with the engine’s configured time scale.
-   Browser autoplay policies require at least one user interaction before video playback can start.
