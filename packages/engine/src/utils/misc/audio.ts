/**
 * Configuration options for playing sound effects with the playSfx function.
 * Allows specifying the audio source to play, optional volume level (0-1),
 * and whether the sound should loop continuously.
 * @public
 * @category Audio
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource });
 * ```
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource, volume: 0.5 });
 * ```
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource, loop: true });
 * ```
 */
export interface PlaySfxOptions {
    /* The audio source to play. */
    audioSource: HTMLAudioElement;
    /* The volume of the audio source. */
    volume?: number;
    /* TRUE If the audio source should loop. */
    loop?: boolean;
}

/**
 * Plays a sound effect from the beginning, even if it's currently playing. Ideal for one-shot sound effects like explosions, impacts, or UI feedback.\
 * While this function can play any audio, it's recommended to use the AudioPlayer component for background music or longer tracks.\
 * The AudioPlayer component provides additional features like handling browser autoplay policies, fading, and advanced playback control.
 * @param playSfxOptions - The options for playing the sound effect.
 * @public
 * @category Audio
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource });
 * ```
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource, volume: 0.5 });
 * ```
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * playSfx({ audioSource, loop: true });
 * ```
 */
export const playSfx = ({ audioSource, volume = 1, loop = false }: PlaySfxOptions): void => {
    audioSource.volume = volume;
    audioSource.loop = loop;
    audioSource.currentTime = 0;
    audioSource.play().catch((error) => console.warn("playSfx error:", error));
};

/**
 * Stops a sound effect by pausing playback and resetting its position to the beginning.\
 * Useful for immediately silencing sound effects or interrupting looped audio.\
 * Note that this completely stops the audio - to temporarily pause, use audioSource.pause() directly.
 * @param audioSource - The audio source to stop.
 * @public
 * @category Audio
 * @example
 * ```javascript
 * const audioSource = this.assetManager.getAudio("audio/sfx/coin.ogg");
 * stopSfx(audioSource);
 * ```
 */
export const stopSfx = (audioSource: HTMLAudioElement): void => {
    audioSource.pause();
    audioSource.currentTime = 0;
};
