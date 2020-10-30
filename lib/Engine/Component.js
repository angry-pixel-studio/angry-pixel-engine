"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
var uuid_1 = require("uuid");
var Game_1 = require("./Game");
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this.sceneManager = Game_1.container.getSingleton("SceneManager");
        this.gameObjectManager = Game_1.container.getSingleton("GameObjectManager");
        this.uuid = uuid_1.v4();
        this.name = null;
        this.gameObject = null;
        this._active = true;
        this.firstFrame = true;
        this.gameLoopEventHandler = function () {
            if (_this._active === false) {
                return;
            }
            if (_this.firstFrame === true) {
                _this.start();
                _this.firstFrame = false;
            }
            else {
                _this.update();
            }
        };
        this.gameLoopEventHandler.bind(this);
        window.addEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
    }
    Object.defineProperty(Component.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setActive = function (active) {
        this._active = active;
    };
    Component.prototype.start = function () {
        // do nothing
    };
    Component.prototype.update = function () {
        // do nothing
    };
    Component.prototype.getCurrentScene = function () {
        return this.sceneManager.getCurrentScene();
    };
    Component.prototype.getComponent = function (name) {
        return this.gameObject.getComponent(name);
    };
    Component.prototype.findGameObjectByName = function (name) {
        return this.gameObjectManager.findGameObjectByName(name);
    };
    Component.prototype.findGameObjectsByTag = function (tag) {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    };
    Component.prototype.findGameObjectByTag = function (tag) {
        return this.gameObjectManager.findGameObjectByTag(tag);
    };
    Component.prototype.destroyGameObjectByName = function (name) {
        this.destroyGameObject(this.findGameObjectByName(name));
    };
    Component.prototype.destroyGameObject = function (gameObject) {
        this.gameObjectManager.destroyGameObject(gameObject);
    };
    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    Component.prototype.destroy = function () {
        var _this = this;
        window.removeEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
        // @ts-ignore
        Object.keys(this).forEach(function (key) { return delete _this[key]; });
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=Component.js.map