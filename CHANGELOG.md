# Changelog

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
