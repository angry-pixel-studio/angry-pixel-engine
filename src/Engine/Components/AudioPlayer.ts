import { EngineComponent } from "../Component";

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

export const TYPE_AUDIO_PLAYER: string = "AudioPlayer";

export class AudioPlayer extends EngineComponent {
    public volume: number = 1;
    public loop: boolean = false;
    public audio: HTMLAudioElement = null;

    private audioClone: HTMLAudioElement = null;
    private _playing: boolean = false;
    private _paused: boolean = false;

    constructor(config: AudioPlayerConfig = { audio: null, volume: 1, loop: false }) {
        super();

        this.allowMultiple = false;
        this.type = TYPE_AUDIO_PLAYER;

        this.audio = config.audio ?? this.audio;
        this.volume = config.volume ?? this.volume;
        this.loop = config.loop ?? this.loop;
    }

    public playAudio(audio: HTMLAudioElement, volume: number | null = null): void {
        this.audioClone = audio.cloneNode() as HTMLAudioElement;

        this.audioClone.volume = volume ?? this.volume;
        this.audioClone.play();
    }

    public play(): void {
        if (this.audio === null) {
            return;
        }

        if (this._playing && this._paused === false) {
            return;
        }

        if (this._paused) {
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
            this._paused;
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
}
