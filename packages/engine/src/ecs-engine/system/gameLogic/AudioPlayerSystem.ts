import { IEntityManager } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";
import { AudioPlayer } from "../../component/AudioPlayer";

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

export class AudioPlayerSystem extends System {
    private canPlay: boolean = false;

    constructor(private entityManager: IEntityManager) {
        super();
        this.group = SystemGroup.PreGameLogic;
    }

    public onCreate(): void {
        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        this.canPlay = false;
        userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));
    }

    // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
    private userInputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userInputEventHandler);
        });

        this.canPlay = true;
    };

    public onUpdate(): void {
        if (!this.canPlay) return;

        this.entityManager.search(AudioPlayer).forEach(({ component: audioPlayer }) => {
            if (!audioPlayer.audioSource || !audioPlayer.audioSource.duration) return;

            audioPlayer.audioSource.loop = audioPlayer.loop;
            audioPlayer.audioSource.volume = audioPlayer.volume;

            if (audioPlayer.action === "play" && audioPlayer.audioSource.paused) {
                audioPlayer.audioSource.play();
                audioPlayer.action = "playing";
            } else if (audioPlayer.action === "pause" && !audioPlayer.audioSource.paused) {
                audioPlayer.audioSource.pause();
            } else if (
                audioPlayer.action === "stop" &&
                (!audioPlayer.audioSource.paused || audioPlayer.audioSource.currentTime !== 0)
            ) {
                audioPlayer.audioSource.pause();
                audioPlayer.audioSource.currentTime = 0;
            } else if (audioPlayer.action === "playing" && audioPlayer.audioSource.paused) {
                audioPlayer.action = "stop";
            }
        });
    }
}
