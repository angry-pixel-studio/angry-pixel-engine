import { EngineComponent } from "../core/Component";
import { InitOptions } from "../core/GameActor";

export interface AudioPlayerOptions extends InitOptions {
    audio?: HTMLAudioElement;
    volume?: number;
    loop?: boolean;
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

    public volume: number = 1;
    public loop: boolean = false;
    public audio: HTMLAudioElement = null;

    private clones: Map<symbol, HTMLAudioElement> = new Map<symbol, HTMLAudioElement>();
    private _playing: boolean = false;
    private _paused: boolean = false;

    protected init(options: AudioPlayerOptions = {}): void {
        this.audio = options.audio ?? this.audio;
        this.volume = options.volume ?? this.volume;
        this.loop = options.loop ?? this.loop;
    }

    public playAudio(audio: HTMLAudioElement, volume: number | null = null): void {
        if (this.clones.has(Symbol.for(audio.src)) === false) this.cloneAudio(audio);

        const clone = this.clones.get(Symbol.for(audio.src));

        if (clone.currentTime > 0) clone.currentTime = 0;

        clone.volume = volume ?? this.volume;
        clone.play();
    }

    private cloneAudio(audio: HTMLAudioElement): void {
        const clone = audio.cloneNode() as HTMLAudioElement;
        this.clones.set(Symbol.for(audio.src), clone);
    }

    public play(): void {
        if (this.audio === null) {
            return;
        }

        if (this._playing && this._paused === false) {
            return;
        }

        if (this._paused) {
            this._paused = false;
            this.audio.play();
            return;
        }

        this.audio.volume = this.volume;
        this.audio.loop = this.loop;

        this.audio.addEventListener("ended", this.audioEventHandler);

        this._playing = true;
        const promise: Promise<void> = this.audio.play();

        // see https://developers.google.com/web/updates/2018/11/web-audio-autoplay
        promise
            .then(() => {
                // do nothing
            })
            .catch(() =>
                userInputEventNames.forEach((eventName) =>
                    window.addEventListener(eventName, this.userinputEventHandler)
                )
            );
    }

    public stop(): void {
        if (this._playing) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.removeEventListener("ended", this.audioEventHandler);

            this._playing = false;
            this._paused = false;
        }
    }

    public pause(): void {
        if (this._playing && this._paused === false) {
            this.audio.pause();
            this._paused = true;
        }
    }

    private audioEventHandler = (e: Event): void => {
        if (e.type === "ended") {
            this._playing = false;
            this.audio.removeEventListener("ended", this.audioEventHandler);
        }
    };

    // see https://developers.google.com/web/updates/2018/11/web-audio-autoplay
    private userinputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userinputEventHandler);
        });

        this.audio.play();
    };

    protected onActiveChange(): void {
        if (this.active === false) {
            this.stop();
        }
    }

    protected onDestroy(): void {
        this.stop();
    }
}
