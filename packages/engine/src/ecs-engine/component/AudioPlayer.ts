export class AudioPlayer {
    public action: AudioPlayerAction = "stop";
    public audioSource: HTMLAudioElement;
    public loop: boolean = false;
    public playing: boolean = false;
    public volume: number = 1;
    /** @internal */
    public _currentAudio: string = undefined;
}

export type AudioPlayerAction = "stop" | "play" | "pause";
