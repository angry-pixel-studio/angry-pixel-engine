/**
 * @public
 * @category Components
 */
export interface AudioPlayerOptions {
    /** The action to perform with the audio source. */
    action: AudioPlayerAction;
    /** The audio source to play. */
    audioSource: HTMLAudioElement;
    /** TRUE If the playback rate is fixed to the TimeManager time scale, default FALSE */
    fixedToTimeScale: boolean;
    /** TRUE If the audio source should loop. */
    loop: boolean;
    /** The volume of the audio source. */
    volume: number;
}

/**
 * @public
 * @category Components
 */
export class AudioPlayer {
    /** The action to perform with the audio source. */
    action: AudioPlayerAction = "stop";
    /** The audio source to play. */
    audioSource: HTMLAudioElement;
    /** TRUE If the playback rate is fixed to the TimeManager time scale, default FALSE */
    fixedToTimeScale: boolean = false;
    /** TRUE If the audio source should loop. */
    loop: boolean = false;
    /** READONLY, TRUE If the audio source is playing. */
    playing: boolean = false;
    /** The volume of the audio source. */
    volume: number = 1;

    /** @internal */
    _currentAudioSrc: string = undefined;
    /* @internal */
    _playPromisePendind: boolean = false;

    constructor(options?: Partial<AudioPlayerOptions>) {
        Object.assign(this, options);
    }

    /**
     * Play the audio source.
     */
    public play(audioSource?: HTMLAudioElement): void {
        if (audioSource) this.audioSource = audioSource;
        this.action = "play";
    }

    /**
     * Pause the audio source.
     */
    public pause(): void {
        this.action = "pause";
    }

    /**
     * Stop the audio source.
     */
    public stop(): void {
        this.action = "stop";
    }
}

/**
 * @public
 * @category Components
 */
export type AudioPlayerAction = "stop" | "play" | "pause";
