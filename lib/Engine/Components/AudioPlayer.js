"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = exports.TYPE_AUDIO_PLAYER = void 0;
var Component_1 = require("../Component");
var userInputEventNames = [
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
exports.TYPE_AUDIO_PLAYER = "AudioPlayer";
var AudioPlayer = /** @class */ (function (_super) {
    __extends(AudioPlayer, _super);
    function AudioPlayer(_a) {
        var _b = _a === void 0 ? { audio: null, volume: 1, loop: false } : _a, _c = _b.audio, audio = _c === void 0 ? null : _c, _d = _b.volume, volume = _d === void 0 ? 1 : _d, _e = _b.loop, loop = _e === void 0 ? false : _e;
        var _this = _super.call(this) || this;
        _this.volume = 1;
        _this.loop = false;
        _this.audioClone = null;
        _this._playing = false;
        _this._paused = false;
        _this.audioEventHandler = function (e) {
            if (e.type === "ended") {
                _this._playing = false;
                _this.audio.removeEventListener("ended", _this.audioEventHandler);
            }
        };
        // see https://developers.google.com/web/updates/2018/11/web-audio-autoplay
        _this.userinputEventHandler = function () {
            userInputEventNames.forEach(function (eventName) {
                window.removeEventListener(eventName, _this.userinputEventHandler);
            });
            _this.audio.play();
        };
        _this.allowMultiple = false;
        _this.type = exports.TYPE_AUDIO_PLAYER;
        _this.audio = audio;
        _this.volume = volume;
        _this.loop = loop;
        return _this;
    }
    AudioPlayer.prototype.playAudio = function (audio, volume) {
        if (volume === void 0) { volume = null; }
        this.audioClone = audio.cloneNode();
        this.audioClone.volume = volume !== null && volume !== void 0 ? volume : this.volume;
        this.audioClone.play();
    };
    AudioPlayer.prototype.play = function () {
        var _this = this;
        if (this.audio === null) {
            return;
        }
        if (this._playing && this._paused === false) {
            return;
        }
        if (this._paused) {
            this.audio.play();
            return;
        }
        this.audio.volume = this.volume;
        this.audio.loop = this.loop;
        this.audio.addEventListener("ended", this.audioEventHandler);
        this._playing = true;
        var promise = this.audio.play();
        // see https://developers.google.com/web/updates/2018/11/web-audio-autoplay
        promise
            .then(function () {
            // do nothing
        })
            .catch(function () {
            return userInputEventNames.forEach(function (eventName) {
                return window.addEventListener(eventName, _this.userinputEventHandler);
            });
        });
    };
    AudioPlayer.prototype.stop = function () {
        if (this._playing) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.removeEventListener("ended", this.audioEventHandler);
            this._playing = false;
            this._paused = false;
        }
    };
    AudioPlayer.prototype.pause = function () {
        if (this._playing && this._paused === false) {
            this.audio.pause();
            this._paused;
        }
    };
    return AudioPlayer;
}(Component_1.Component));
exports.AudioPlayer = AudioPlayer;
//# sourceMappingURL=AudioPlayer.js.map