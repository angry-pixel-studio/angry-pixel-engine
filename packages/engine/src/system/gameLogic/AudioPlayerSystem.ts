import { AudioPlayer } from "@component/gameLogic/AudioPlayer";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systems";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { InputManager } from "@manager/InputManager";
import { TimeManager } from "@manager/TimeManager";

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

@injectable(SYSTEMS.AudioPlayerSystem)
export class AudioPlayerSystem implements System {
    private canPlay: boolean = true;
    private userInputErrorCatched: boolean = false;

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.InputManager) private readonly inputManager: InputManager,
        @inject(TYPES.TimeManager) private readonly timeManager: TimeManager,
    ) {}

    public onCreate(): void {
        // pauses audio when document is not visible
        document.addEventListener("visibilitychange", () => {
            this.entityManager.search(AudioPlayer).forEach(({ component: { audioSource, playing } }) => {
                if (document.hidden && audioSource) audioSource.pause();
                else if (!document.hidden && audioSource && playing) audioSource.play();
            });
        });
    }

    private catchUserInput(): void {
        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        this.canPlay = false;
        this.userInputErrorCatched = true;
        userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));
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

            // new audio source
            if (audioPlayer.audioSource.src !== audioPlayer._currentAudioSrc) {
                audioPlayer._currentAudioSrc = audioPlayer.audioSource.src;
                audioPlayer.playing = false;
                audioPlayer.audioSource.currentTime = 0;
            }

            audioPlayer.audioSource.loop = audioPlayer.loop;
            audioPlayer.audioSource.volume = audioPlayer.volume;

            if (audioPlayer.action === "play" && !audioPlayer.playing && !audioPlayer._playPromisePendind) {
                // start playing
                audioPlayer._playPromisePendind = true;
                audioPlayer.audioSource.playbackRate = audioPlayer.fixedToTimeScale
                    ? this.timeManager.timeScale < 0.0625
                        ? 0
                        : Math.min(this.timeManager.timeScale, 16)
                    : 1;
                audioPlayer.audioSource
                    .play()
                    .then(() => {
                        audioPlayer._playPromisePendind = false;
                        audioPlayer.playing = true;
                    })
                    .catch(() => {
                        audioPlayer._playPromisePendind = false;
                        if (!this.userInputErrorCatched) this.catchUserInput();
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

    public onDisabled(): void {
        this.entityManager.search(AudioPlayer).forEach(({ component: { audioSource } }) => {
            if (audioSource) {
                audioSource.pause();
                audioSource.currentTime = 0;
            }
        });
    }

    public onDestroy(): void {
        this.onDisabled();
    }
}
