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
exports.Animator = void 0;
var Component_1 = require("../Component");
var Animator = /** @class */ (function (_super) {
    __extends(Animator, _super);
    function Animator(config) {
        var _this = _super.call(this) || this;
        _this.animations = {};
        _this.playingAnimationId = null;
        _this.spriteRenderer = null;
        _this.defaultSprite = null;
        _this.spriteRenderer = config.spriteRenderer;
        return _this;
    }
    Animator.prototype.start = function () {
        this.defaultSprite = this.spriteRenderer.sprite;
    };
    Animator.prototype.update = function () {
        if (this.playingAnimationId && this.animations[this.playingAnimationId].playing === true) {
            this.spriteRenderer.sprite = this.animations[this.playingAnimationId].currentSprite;
        }
        else if (this.playingAnimationId && this.animations[this.playingAnimationId].playing === false) {
            this.playingAnimationId = null;
            this.spriteRenderer.sprite = this.defaultSprite;
        }
        if (this.playingAnimationId === null) {
            this.defaultSprite = this.spriteRenderer.sprite;
        }
    };
    Animator.prototype.addAnimation = function (id, animation) {
        this.animations[id] = animation;
        return this;
    };
    Animator.prototype.playAnimation = function (id) {
        if (this.active === false) {
            return;
        }
        if (this.playingAnimationId != id && this.animations[id] !== undefined) {
            this.stopAnimation();
            this.playingAnimationId = id;
            this.animations[id].play();
        }
    };
    Animator.prototype.stopAnimation = function () {
        if (this.active === false) {
            return;
        }
        if (this.playingAnimationId !== null) {
            this.animations[this.playingAnimationId].stop();
        }
    };
    Animator.prototype.setCurrentAniamtionSpeed = function (speed) {
        if (this.playingAnimationId != null) {
            this.animations[this.playingAnimationId].speed = speed;
        }
    };
    Animator.prototype.setAnimationSpeed = function (id, speed) {
        if (this.animations[id] !== undefined) {
            this.animations[id].speed = speed;
        }
    };
    return Animator;
}(Component_1.Component));
exports.Animator = Animator;
//# sourceMappingURL=Animator.js.map