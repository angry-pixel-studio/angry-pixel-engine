import { EngineComponent } from "../core/Component";
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
const defaultAudioSourceName = "default";
/**
 * The AudioPlayer component is used to play audio files and audio clips, like music and sound fx.
 * @public
 * @category Components
 * @example
 * ```js
 * const audioPlayer = this.addComponent(AudioPlayer);
 * audioPlayer.addAudioSource(AssetManager.getAudio("audio.ogg"), "AudioName");
 * audioPlayer.loadAudioSource("AudioName", true, 1);
 * audioPlayer.play();
 *
 * // plays a clip only once
 * audioPlayer.playClip(AssetManager.getAudio("clip.ogg"), 1);
 * ```
 */
export class AudioPlayer extends EngineComponent {
    constructor() {
        super(...arguments);
        /** @internal */
        this.allowMultiple = false;
        this.tracks = [];
        this.audioSourceCache = new Map();
        this._playing = false;
        this._paused = false;
        this.audioEventHandler = (e) => {
            if (e.type === "ended") {
                this._playing = false;
                this._audioSource.removeEventListener("ended", this.audioEventHandler);
            }
        };
        // see https://developer.chrome.com/blog/autoplay/#webaudio
        this.userInputEventHandler = () => {
            userInputEventNames.forEach((eventName) => {
                window.removeEventListener(eventName, this.userInputEventHandler);
            });
            this.audioContext.resume();
            if (this._audioSource && this._playing)
                this._audioSource.play();
        };
    }
    /** The loaded audio source element */
    get audioSource() {
        return this._audioSource;
    }
    /** The loaded audio volume */
    set volume(volume) {
        this._volume = volume;
        if (this._audioSource)
            this._audioSource.volume = volume;
    }
    /** The loaded audio volume */
    get volume() {
        return this._volume;
    }
    /** Plays the loaded audio in loop */
    set loop(loop) {
        this._loop = loop;
        if (this._audioSource)
            this._audioSource.loop = loop;
    }
    /** Plays the loaded audio in loop */
    get loop() {
        return this._loop;
    }
    /** The loaded audio is playing */
    get playing() {
        return this._playing;
    }
    /** The loaded audio is paused */
    get paused() {
        return this._paused;
    }
    init({ loop, volume } = {}) {
        this.audioContext = new AudioContext();
        // see https://developer.chrome.com/blog/autoplay/#webaudio
        if (this.audioContext.state !== "running") {
            userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));
        }
        this._volume = volume !== null && volume !== void 0 ? volume : 1;
        this._loop = loop !== null && loop !== void 0 ? loop : false;
    }
    /**
     * Play once the given audio source
     * @param audioSource The audio source element
     * @param volume [optional] The audio volume. Values between 1 and 0.
     */
    playClip(audioSource, volume) {
        if (audioSource.currentTime > 0)
            audioSource.currentTime = 0;
        audioSource.volume = volume !== null && volume !== void 0 ? volume : this._volume;
        audioSource.play();
    }
    /**
     * Add a new audio source
     * @param audioSource The audio source element
     * @param name The name to identify the audio source. Optional if the AudioPlayer will only play one audio.
     */
    addAudioSource(audioSource, name = defaultAudioSourceName) {
        const newAudioSource = audioSource.cloneNode();
        this.audioSourceCache.set(name, newAudioSource);
        const track = this.audioContext.createMediaElementSource(newAudioSource);
        track.connect(this.audioContext.destination);
        this.tracks.push(track);
    }
    /**
     * Load the given audio source (if there is other audio source playing, it will stop)
     * @param audioSourceName The name to identify the audio source
     * @param loop [optional] Play the audio in loop
     * @param volume [optional] The audio volume. Values between 1 and 0.
     */
    loadAudioSource(audioSourceName, loop, volume) {
        this.stop();
        this._audioSource = this.audioSourceCache.get(audioSourceName);
        this._loop = loop !== null && loop !== void 0 ? loop : this._loop;
        this._volume = volume !== null && volume !== void 0 ? volume : this._volume;
    }
    /**
     * Play the loaded audio source
     */
    play() {
        if (!this._audioSource)
            return;
        if (this._playing && this._paused === false) {
            return;
        }
        if (this._paused) {
            this._paused = false;
            this._audioSource.play();
            return;
        }
        this._audioSource.volume = this._volume;
        this._audioSource.loop = this._loop;
        this._audioSource.addEventListener("ended", this.audioEventHandler);
        this._playing = true;
        if (this.audioContext.state === "running")
            this._audioSource.play();
    }
    /**
     * Stop playing the current audio source
     */
    stop() {
        if (this._playing) {
            this._audioSource.pause();
            this._audioSource.currentTime = 0;
            this._audioSource.removeEventListener("ended", this.audioEventHandler);
            this._playing = false;
            this._paused = false;
        }
    }
    /**
     * Plause the current audio source
     */
    pause() {
        if (this._playing && this._paused === false) {
            this._audioSource.pause();
            this._paused = true;
        }
    }
    onActiveChange() {
        if (this.active === false) {
            this.stop();
        }
    }
    onDestroy() {
        this.stop();
        this.audioContext.close();
    }
}
//# sourceMappingURL=AudioPlayer.js.map