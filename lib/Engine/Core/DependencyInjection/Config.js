"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDependencies = void 0;
var AssetManager_1 = require("../Asset/AssetManager");
var CollisionManager_1 = require("../Collision/CollisionManager");
var GameObjectManager_1 = require("../GameObject/GameObjectManager");
var GamepadController_1 = require("../Input/GamepadController");
var InputManager_1 = require("../Input/InputManager");
var KeyboardController_1 = require("../Input/KeyboardController");
var MouseController_1 = require("../Input/MouseController");
var Context2DRenderer_1 = require("../Rendering/Context2D/Context2DRenderer");
var RenderManager_1 = require("../Rendering/RenderManager");
var ImageRenderer_1 = require("../Rendering/WebGL/ImageRenderer");
var ProgramFactory_1 = require("../Rendering/WebGL/ProgramFactory");
var ShaderLoader_1 = require("../Rendering/WebGL/ShaderLoader");
var TextureFactory_1 = require("../Rendering/WebGL/TextureFactory");
var WebGLRenderer_1 = require("../Rendering/WebGL/WebGLRenderer");
var SceneManager_1 = require("../Scene/SceneManager");
var TimeManager_1 = require("../Time/TimeManager");
exports.loadDependencies = function (container, game, gameNode, gameCanvas, UICanvas) {
    renderingDependencies(container, gameCanvas, UICanvas);
    inputDependencies(container, gameNode);
    container.add("SceneManager", function () { return new SceneManager_1.SceneManager(game, container.getSingleton("RenderManager")); });
    container.add("CollisionManager", function () { return new CollisionManager_1.CollisionManager(container.getSingleton("RenderManager")); });
    container.add("GameObjectManager", function () { return new GameObjectManager_1.GameObjectManager(); });
    container.add("AssetManager", function () { return new AssetManager_1.AssetManager(); });
    container.add("TimeManager", function () { return new TimeManager_1.TimeManager(); });
};
var renderingDependencies = function (container, gameCanvas, UICanvas) {
    container.add("ShaderLoader", function () { return new ShaderLoader_1.ShaderLoader(); });
    container.add("ProgramFactory", function () { return new ProgramFactory_1.ProgramFactory(container.getSingleton("ShaderLoader")); });
    container.add("TextureFactory", function () { return new TextureFactory_1.TextureFactory(); });
    container.add("WebGLImageRenderer", function () {
        return new ImageRenderer_1.ImageRenderer(gameCanvas, container.getSingleton("ProgramFactory"), container.getSingleton("TextureFactory"));
    });
    container.add("GameRenderer", function () { return new WebGLRenderer_1.WebGLRenderer(gameCanvas, container.getSingleton("WebGLImageRenderer")); });
    container.add("UIRenderer", function () { return new Context2DRenderer_1.Context2DRenderer(UICanvas); });
    container.add("RenderManager", function () {
        return new RenderManager_1.RenderManager(container.getSingleton("GameRenderer"), container.getSingleton("UIRenderer"));
    });
};
var inputDependencies = function (container, gameNode) {
    container.add("Mouse", function () { return new MouseController_1.MouseController(gameNode); });
    container.add("Keyboard", function () { return new KeyboardController_1.KeyboardController(); });
    container.add("Gamepad", function () { return new GamepadController_1.GamepadController(); });
    container.add("InputManager", function () {
        return new InputManager_1.InputManager(container.getSingleton("Mouse"), container.getSingleton("Keyboard"), container.getSingleton("Gamepad"));
    });
};
//# sourceMappingURL=Config.js.map