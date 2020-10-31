"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManager = void 0;
var TimeManager = /** @class */ (function () {
    function TimeManager() {
        this.then = 0;
        this._deltaTime = 0;
    }
    TimeManager.prototype.start = function () {
        this.then = Date.now();
    };
    TimeManager.prototype.update = function (time) {
        var now = time * 0.001;
        this._deltaTime = Math.min(0.1, now - this.then);
        this.then = now;
    };
    Object.defineProperty(TimeManager.prototype, "deltaTime", {
        get: function () {
            return this._deltaTime;
        },
        enumerable: false,
        configurable: true
    });
    return TimeManager;
}());
exports.TimeManager = TimeManager;
//# sourceMappingURL=TimeManager.js.map