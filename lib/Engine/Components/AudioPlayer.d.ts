import { Component } from "../Component";
interface Config {
    audio?: HTMLAudioElement;
    volume?: number;
    loop?: boolean;
}
export declare const TYPE_AUDIO_PLAYER: string;
export declare class AudioPlayer extends Component {
    volume: number;
    loop: boolean;
    audio: HTMLAudioElement;
    private audioClone;
    private _playing;
    private _paused;
    constructor(config?: Config);
    playAudio(audio: HTMLAudioElement, volume?: number | null): void;
    play(): void;
    stop(): void;
    pause(): void;
    private audioEventHandler;
    private userinputEventHandler;
}
export {};
