import { AudioPlayer } from "@component/gameLogic/AudioPlayer";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { InputManager } from "@manager/InputManager";
import { TimeManager } from "@manager/TimeManager";
import { AssetManager } from "@manager/AssetManager";

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

@injectable(SYSTEM_SYMBOLS.AudioPlayerSystem)
export class AudioPlayerSystem implements System {
    private canPlay: boolean = true;
    private userInputErrorCatched: boolean = false;

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.InputManager) private readonly inputManager: InputManager,
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
        @inject(SYMBOLS.AudioContext) private readonly audioContext: AudioContext,
    ) {}

    public onCreate(): void {
        // suspend the AudioContext when the document is hidden so audio doesn't keep playing in the background.
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.canPlay = false;
                if (this.audioContext.state === "running") this.audioContext.suspend();
            } else {
                this.canPlay = true;
                if (this.audioContext.state === "suspended") this.audioContext.resume();
            }
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
        userInputEventNames.forEach((eventName) => window.removeEventListener(eventName, this.userInputEventHandler));
        this.canPlay = true;
        // Resume the AudioContext from inside the user-gesture handler.
        if (this.audioContext.state === "suspended") this.audioContext.resume();
    };

    private checkGamepad(): boolean {
        this.canPlay = this.inputManager.gamepads.some((gp) => gp.anyButtonPressed);
        return this.canPlay;
    }

    public onUpdate(): void {
        if (!this.canPlay && !this.checkGamepad()) return;

        this.entityManager.search(AudioPlayer, (audioPlayer) => {
            // resolve string audio source through the AssetManager
            if (typeof audioPlayer.audioSource === "string") {
                const resolved = this.assetManager.getAudio(audioPlayer.audioSource);
                if (!resolved?.buffer) return; // asset missing or not decoded yet
                audioPlayer.audioSource = resolved;
            }

            // wait for decode to populate the buffer (`loadAudio` returns the AudioSource synchronously)
            if (!audioPlayer.audioSource?.buffer) return;

            if (audioPlayer._playAfterUserInput) {
                audioPlayer._playAfterUserInput = false;
                audioPlayer.action = "play";
            }

            // new audio source — stop any current playback before replacing it
            if (audioPlayer.audioSource !== audioPlayer._currentAudioSource) {
                this.disposeSource(audioPlayer);
                audioPlayer._currentAudioSource = audioPlayer.audioSource;
                audioPlayer._pauseOffset = 0;
                audioPlayer.state = "stopped";
            }

            // live updates to gain/playbackRate/loop on the active node so user-side mutations take effect
            if (audioPlayer._gainNode) audioPlayer._gainNode.gain.value = audioPlayer.volume;
            if (audioPlayer._sourceNode) {
                audioPlayer._sourceNode.playbackRate.value = this.computePlaybackRate(audioPlayer);
                audioPlayer._sourceNode.loop = audioPlayer.loop;
            }

            if (audioPlayer.action === "play" && audioPlayer.state !== "playing") {
                if (this.audioContext.state === "suspended") {
                    audioPlayer._playAfterUserInput = true;
                    if (!this.userInputErrorCatched) this.catchUserInput();
                } else {
                    this.startSource(audioPlayer);
                    audioPlayer.state = "playing";
                }
            } else if (audioPlayer.action === "pause" && audioPlayer.state === "playing") {
                this.pauseSource(audioPlayer);
                audioPlayer.state = "paused";
            } else if (audioPlayer.action === "stop" && audioPlayer.state !== "stopped") {
                this.disposeSource(audioPlayer);
                audioPlayer._pauseOffset = 0;
                audioPlayer.state = "stopped";
            }

            audioPlayer.action = undefined;
        });
    }

    public onDisabled(): void {
        this.entityManager.search(AudioPlayer, (audioPlayer) => {
            if (!audioPlayer.stopOnSceneTransition) return;
            this.disposeSource(audioPlayer);
            audioPlayer._pauseOffset = 0;
            audioPlayer.state = "stopped";
        });
    }

    public onDestroy(): void {
        this.onDisabled();
    }

    private computePlaybackRate(audioPlayer: AudioPlayer): number {
        if (!audioPlayer.fixedToTimeScale) return 1;
        return this.timeManager.timeScale < 0.0625 ? 0 : Math.min(this.timeManager.timeScale, 16);
    }

    /**
     * Create a fresh BufferSourceNode, wire it through a (possibly reused) GainNode,
     * and start playback at the saved pause offset.
     */
    private startSource(audioPlayer: AudioPlayer): void {
        const source = this.audioContext.createBufferSource();
        source.buffer = audioPlayer._currentAudioSource.buffer;
        source.loop = audioPlayer.loop;
        source.playbackRate.value = this.computePlaybackRate(audioPlayer);

        const gain = audioPlayer._gainNode ?? this.audioContext.createGain();
        gain.gain.value = audioPlayer.volume;

        source.connect(gain);
        if (!audioPlayer._gainNode) gain.connect(this.audioContext.destination);

        source.onended = () => {
            // ignore "ended" we triggered ourselves (stop/pause/source-change replace the node first)
            if (audioPlayer._sourceNode !== source) return;
            audioPlayer._sourceNode = undefined;
            audioPlayer._pauseOffset = 0;
            audioPlayer.state = "stopped";
        };

        const offset = audioPlayer._pauseOffset;
        source.start(0, offset);

        audioPlayer._sourceNode = source;
        audioPlayer._gainNode = gain;
        audioPlayer._startedAt = this.audioContext.currentTime - offset;
    }

    /**
     * Stop the active source and persist the elapsed offset (loop-aware) so a subsequent play resumes from there.
     */
    private pauseSource(audioPlayer: AudioPlayer): void {
        if (!audioPlayer._sourceNode) return;
        let elapsed = this.audioContext.currentTime - audioPlayer._startedAt;
        if (audioPlayer.loop && audioPlayer._currentAudioSource) {
            elapsed %= audioPlayer._currentAudioSource.buffer.duration;
        }
        audioPlayer._pauseOffset = Math.max(0, elapsed);
        this.disposeSource(audioPlayer);
    }

    private disposeSource(audioPlayer: AudioPlayer): void {
        if (!audioPlayer._sourceNode) return;
        audioPlayer._sourceNode.onended = null;
        try {
            audioPlayer._sourceNode.stop();
        } catch {
            // start() never called or already stopped — ignore
        }
        audioPlayer._sourceNode = undefined;
    }
}
