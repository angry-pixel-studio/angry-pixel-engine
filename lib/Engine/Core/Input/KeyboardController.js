"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardController = void 0;
var KeyboardController = /** @class */ (function () {
    function KeyboardController() {
        var _this = this;
        this.keyPresses = {};
        this.eventHandler = function (event) {
            if (event.type === "keydown") {
                _this.keyPresses[event.key] = true;
            }
            if (event.type === "keyup") {
                _this.keyPresses[event.key] = false;
            }
        };
        window.addEventListener("keydown", this.eventHandler);
        window.addEventListener("keyup", this.eventHandler);
    }
    KeyboardController.prototype.isPressed = function (key) {
        return this.keyPresses[key] !== undefined && this.keyPresses[key] !== false;
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=KeyboardController.js.map