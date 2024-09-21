import { AudioPlayer } from "../../component/AudioPlayer";
import { IInputManager } from "../../../input";
import { ITimeManager } from "../../manager/TimeManager";
import { System } from "../../../ecs/SystemManager";
import { EntityManager } from "../../../ecs/EntityManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../config/types";

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

export class AudioPlayerSystem implements System {
    private canPlay: boolean = false;

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.InputManager) private readonly inputManager: IInputManager,
        @inject(TYPES.TimeManager) private readonly timeManager: ITimeManager,
    ) {}

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
                audioPlayer.audioSource.playbackRate =
                    this.timeManager.timeScale < 0.0625 ? 0 : Math.min(this.timeManager.timeScale, 16);
                audioPlayer.audioSource
                    .play()
                    .then(() => (audioPlayer.playing = true))
                    .catch(() => {
                        /* waiting for user interaction */
                    });
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

    public onDisable(): void {
        this.entityManager.search(AudioPlayer).forEach(({ component: { audioSource } }) => {
            if (audioSource) {
                audioSource.pause();
                audioSource.currentTime = 0;
            }
        });
    }

    public onDestroy(): void {
        this.onDisable();
    }
}
