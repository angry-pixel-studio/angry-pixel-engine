"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
var SceneManager = /** @class */ (function () {
    function SceneManager(game, renderManager) {
        this.game = null;
        this.scenes = new Map();
        this.currentScene = null;
        this.openingSceneName = null;
        this.game = game;
        this.renderManager = renderManager;
    }
    SceneManager.prototype.getCurrentScene = function () {
        return this.currentScene;
    };
    SceneManager.prototype.addScene = function (name, sceneConstructor, openingScene) {
        if (openingScene === void 0) { openingScene = false; }
        if (this.scenes.has(name)) {
            throw new Error("There is already a scene with the name '" + name + "'");
        }
        this.scenes.set(name, sceneConstructor);
        if (openingScene === true || this.openingSceneName === null) {
            this.openingSceneName = name;
        }
    };
    SceneManager.prototype.loadOpeningScene = function () {
        if (this.openingSceneName === null) {
            throw new Error("There is no opening scene");
        }
        this.loadScene(this.openingSceneName);
    };
    SceneManager.prototype.loadScene = function (name) {
        if (this.game === null) {
            throw new Error("Game not initialized.");
        }
        if (this.scenes.has(name) === false) {
            throw new Error("Scene with name " + name + " does not exists");
        }
        var resetLoop = this.game.running;
        if (resetLoop) {
            this.game.stopLoop();
        }
        this.unloadCurrentScene();
        this.currentScene = this.scenes.get(name)();
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
            this.renderManager.clear();
        }
    };
    return SceneManager;
}());
exports.SceneManager = SceneManager;
//# sourceMappingURL=SceneManager.js.map