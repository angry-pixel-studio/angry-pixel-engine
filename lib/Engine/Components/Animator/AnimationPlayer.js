"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationPlayer = void 0;
var FRAME_RATE = 24;
var AnimationPlayer = /** @class */ (function () {
    function AnimationPlayer(animation) {
        this.currentFrame = 0;
        this.frameTime = 0;
        this._sprite = null;
        this._restarted = false;
        this.animation = animation;
    }
    Object.defineProperty(AnimationPlayer.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationPlayer.prototype, "restarted", {
        get: function () {
            return this._restarted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationPlayer.prototype, "loop", {
        get: function () {
            return this.animation.loop;
        },
        enumerable: false,
        configurable: true
    });
    AnimationPlayer.prototype.playFrame = function (deltaTime) {
        this._restarted = false;
        if (this.frameTime >= 1 / (FRAME_RATE * this.animation.speed)) {
            this.frameTime = 0;
            this.currentFrame = this.currentFrame + 1 === this.animation.sprites.length ? 0 : this.currentFrame + 1;
            this._restarted = this.currentFrame === 0;
        }
        this._sprite = this.animation.sprites[this.currentFrame];
        this.frameTime += deltaTime;
    };
    return AnimationPlayer;
}());
exports.AnimationPlayer = AnimationPlayer;
//# sourceMappingURL=AnimationPlayer.js.map