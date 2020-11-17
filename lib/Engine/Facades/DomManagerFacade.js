"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomManagerFacade = void 0;
var Game_1 = require("../Game");
var DomManagerFacade = /** @class */ (function () {
    function DomManagerFacade() {
    }
    DomManagerFacade.initialize = function () {
        this.domManager = Game_1.container.getSingleton("DomManager");
    };
    Object.defineProperty(DomManagerFacade, "gameWidth", {
        get: function () {
            return this.domManager.gameCanvas.clientWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManagerFacade, "gameHeight", {
        get: function () {
            return this.domManager.gameCanvas.clientHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManagerFacade, "gameCanvas", {
        get: function () {
            return this.domManager.gameCanvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManagerFacade, "uiCanvas", {
        get: function () {
            return this.domManager.uiCanvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomManagerFacade, "debugCanvas", {
        get: function () {
            return this.domManager.debugCanvas;
        },
        enumerable: false,
        configurable: true
    });
    DomManagerFacade.domManager = null;
    return DomManagerFacade;
}());
exports.DomManagerFacade = DomManagerFacade;
//# sourceMappingURL=DomManagerFacade.js.map