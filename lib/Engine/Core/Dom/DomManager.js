"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomManager = void 0;
var GAME_NODE_ID = "miniEngineGame";
var GAME_CANVAS_ID = "miniEngineGameCanvas";
var UI_CANVAS_ID = "miniEngineUICanvas";
var DEBUG_CANVAS_ID = "miniEngineDebugCanvas";
var DomManager = /** @class */ (function () {
    function DomManager(containerNode, gameWidth, gameHeight, uiEnabled, debugEnabled) {
        if (uiEnabled === void 0) { uiEnabled = true; }
        if (debugEnabled === void 0) { debugEnabled = false; }
        this._gameNode = null;
        this._gameCanvas = null;
        this._uiCanvas = null;
        this._debugCanvas = null;
        this.containerNode = containerNode;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.uiEnabled = uiEnabled;
        this.debugEnabled = debugEnabled;
        this.setupDom();
    }
    Object.defineProperty(DomManager.prototype, "gameNode", {
        get: function () {
            return this._gameNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManager.prototype, "gameCanvas", {
        get: function () {
            return this._gameCanvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManager.prototype, "uiCanvas", {
        get: function () {
            return this._uiCanvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManager.prototype, "debugCanvas", {
        get: function () {
            return this._debugCanvas;
        },
        enumerable: false,
        configurable: true
    });
    DomManager.prototype.setupDom = function () {
        this.setupGameNode();
        if (this.debugEnabled) {
            this.setupDebugCanvas();
        }
        if (this.uiEnabled) {
            this.setupUiCanvas();
        }
        this.setupGameCanvas();
    };
    DomManager.prototype.setupGameNode = function () {
        this._gameNode = document.createElement("div");
        this._gameNode.id = GAME_NODE_ID;
        this._gameNode.style.position = "relative";
        this._gameNode.style.width = this.gameWidth + "px";
        this._gameNode.style.height = this.gameHeight + "px";
        this._gameNode.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        this.containerNode.appendChild(this._gameNode);
    };
    DomManager.prototype.setupGameCanvas = function () {
        this._gameCanvas = document.createElement("canvas");
        this._gameCanvas.id = GAME_CANVAS_ID;
        this._gameCanvas.width = Math.floor(this.gameWidth);
        this._gameCanvas.height = Math.floor(this.gameHeight);
        this._gameCanvas.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        this._gameNode.appendChild(this._gameCanvas);
    };
    DomManager.prototype.setupUiCanvas = function () {
        this._uiCanvas = document.createElement("canvas");
        this._uiCanvas.id = UI_CANVAS_ID;
        this._uiCanvas.style.position = "absolute";
        this._uiCanvas.style.zIndex = "10";
        this._uiCanvas.width = Math.floor(this.gameWidth);
        this._uiCanvas.height = Math.floor(this.gameHeight);
        this._uiCanvas.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        this._gameNode.appendChild(this._uiCanvas);
    };
    DomManager.prototype.setupDebugCanvas = function () {
        this._debugCanvas = document.createElement("canvas");
        this._debugCanvas.id = DEBUG_CANVAS_ID;
        this._debugCanvas.style.position = "absolute";
        this._debugCanvas.style.zIndex = "5";
        this._debugCanvas.width = Math.floor(this.gameWidth);
        this._debugCanvas.height = Math.floor(this.gameHeight);
        this._debugCanvas.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        this._gameNode.appendChild(this._debugCanvas);
    };
    return DomManager;
}());
exports.DomManager = DomManager;
//# sourceMappingURL=DomManager.js.map