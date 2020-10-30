"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
var SceneManager = /** @class */ (function () {
    function SceneManager(game, renderManager) {
        this.game = null;
        this.scenes = {};
        this.currentScene = null;
        this.openingSceneName = null;
        this.game = game;
        this.renderManager = renderManager;
    }
    SceneManager.prototype.getCurrentScene = function () {
        return this.currentScene;
    };
    SceneManager.prototype.addScene = function (name, SceneConstructor, openingScene) {
        if (openingScene === void 0) { openingScene = false; }
        if (typeof this.scenes[name] === "function") {
            throw new Error("There is already a scene with the name '" + name + "'");
        }
        this.scenes[name] = SceneConstructor;
        if (openingScene === true || this.openingSceneName === null) {
            this.openingSceneName = name;
        }
    };
    SceneManager.prototype.loadOpeningScene = function () {
        this.loadScene(this.openingSceneName);
    };
    SceneManager.prototype.loadScene = function (name) {
        if (this.game === null) {
            throw new Error("Game not initialized.");
        }
        var resetLoop = this.game.running;
        if (resetLoop) {
            this.game.stopLoop();
        }
        this.unloadCurrentScene();
        this.currentScene = this.scenes[name]();
        this.currentScene.name = name;
        this.currentScene.game = this.game;
        if (resetLoop) {
            this.game.resumeLoop();
        }
    };
    SceneManager.prototype.unloadCurrentScene = function () {
        if (this.currentScene !== null) {
            this.currentScene.destroy();
            this.currentScene = null;
            this.currentSceneName = null;
            this.renderManager.clearRenderStack();
        }
    };
    return SceneManager;
}());
exports.SceneManager = SceneManager;
//# sourceMappingURL=SceneManager.js.map