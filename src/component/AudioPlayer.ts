import { EngineComponent } from "../core/Component";
import { ComponentTypes } from "./ComponentTypes";

export interface AudioPlayerConfig {
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
    public volume: number = 1;
    public loop: boolean = false;
    public audio: HTMLAudioElement = null;

    private clones: Map<symbol, HTMLAudioElement> = new Map<symbol, HTMLAudioElement>();
    private _playing: boolean = false;
    private _paused: boolean = false;

    constructor(config: AudioPlayerConfig = { audio: null, volume: 1, loop: false }) {
        super();

        this.allowMultiple = false;
        this.type = ComponentTypes.AudioPlayer;

        this.audio = config.audio ?? this.audio;
        this.volume = config.volume ?? this.volume;
        this.loop = config.loop ?? this.loop;
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

    public setActive(active: boolean): void {
        if (active === false) {
            this.stop();
        }
        super.setActive(active);
    }

    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    public destroy(): void {
        this.stop();
        super.destroy();
    }
}