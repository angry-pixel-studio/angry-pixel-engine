import AudioPlayer from "../../Engine/Components/AudioPlayer";
import { container } from "../../Engine/Game";
import GameObject from "../../Engine/GameObject";

export default class MusicPlayer extends GameObject {
    assetManager = container.getSingleton("AssetManager");
    audioPlayer = null;

    constructor() {
        super();

        this.addComponent(() => new AudioPlayer(), "AudioPlayer");
        this.audioPlayer = this.getComponent("AudioPlayer");

        this.audioPlayer.audio = this.assetManager.getAudio("audio/music.wav");
        this.audioPlayer.volume = 0.2;
        this.audioPlayer.loop = true;
    }

    start() {
        this.audioPlayer.play();
    }
}
