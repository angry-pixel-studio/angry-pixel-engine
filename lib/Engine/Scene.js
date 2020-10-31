"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = exports.GAME_CAMERA_ID = void 0;
var GameCamera_1 = require("./GameObjects/GameCamera");
var Game_1 = require("./Game");
exports.GAME_CAMERA_ID = "GameCamera";
var Scene = /** @class */ (function () {
    function Scene() {
        var _this = this;
        this.game = null;
        this.name = null;
        this.gameObjectManager = Game_1.container.getSingleton("GameObjectManager");
        this.firstFrame = true;
        this.gameLoopEventHandler = function () {
            if (_this.firstFrame === true) {
                _this.start();
                _this.firstFrame = false;
            }
            else {
                _this.update();
            }
        };
        window.addEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
        this.addGameObject(function () { return new GameCamera_1.GameCamera(); }, exports.GAME_CAMERA_ID);
        this.gameLoopEventHandler.bind(this);
    }
    Scene.prototype.start = function () {
        // do nothing
    };
    Scene.prototype.update = function () {
        // do nothing
    };
    Object.defineProperty(Scene.prototype, "gameCamera", {
        get: function () {
            return this.findGameObjectByName(exports.GAME_CAMERA_ID);
        },
        enumerable: false,
        configurable: true
    });
    Scene.prototype.addGameObject = function (gameObjectFactory, name) {
        this.gameObjectManager.addGameObject(gameObjectFactory, name);
        return this;
    };
    Scene.prototype.getRootGameObjects = function () {
        return this.gameObjectManager.getGameObjects().filter(function (gameObject) { return gameObject.parent === null; });
    };
    Scene.prototype.findGameObjectByName = function (name) {
        return this.gameObjectManager.findGameObjectByName(name);
    };
    Scene.prototype.findGameObjectsByTag = function (tag) {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    };
    Scene.prototype.findGameObjectByTag = function (tag) {
        return this.gameObjectManager.findGameObjectByTag(tag);
    };
    Scene.prototype.destroyAllGameObjects = function () {
        this.gameObjectManager.destroyAllGameObjects();
    };
    Scene.prototype.destroyGameObjectByName = function (name) {
        this.destroyGameObject(this.findGameObjectByName(name));
    };
    Scene.prototype.destroyGameObject = function (gameObject) {
        this.gameObjectManager.destroyGameObject(gameObject);
    };
    /**
     * @description NOTE: do not use this method. Use SceneManager.unloadCurrentScene instead.
     */
    Scene.prototype.destroy = function () {
        var _this = this;
        window.removeEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
        this.gameObjectManager.destroyAllGameObjects();
        // @ts-ignore
        Object.keys(this).forEach(function (key) { return delete _this[key]; });
    };
    return Scene;
}());
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map