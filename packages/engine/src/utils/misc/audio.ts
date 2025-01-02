/**
 * Options for playSfx function.
 * @public
 * @category Audio
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
 * This funciton is ideal to play one-shot sound effects. It will play the sound effect from the beginning, even if it's already playing.\
 * You can also use this function to play audio tracks, but it is recommended to use the AudioPlayer component for this. The AudioPlayer component can handle the browser's autoplay policy and other audio-related functions.
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
 * Stop a sound effect.
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
