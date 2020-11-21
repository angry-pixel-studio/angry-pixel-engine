"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
var Animation = /** @class */ (function () {
    function Animation(config) {
        var _a, _b;
        this.sprites = [];
        this.speed = 1;
        this.loop = false;
        this.sprites = config.sprites;
        this.speed = (_a = config.speed) !== null && _a !== void 0 ? _a : this.speed;
        this.loop = (_b = config.loop) !== null && _b !== void 0 ? _b : this.loop;
    }
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map