"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManagerFacade = void 0;
var Game_1 = require("../Game");
var TimeManagerFacade = /** @class */ (function () {
    function TimeManagerFacade() {
    }
    TimeManagerFacade.initialize = function () {
        this.timeManager = Game_1.container.getSingleton("TimeManager");
    };
    Object.defineProperty(TimeManagerFacade, "deltaTime", {
        get: function () {
            return this.timeManager.deltaTime;
        },
        enumerable: false,
        configurable: true
    });
    TimeManagerFacade.timeManager = null;
    return TimeManagerFacade;
}());
exports.TimeManagerFacade = TimeManagerFacade;
//# sourceMappingURL=TimeManagerFacade.js.map