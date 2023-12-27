import { EngineComponent } from "../core/Component";
import { InitOptions } from "../core/GameActor";

const userInputEventNames = [
    "click",
    "contextmenu",
    "auxclick",
    "dblclick",
    "mousedown",
    "mouseup",
    "pointerup",
    "touchend",
    "keydown",
    "keyup",
];

const defaultAudioSourceName = "default";

/**
 * AudioPlayer configuration options
 * @public
 * @category Components
 * @example
 * ```js
 * const audioPlayer = this.addComponent(AudioPlayer, {
 *   volume: 1,
 *   loop: true,
 * });
 * ```
 */
export interface AudioPlayerOptions extends InitOptions {
    /** [optional] The initial volume. Values between 1 and 0. */
    volume?: number;
    /** [optional] Plays the audio in loop */
    loop?: boolean;
}

/**
 * The AudioPlayer component is used to play audio files and audio clips, like music and sound fx.
 * @public
 * @category Components
 * @example
 * ```js
 * const audioPlayer = this.addComponent(AudioPlayer);
 * audioPlayer.addAudioSource(AssetManager.getAudio("audio.ogg"), "AudioName");
 * audioPlayer.loadAudioSource("AudioName", true, 1);
 * audioPlayer.play();
 *
 * // plays a clip only once
 * audioPlayer.playClip(AssetManager.getAudio("clip.ogg"), 1);
 * ```
 */
export class AudioPlayer extends EngineComponent {
    /** @internal */
    public readonly allowMultiple: boolean = false;

    private audioContext: AudioContext;
    private tracks: MediaElementAudioSourceNode[] = [];
    private audioSourceCache: Map<string, HTMLAudioElement> = new Map();

    private _audioSource: HTMLAudioElement;
    private _volume: number;
    private _loop: boolean;

    private _playing: boolean = false;
    private _paused: boolean = false;

    /** The loaded audio source element */
    public get audioSource(): HTMLAudioElement {
        return this._audioSource;
    }

    /** The loaded audio volume */
    public set volume(volume: number) {
        this._volume = volume;
        if (this._audioSource) this._audioSource.volume = volume;
    }

    /** The loaded audio volume */
    public get volume(): number {
        return this._volume;
    }

    /** Plays the loaded audio in loop */
    public set loop(loop: boolean) {
        this._loop = loop;
        if (this._audioSource) this._audioSource.loop = loop;
    }

    /** Plays the loaded audio in loop */
    public get loop(): boolean {
        return this._loop;
    }

    /** The loaded audio is playing */
    public get playing(): boolean {
        return this._playing;
    }

    /** The loaded audio is paused */
    public get paused(): boolean {
        return this._paused;
    }

    protected init({ loop, volume }: AudioPlayerOptions = {}): void {
        this.audioContext = new AudioContext();

        // see https://developer.chrome.com/blog/autoplay/#webaudio
        if (this.audioContext.state !== "running") {
            userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));
        }

        this._volume = volume ?? 1;
        this._loop = loop ?? false;
    }

    /**
     * Play once the given audio source
     * @param audioSource The audio source element
     * @param volume [optional] The audio volume. Values between 1 and 0.
     */
    public playClip(audioSource: HTMLAudioElement, volume?: number): void {
        if (audioSource.currentTime > 0) audioSource.currentTime = 0;
        audioSource.volume = volume ?? this._volume;
        audioSource.play();
    }

    /**
     * Add a new audio source
     * @param audioSource The audio source element
     * @param name The name to identify the audio source. Optional if the AudioPlayer will only play one audio.
     */
    public addAudioSource(audioSource: HTMLAudioElement, name: string = defaultAudioSourceName): void {
        const newAudioSource = audioSource.cloneNode() as HTMLAudioElement;
        this.audioSourceCache.set(name, newAudioSource);

        const track = this.audioContext.createMediaElementSource(newAudioSource);
        track.connect(this.audioContext.destination);
        this.tracks.push(track);
    }

    /**
     * Load the given audio source (if there is other audio source playing, it will stop)
     * @param audioSourceName The name to identify the audio source
     * @param loop [optional] Play the audio in loop
     * @param volume [optional] The audio volume. Values between 1 and 0.
     */
    public loadAudioSource(audioSourceName: string, loop?: boolean, volume?: number): void {
        this.stop();

        this._audioSource = this.audioSourceCache.get(audioSourceName);
        this._loop = loop ?? this._loop;
        this._volume = volume ?? this._volume;
    }

    /**
     * Play the loaded audio source
     */
    public play(): void {
        if (!this._audioSource) return;

        if (this._playing && this._paused === false) {
            return;
        }

        if (this._paused) {
            this._paused = false;
            this._audioSource.play();
            return;
        }

        this._audioSource.volume = this._volume;
        this._audioSource.loop = this._loop;

        this._audioSource.addEventListener("ended", this.audioEventHandler);

        this._playing = true;

        if (this.audioContext.state === "running") this._audioSource.play();
    }

    /**
     * Stop playing the current audio source
     */
    public stop(): void {
        if (this._playing) {
            this._audioSource.pause();
            this._audioSource.currentTime = 0;
            this._audioSource.removeEventListener("ended", this.audioEventHandler);

            this._playing = false;
            this._paused = false;
        }
    }

    /**
     * Plause the current audio source
     */
    public pause(): void {
        if (this._playing && this._paused === false) {
            this._audioSource.pause();
            this._paused = true;
        }
    }

    private audioEventHandler = (e: Event): void => {
        if (e.type === "ended") {
            this._playing = false;
            this._audioSource.removeEventListener("ended", this.audioEventHandler);
        }
    };

    // see https://developer.chrome.com/blog/autoplay/#webaudio
    private userInputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userInputEventHandler);
        });

        this.audioContext.resume();
        if (this._audioSource && this._playing) this._audioSource.play();
    };

    protected onActiveChange(): void {
        if (this.active === false) {
            this.stop();
        }
    }

    protected onDestroy(): void {
        this.stop();
        this.audioContext.close();
    }
}
