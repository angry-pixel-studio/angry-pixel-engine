import { AudioSource } from "@manager/AssetManager";

/**
 * Configuration options for playing sound effects with {@link playSfx}.
 * @public
 * @category Audio
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource });
 * ```
 * @example
 * ```javascript
 * playSfx({ audioSource, volume: 0.5 });
 * ```
 * @example
 * ```javascript
 * playSfx({ audioSource, loop: true });
 * ```
 */
export interface PlaySfxOptions {
    /** The audio asset to play (typically obtained via `AssetManager.getAudio`). */
    audioSource: AudioSource;
    /** The volume of the audio source. */
    volume?: number;
    /** TRUE If the audio source should loop. */
    loop?: boolean;
}

/**
 * Plays a sound effect from the beginning, even if it's currently playing. Ideal for one-shot sound effects like
 * explosions, impacts, or UI feedback.\
 * For background music or longer tracks with pause/resume semantics, prefer the `AudioPlayer` component
 * (which uses the Web Audio API and handles browser autoplay policies).
 * @param options Sound effect configuration.
 * @public
 * @category Audio
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource });
 * ```
 * @example
 * ```javascript
 * playSfx({ audioSource, volume: 0.5 });
 * ```
 * @example
 * ```javascript
 * playSfx({ audioSource, loop: true });
 * ```
 */
export const playSfx = ({ audioSource, volume = 1, loop = false }: PlaySfxOptions): void => {
    const { element } = audioSource;
    element.volume = volume;
    element.loop = loop;
    element.currentTime = 0;
    element.play().catch((error) => console.warn("playSfx error:", error));
};

/**
 * Stops a sound effect by pausing playback and resetting its position to the beginning.\
 * Useful for immediately silencing sound effects or interrupting looped audio.
 * @param audioSource The audio asset to stop.
 * @public
 * @category Audio
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * stopSfx(audioSource);
 * ```
 */
export const stopSfx = (audioSource: AudioSource): void => {
    audioSource.element.pause();
    audioSource.element.currentTime = 0;
};
