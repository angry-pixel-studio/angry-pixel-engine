import { AudioSource } from "@manager/AssetManager";

/**
 * AudioPlayer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const audioPlayer = new AudioPlayer({
 *   audioSource: "sound.mp3",
 *   volume: 0.5,
 *   loop: true,
 *   fixedToTimeScale: false
 * });
 * ```
 */
export interface AudioPlayerOptions {
    /** The action to perform with the audio source. */
    action: AudioPlayerAction;
    /** The audio source to play. Either an `AudioSource` (from `AssetManager.getAudio`) or an asset URL/name string. */
    audioSource: AudioSource | string;
    /** TRUE If the audio source should stop on scene transition, FALSE otherwise. Default is TRUE. */
    stopOnSceneTransition: boolean;
    /** TRUE If the playback rate is fixed to the TimeManager time scale, default FALSE */
    fixedToTimeScale: boolean;
    /** TRUE If the audio source should loop. */
    loop: boolean;
    /** The volume of the audio source. */
    volume: number;
}

/**
 * The AudioPlayer component handles audio playback in the game. It manages playing, pausing and stopping audio sources,
 * controls volume and looping behavior, and can optionally sync playback speed with the game's time scale.
 * @public
 * @category Components
 * @example
 * ```js
 * const audioPlayer = new AudioPlayer({
 *   audioSource: "sound.mp3",
 *   volume: 0.5,
 *   loop: true,
 *   fixedToTimeScale: false
 * });
 * ```
 */
export class AudioPlayer {
    /** The action to perform with the audio source. This action will be erased at the end of the frame */
    action: AudioPlayerAction = undefined;
    /** The audio source to play. Either an `AudioSource` (from `AssetManager.getAudio`) or an asset URL/name string. */
    audioSource: AudioSource | string;
    /** TRUE If the audio source should stop on scene transition, FALSE otherwise. Default is TRUE. */
    stopOnSceneTransition: boolean = true;
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
    _currentAudioSource: AudioSource = undefined;
    /** @internal Active BufferSourceNode that's playing the current buffer (null when not playing) */
    _sourceNode: AudioBufferSourceNode = undefined;
    /** @internal GainNode wired between sourceNode and destination, used to set volume */
    _gainNode: GainNode = undefined;
    /** @internal AudioContext.currentTime when the current sourceNode started */
    _startedAt: number = 0;
    /** @internal Offset (seconds) within the buffer at which the next play should resume from (used on pause) */
    _pauseOffset: number = 0;
    /** @internal */
    _playAfterUserInput: boolean = false;
    /** @internal */
    static componentName: string = "AudioPlayer";

    constructor(options?: Partial<AudioPlayerOptions>) {
        Object.assign(this, options);
    }

    /**
     * Play the audio source.
     */
    public play(audioSource?: AudioSource | string): void {
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
 * @category Components Configuration
 */
export type AudioPlayerAction = "stop" | "play" | "pause";

/**
 * @public
 * @category Components Configuration
 */
export type AudioPlayerState = "stopped" | "playing" | "paused";
