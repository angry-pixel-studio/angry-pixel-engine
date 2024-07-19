import { IEntityManager } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";
import { AudioPlayer } from "../../component/AudioPlayer";
import { IInputManager } from "../../../input";

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

    constructor(
        private entityManager: IEntityManager,
        private inputManager: IInputManager,
    ) {
        super();
        this.group = SystemGroup.PreGameLogic;
    }

    public onCreate(): void {
        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        this.canPlay = false;
        userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));

        // pauses audio when document is not visible
        document.addEventListener("visibilitychange", () => {
            this.entityManager.search(AudioPlayer).forEach(({ component: { audioSource, playing } }) => {
                if (document.hidden && audioSource) audioSource.pause();
                else if (!document.hidden && audioSource && playing) audioSource.play();
            });
        });
    }

    // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
    private userInputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userInputEventHandler);
        });

        this.canPlay = true;
    };

    private checkGamepad(): boolean {
        this.canPlay = this.inputManager.gamepads.some((gp) => gp.anyButtonPressed);
        return this.canPlay;
    }

    public onUpdate(): void {
        if (!this.canPlay) if (!this.checkGamepad()) return;

        this.entityManager.search(AudioPlayer).forEach(({ component: audioPlayer }) => {
            if (!audioPlayer.audioSource || !audioPlayer.audioSource.duration) return;

            audioPlayer.audioSource.loop = audioPlayer.loop;
            audioPlayer.audioSource.volume = audioPlayer.volume;

            // new audio source
            if (audioPlayer.audioSource.src !== audioPlayer._currentAudio) {
                audioPlayer._currentAudio = audioPlayer.audioSource.src;
                audioPlayer.playing = false;
                audioPlayer.audioSource.currentTime = 0;
            }

            if (audioPlayer.action === "play" && !audioPlayer.playing) {
                // start playing
                try {
                    audioPlayer.audioSource.play();
                    audioPlayer.playing = true;
                } catch {
                    // do nothing
                }
            } else if (audioPlayer.action === "pause" && audioPlayer.playing) {
                // set pause
                audioPlayer.audioSource.pause();
                audioPlayer.playing = false;
            } else if (
                audioPlayer.action === "stop" &&
                (!audioPlayer.audioSource.paused || audioPlayer.audioSource.currentTime !== 0)
            ) {
                // force stop
                audioPlayer.audioSource.pause();
                audioPlayer.audioSource.currentTime = 0;
                audioPlayer.playing = false;
            } else if (audioPlayer.playing && audioPlayer.audioSource.paused) {
                // track is ended
                audioPlayer.action = "stop";
                audioPlayer.playing = false;
            }
        });
    }
}
