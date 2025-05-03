## AudioPlayer

The `AudioPlayer` component manages audio playback within the game.  
It allows playing, pausing, and stopping audio sources, controlling volume, enabling looping playback, and optionally syncing the playback rate with the game’s time scale.

### Properties

| Property                | Type                           | Description                                                                                      |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `action`                | `AudioPlayerAction`            | Action to perform on the audio source. This is cleared at the end of the frame.                  |
| `audioSource`           | `HTMLAudioElement` \| `string` | The audio source to be played.                                                                   |
| `fixedToTimeScale`      | `boolean`                      | If `true`, playback speed will be locked to the `TimeManager`’s time scale. Defaults to `false`. |
| `loop`                  | `boolean`                      | If `true`, the audio source will loop playback.                                                  |
| `state` _(read-only)_   | `AudioPlayerState`             | The current state of the audio source: `"stopped"`, `"playing"`, or `"paused"`.                  |
| `volume`                | `number`                       | The volume of the audio source.                                                                  |
| `playing` _(read-only)_ | `boolean`                      | Returns `true` if the audio source is currently playing.                                         |
| `paused` _(read-only)_  | `boolean`                      | Returns `true` if the audio source is currently paused.                                          |
| `stopped` _(read-only)_ | `boolean`                      | Returns `true` if the audio source is currently stopped.                                         |

### Methods

| Method                                 | Description                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `play(audioSource?: HTMLAudioElement)` | Sets the `play` action to start playback. If a new `audioSource` is provided, it will be used. |
| `pause()`                              | Sets the `pause` action to pause the current playback.                                         |
| `stop()`                               | Sets the `stop` action to stop playback and reset the playback position to the beginning.      |

**Important:** These methods _do not perform any playback logic directly_. They only modify the `action` property. Actual playback, pause, or stop logic is handled by the system responsible for processing `AudioPlayer` components in the game loop.

### Example

```typescript
const audioPlayer = new AudioPlayer({
    audioSource: "sound.mp3",
    volume: 0.5,
    loop: true,
    fixedToTimeScale: false,
});

// Play
audioPlayer.play();

// Pause
audioPlayer.pause();

// Stop
audioPlayer.stop();
```

### Notes

-   The `AudioPlayer` supports both existing `HTMLAudioElement` sources and file path strings.
-   The `action` property signals the intended behavior for the next frame and is automatically cleared afterward.
-   The `fixedToTimeScale` option is useful for syncing sound effects or music with modified game speeds (e.g., slow motion or acceleration).
-   This component is designed to comply with modern browsers' autoplay policies. Audio playback will not start automatically — it will begin only after at least one user interaction has occurred on the page (such as a click or keypress).
