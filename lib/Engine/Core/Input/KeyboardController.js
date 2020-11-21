"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardController = void 0;
var KeyboardController = /** @class */ (function () {
    function KeyboardController() {
        var _this = this;
        this.keyPresses = new Map();
        this.eventHandler = function (event) {
            if (event.type === "keydown") {
                _this.keyPresses.set(event.code, true);
            }
            if (event.type === "keyup") {
                _this.keyPresses.set(event.code, false);
            }
        };
        window.addEventListener("keydown", this.eventHandler);
        window.addEventListener("keyup", this.eventHandler);
    }
    KeyboardController.prototype.isPressed = function (keyCode) {
        return this.keyPresses.get(keyCode);
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=KeyboardController.js.map