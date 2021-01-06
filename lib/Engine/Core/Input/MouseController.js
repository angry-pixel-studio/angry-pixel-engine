"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseController = void 0;
var Game_1 = require("../../Game");
var Vector2_1 = require("../../Math/Vector2");
var MouseController = /** @class */ (function () {
    function MouseController(gameNode, gameCanvas) {
        this.leftButtonPressed = false;
        this.scrollButonPressed = false;
        this.rightButtonPressed = false;
        this.viewportPosition = new Vector2_1.Vector2(0, 0);
        this.lastViewportPosition = new Vector2_1.Vector2(0, 0);
        this._hasMoved = false;
        this.gameNode = gameNode;
        this.gameCanvas = gameCanvas;
        this.setup();
    }
    Object.defineProperty(MouseController.prototype, "hasMoved", {
        get: function () {
            return this._hasMoved;
        },
        enumerable: false,
        configurable: true
    });
    MouseController.prototype.setup = function () {
        var _this = this;
        this.gameNode.addEventListener("mousemove", function (e) { return _this.updatePosition(e); });
        this.gameNode.addEventListener("mousedown", function (e) { return _this.updateButtonDown(e); });
        this.gameNode.addEventListener("mouseup", function (e) { return _this.updateButtonUp(e); });
        window.addEventListener(Game_1.EVENT_UPDATE, function () { return _this.update(); });
    };
    MouseController.prototype.updateButtonDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.leftButtonPressed = event.button === 0;
        this.scrollButonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    };
    MouseController.prototype.updateButtonUp = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButonPressed = event.button === 1 ? false : this.scrollButonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    };
    MouseController.prototype.updatePosition = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.viewportPosition.set(event.offsetX / (this.gameCanvas.clientWidth / this.gameCanvas.width), event.offsetY / (this.gameCanvas.clientHeight / this.gameCanvas.height));
    };
    MouseController.prototype.update = function () {
        if (this.viewportPosition.x !== this.lastViewportPosition.x ||
            this.viewportPosition.y !== this.lastViewportPosition.y) {
            this._hasMoved = true;
            this.lastViewportPosition.set(this.viewportPosition.x, this.viewportPosition.y);
        }
        else {
            this._hasMoved = false;
        }
    };
    return MouseController;
}());
exports.MouseController = MouseController;
//# sourceMappingURL=MouseController.js.map