"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardController = void 0;
var KeyboardController = /** @class */ (function () {
    function KeyboardController() {
        var _this = this;
        this.keyPresses = {};
        window.addEventListener("keydown", function (e) { return (_this.keyPresses[e.key] = true); });
        window.addEventListener("keyup", function (e) { return (_this.keyPresses[e.key] = false); });
    }
    KeyboardController.prototype.isPressed = function (key) {
        return this.keyPresses[key] !== undefined && this.keyPresses[key] !== false;
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=KeyboardController.js.map