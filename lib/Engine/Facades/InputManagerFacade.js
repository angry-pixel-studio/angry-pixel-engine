"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManagerFacade = void 0;
var Game_1 = require("../Game");
var InputManagerFacade = /** @class */ (function () {
    function InputManagerFacade() {
    }
    InputManagerFacade.initialize = function () {
        this.inputManager = Game_1.container.getSingleton("InputManager");
    };
    Object.defineProperty(InputManagerFacade, "mouse", {
        get: function () {
            return this.inputManager.mouse;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputManagerFacade, "keyboard", {
        get: function () {
            return this.inputManager.keyboard;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputManagerFacade, "gamepad", {
        get: function () {
            return this.inputManager.gamepad;
        },
        enumerable: false,
        configurable: true
    });
    InputManagerFacade.inputManager = null;
    return InputManagerFacade;
}());
exports.InputManagerFacade = InputManagerFacade;
//# sourceMappingURL=InputManagerFacade.js.map