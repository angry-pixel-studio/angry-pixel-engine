import { EngineComponent } from "../core/Component";
import { InitOptions } from "../core/GameActor";

export interface AudioPlayerOptions extends InitOptions {
    audioSource?: HTMLAudioElement;
    volume?: number;
    loop?: boolean;
    playOnStart?: boolean;
}

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

export class AudioPlayer extends EngineComponent {
    public readonly allowMultiple: boolean = false;

    private audioContext: AudioContext;
    private tracks: MediaElementAudioSourceNode[] = [];

    private _audioSource: HTMLAudioElement;
    private _volume: number;
    private _loop: boolean;
    private playOnStart: boolean;

    private _playing: boolean = false;
    private _paused: boolean = false;

    protected init({ audioSource, loop, volume, playOnStart }: AudioPlayerOptions = {}): void {
        this.audioContext = new AudioContext();

        if (audioSource) this.audioSource = audioSource;

        this._volume = volume ?? 1;
        this._loop = loop ?? false;
        this.playOnStart = playOnStart ?? false;
    }

    protected start(): void {
        if (this.playOnStart) this.play();
    }

    public set audioSource(audioSource: HTMLAudioElement) {
        this._audioSource = audioSource.cloneNode() as HTMLAudioElement;

        if (!this.tracks.find((t) => t.mediaElement.src === audioSource.src)) {
            const track = this.audioContext.createMediaElementSource(this._audioSource);
            track.connect(this.audioContext.destination);
            this.tracks.push(track);
        }
    }

    public get audioSource(): HTMLAudioElement {
        return this._audioSource;
    }

    public set volume(volume: number) {
        this._volume = volume;
        if (this.audioSource) this._audioSource.volume = volume;
    }

    public get volume(): number {
        return this._volume;
    }

    public set loop(loop: boolean) {
        this._loop = loop;
        if (this.audioSource) this._audioSource.loop = loop;
    }

    public get loop(): boolean {
        return this._loop;
    }

    public playClip(audioSource: HTMLAudioElement, volume?: number): void {
        if (audioSource.currentTime > 0) audioSource.currentTime = 0;
        audioSource.volume = volume ?? this._volume;
        audioSource.play();
    }

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

        // see https://developer.chrome.com/blog/web-audio-autoplay/
        this._audioSource.play().catch(() => {
            if (this.audioContext.state !== "running") {
                userInputEventNames.forEach((eventName) =>
                    window.addEventListener(eventName, this.userInputEventHandler)
                );
            }
        });
    }

    public stop(): void {
        if (this._playing) {
            this._audioSource.pause();
            this._audioSource.currentTime = 0;
            this._audioSource.removeEventListener("ended", this.audioEventHandler);

            this._playing = false;
            this._paused = false;
        }
    }

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

    // see https://developer.chrome.com/blog/web-audio-autoplay/
    private userInputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userInputEventHandler);
        });

        this.audioContext.resume();
        this._audioSource.play();
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
