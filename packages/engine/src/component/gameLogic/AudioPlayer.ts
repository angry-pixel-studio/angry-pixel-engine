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
    /** The action to perform with the audio source. This action will be erased at the end of the frame */
    action: AudioPlayerAction = undefined;
    /** The audio source to play. */
    audioSource: HTMLAudioElement;
    /** TRUE If the playback rate is fixed to the TimeManager time scale, default FALSE */
    fixedToTimeScale: boolean = false;
    /** TRUE If the audio source should loop. */
    loop: boolean = false;
    /** READONLY, The current state of the audio source. */
    state: AudioPlayerState = "stopped";
    /** The volume of the audio source. */
    volume: number = 1;

    /** READONLY, TRUE If the audio source is playing. */
    public get playing(): boolean {
        return this.state === "playing";
    }

    /** READONLY, TRUE If the audio source is paused. */
    public get paused(): boolean {
        return this.state === "paused";
    }

    /** READONLY, TRUE If the audio source is stopped. */
    public get stopped(): boolean {
        return this.state === "stopped";
    }

    /** @internal */
    _currentAudioSource: HTMLAudioElement = undefined;
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

/**
 * @public
 * @category Components
 */
export type AudioPlayerState = "stopped" | "playing" | "paused";
