"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManagerFacade = void 0;
var Game_1 = require("../Game");
var SceneManagerFacade = /** @class */ (function () {
    function SceneManagerFacade() {
    }
    SceneManagerFacade.initialize = function () {
        this.sceneManager = Game_1.container.getSingleton("SceneManager");
    };
    SceneManagerFacade.loadScene = function (name) {
        this.sceneManager.loadScene(name);
    };
    SceneManagerFacade.getCurrentSceneName = function () {
        return this.sceneManager.currentSceneName;
    };
    SceneManagerFacade.loadOpeningScene = function () {
        this.sceneManager.loadOpeningScene();
    };
    SceneManagerFacade.sceneManager = null;
    return SceneManagerFacade;
}());
exports.SceneManagerFacade = SceneManagerFacade;
//# sourceMappingURL=SceneManagerFacade.js.map