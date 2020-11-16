"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.container = exports.EVENT_UPDATE_RENDER = exports.EVENT_UPDATE_PHYSICS = exports.EVENT_UPDATE = exports.EVENT_START = void 0;
var Config_1 = require("./Core/DependencyInjection/Config");
var Container_1 = require("./Core/DependencyInjection/Container");
exports.EVENT_START = "mini-engine-start";
exports.EVENT_UPDATE = "mini-engine-update";
exports.EVENT_UPDATE_PHYSICS = "mini-engine-update-physics";
exports.EVENT_UPDATE_RENDER = "mini-engine-update-render";
exports.container = new Container_1.Container();
var defaultConfig = {
    containerNode: null,
    gameWidth: 320,
    gameHeight: 180,
    uiEnabled: true,
    debugEnabled: false,
    bgColor: "#000000",
};
var Game = /** @class */ (function () {
    function Game(config) {
        this._running = false;
        this.frameRequestId = null;
        this._config = __assign(__assign({}, defaultConfig), config);
        if (this.config.containerNode === null) {
            throw new Error("Config parameter 'containerNode' cannot be empty.");
        }
        this.setupManagers();
    }
    Game.prototype.setupManagers = function () {
        Config_1.loadDependencies(exports.container, this);
        this.renderManager = exports.container.getSingleton("RenderManager");
        this.sceneManager = exports.container.getSingleton("SceneManager");
        this.collisionManager = exports.container.getSingleton("CollisionManager");
        this.timeManager = exports.container.getSingleton("TimeManager");
    };
    Object.defineProperty(Game.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
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
            _this.renderManager.clearCanvas(_this._config.bgColor);
        }, 100);
    };
    Game.prototype.gameLoop = function (time) {
        this._running = true;
        this.timeManager.update(time);
        this.collisionManager.prepare();
        this.dispatchFrameEvent(exports.EVENT_START);
        this.dispatchFrameEvent(exports.EVENT_UPDATE);
        this.dispatchFrameEvent(exports.EVENT_UPDATE_PHYSICS);
        this.dispatchFrameEvent(exports.EVENT_UPDATE_RENDER);
        this.renderManager.clearCanvas(this._config.bgColor);
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