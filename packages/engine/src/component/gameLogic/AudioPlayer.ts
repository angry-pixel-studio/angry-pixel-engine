/**
 * @public
 * @category Components
 */
export interface AudioPlayerOptions {
    action: AudioPlayerAction;
    audioSource: HTMLAudioElement;
    loop: boolean;
    volume: number;
}

/**
 * @public
 * @category Components
 */
export class AudioPlayer {
    action: AudioPlayerAction = "stop";
    audioSource: HTMLAudioElement;
    loop: boolean = false;
    playing: boolean = false;
    volume: number = 1;
    /** @internal */
    _currentAudio: string = undefined;

    constructor(options?: Partial<AudioPlayerOptions>) {
        Object.assign(this, options);
    }
}

/**
 * @public
 * @category Components
 */
export type AudioPlayerAction = "stop" | "play" | "pause";
