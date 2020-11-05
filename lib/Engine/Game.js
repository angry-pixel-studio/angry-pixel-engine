"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.container = exports.UICanvas = exports.gameCanvas = exports.gameNode = exports.EVENT_UPDATE_RENDER = exports.EVENT_UPDATE_PHYSICS = exports.EVENT_UPDATE = void 0;
var Config_1 = require("./Core/DependencyInjection/Config");
var Container_1 = require("./Core/DependencyInjection/Container");
var GAME_NODE_ID = "miniEngineGame";
var GAME_CANVAS_ID = "miniEngineGameCanvas";
var UI_CANVAS_ID = "miniEngineUICanvas";
exports.EVENT_UPDATE = "mini-engine-update";
exports.EVENT_UPDATE_PHYSICS = "mini-engine-update-physics";
exports.EVENT_UPDATE_RENDER = "mini-engine-update-renders";
exports.gameNode = document.createElement("div");
exports.gameCanvas = document.createElement("canvas");
exports.UICanvas = document.createElement("canvas");
exports.container = new Container_1.Container();
var Game = /** @class */ (function () {
    function Game(gameContainer, gameWidth, gameHeight, UIEnabled) {
        if (UIEnabled === void 0) { UIEnabled = true; }
        this.canvasBGColor = "#000000";
        this.UIEnabled = true;
        this._running = false;
        this.frameRequestId = null;
        this.gameContainer = gameContainer;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.UIEnabled = UIEnabled;
        this.setupHTMLDom();
        this.setupManagers();
    }
    Game.prototype.setupHTMLDom = function () {
        exports.gameNode.id = GAME_NODE_ID;
        exports.gameNode.style.position = "relative";
        exports.gameNode.style.width = this.gameWidth + "px";
        exports.gameNode.style.height = this.gameHeight + "px";
        exports.gameNode.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        this.gameContainer.appendChild(exports.gameNode);
        exports.gameCanvas.id = GAME_CANVAS_ID;
        exports.gameCanvas.width = Math.floor(this.gameWidth);
        exports.gameCanvas.height = Math.floor(this.gameHeight);
        exports.gameCanvas.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        if (this.UIEnabled) {
            exports.UICanvas.id = UI_CANVAS_ID;
            exports.UICanvas.style.position = "absolute";
            exports.UICanvas.style.zIndex = "10";
            exports.UICanvas.width = Math.floor(this.gameWidth);
            exports.UICanvas.height = Math.floor(this.gameHeight);
            exports.UICanvas.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
            exports.gameNode.appendChild(exports.UICanvas);
        }
        exports.gameNode.appendChild(exports.gameCanvas);
    };
    Game.prototype.setupManagers = function () {
        Config_1.loadDependencies(exports.container, this, exports.gameNode, exports.gameCanvas, exports.UICanvas);
        this.renderManager = exports.container.getSingleton("RenderManager");
        this.sceneManager = exports.container.getSingleton("SceneManager");
        this.collisionManager = exports.container.getSingleton("CollisionManager");
        this.timeManager = exports.container.getSingleton("TimeManager");
    };
    Object.defineProperty(Game.prototype, "running", {
        get: function () {
            return this._running;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.addScene = function (name, sceneFunction, openingScene) {
        if (openingScene === void 0) { openingScene = false; }
        this.sceneManager.addScene(name, sceneFunction, openingScene);
    };
    Game.prototype.run = function () {
        this.sceneManager.loadOpeningScene();
        this.timeManager.start();
        this.requestAnimationFrame();
    };
    Game.prototype.stop = function () {
        var _this = this;
        this.stopLoop();
        setTimeout(function () {
            _this.sceneManager.unloadCurrentScene();
            _this.renderManager.clearCanvas(_this.canvasBGColor);
        }, 100);
    };
    Game.prototype.gameLoop = function (time) {
        this._running = true;
        this.timeManager.update(time);
        this.collisionManager.prepare();
        this.dispatchFrameEvent(exports.EVENT_UPDATE);
        this.dispatchFrameEvent(exports.EVENT_UPDATE_PHYSICS);
        this.dispatchFrameEvent(exports.EVENT_UPDATE_RENDER);
        this.renderManager.clearCanvas(this.canvasBGColor);
        this.renderManager.render();
        this.requestAnimationFrame();
    };
    Game.prototype.stopLoop = function () {
        window.cancelAnimationFrame(this.frameRequestId);
        this._running = false;
        this.frameRequestId = null;
    };
    Game.prototype.resumeLoop = function () {
        if (this._running == false && this.frameRequestId === null) {
            this.requestAnimationFrame();
        }
    };
    Game.prototype.requestAnimationFrame = function () {
        var _this = this;
        this.frameRequestId = window.requestAnimationFrame(function (time) { return _this.gameLoop(time); });
    };
    Game.prototype.dispatchFrameEvent = function (event) {
        window.dispatchEvent(new CustomEvent(event));
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map