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
exports.Animator = exports.TYPE_ANIMATOR = void 0;
var Component_1 = require("../Component");
var Game_1 = require("../Game");
var AnimationPlayer_1 = require("./Animator/AnimationPlayer");
exports.TYPE_ANIMATOR = "Animator";
var Animator = /** @class */ (function (_super) {
    __extends(Animator, _super);
    function Animator(config) {
        var _this = _super.call(this) || this;
        _this.timeManager = Game_1.container.getSingleton("TimeManager");
        _this.spriteRenderer = null;
        _this.animations = new Map();
        _this.currentAnimation = null;
        _this.defaultSprite = null;
        _this.type = exports.TYPE_ANIMATOR;
        _this.spriteRenderer = config.spriteRenderer;
        return _this;
    }
    Animator.prototype.start = function () {
        this.defaultSprite = this.spriteRenderer.sprite;
    };
    Animator.prototype.update = function () {
        if (this.currentAnimation === null) {
            this.spriteRenderer.sprite = this.defaultSprite;
            return;
        }
        this.currentAnimation.playFrame(this.timeManager.deltaTime);
        if (this.currentAnimation.restarted === true && this.currentAnimation.loop === false) {
            this.stopAnimation();
        }
        else {
            this.spriteRenderer.sprite = this.currentAnimation.sprite;
        }
    };
    Animator.prototype.addAnimation = function (name, animation) {
        this.animations.set(name, new AnimationPlayer_1.AnimationPlayer(animation));
        return this;
    };
    Animator.prototype.playAnimation = function (name) {
        if (this.active === false) {
            return;
        }
        if (this.animations.has(name) === false) {
            throw new Error("Animation with name " + name + " does not exist.");
        }
        this.currentAnimation = this.animations.get(name);
    };
    Animator.prototype.stopAnimation = function () {
        if (this.active === false) {
            return;
        }
        if (this.currentAnimation !== null) {
            this.currentAnimation = null;
        }
    };
    return Animator;
}(Component_1.Component));
exports.Animator = Animator;
//# sourceMappingURL=Animator.js.map