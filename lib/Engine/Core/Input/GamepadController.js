"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamepadController = void 0;
var Game_1 = require("../../Game");
var GamepadController = /** @class */ (function () {
    function GamepadController() {
        var _this = this;
        this.gamepads = [];
        this.eventHandler = function (e) {
            if (e.type === "gamepadconnected") {
                _this.gamepadConnected(e.gamepad);
            }
            else if (e.type === "gamepaddisconnected") {
                _this.gamepadDisconected(e.gamepad);
            }
        };
        // @ts-ignore
        window.addEventListener("gamepadconnected", this.eventHandler);
        // @ts-ignore
        window.addEventListener("gamepaddisconnected", this.eventHandler);
        window.addEventListener(Game_1.EVENT_UPDATE, function () { return _this.update(); });
        for (var i = 0; i < navigator.getGamepads().length; i++) {
            this.gamepads[i] = new GamepadData();
        }
    }
    GamepadController.prototype.getGamepad = function (index) {
        var _a;
        return (_a = this.gamepads[index]) !== null && _a !== void 0 ? _a : null;
    };
    GamepadController.prototype.gamepadConnected = function (gamepad) {
        this.gamepads[gamepad.index].updateFromGamepad(gamepad);
    };
    GamepadController.prototype.gamepadDisconected = function (gamepad) {
        this.gamepads[gamepad.index].updateFromGamepad(gamepad);
    };
    GamepadController.prototype.update = function () {
        for (var _i = 0, _a = navigator.getGamepads(); _i < _a.length; _i++) {
            var gamepad = _a[_i];
            if (gamepad === null) {
                continue;
            }
            this.gamepads[gamepad.index].updateFromGamepad(gamepad);
        }
    };
    return GamepadController;
}());
exports.GamepadController = GamepadController;
var GamepadData = /** @class */ (function () {
    function GamepadData() {
        this._connected = false;
        this._id = null;
        this.buttons = new Map();
        this.axes = new Map();
    }
    GamepadData.prototype.updateFromGamepad = function (gamepad) {
        var _this = this;
        this._id = gamepad.id;
        this._connected = gamepad.connected;
        gamepad.buttons.forEach(function (button, index) { return _this.buttons.set(index, button.pressed); });
        gamepad.axes.forEach(function (axis, index) { return _this.axes.set(index, axis); });
    };
    GamepadData.prototype.getButtonPressed = function (index) {
        return this.buttons.get(index);
    };
    GamepadData.prototype.getAxis = function (index) {
        return this.axes.get(index);
    };
    Object.defineProperty(GamepadData.prototype, "connected", {
        get: function () {
            return this._connected;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "dpadUp", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(12)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "dpadDown", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(13)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "dpadLeft", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(14)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "dpadRight", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(15)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "bottomFace", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(0)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "rightFace", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(1)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "leftFace", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(2)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "topFace", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(3)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "leftShoulder", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(4)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "rightShoulder", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(5)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "leftTrigger", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(6)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "rightTrigger", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(7)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "start", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(8)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "back", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(9)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "leftStickButton", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(10)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "rightStickButton", {
        get: function () {
            var _a;
            return (_a = this.buttons.get(11)) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "leftStickHorizontal", {
        get: function () {
            var _a;
            return (_a = this.axes.get(0)) !== null && _a !== void 0 ? _a : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "leftStickVertical", {
        get: function () {
            var _a;
            return (_a = this.axes.get(1)) !== null && _a !== void 0 ? _a : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "rightStickHorizontal", {
        get: function () {
            var _a;
            return (_a = this.axes.get(2)) !== null && _a !== void 0 ? _a : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamepadData.prototype, "rightStickVertical", {
        get: function () {
            var _a;
            return (_a = this.axes.get(3)) !== null && _a !== void 0 ? _a : 0;
        },
        enumerable: false,
        configurable: true
    });
    return GamepadData;
}());
//# sourceMappingURL=GamepadController.js.map