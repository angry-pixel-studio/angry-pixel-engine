export class AudioPlayer {
    audioSource: HTMLAudioElement;
    volume: number = 1;
    loop: boolean = false;
    action: AudioPlayerAction = "stop";
}

export type AudioPlayerAction = "stop" | "play" | "pause" | "playing";
