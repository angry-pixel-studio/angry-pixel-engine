"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
var FRAME_RATE = 24;
var Animation = /** @class */ (function () {
    function Animation(_a) {
        var sprites = _a.sprites, _b = _a.speed, speed = _b === void 0 ? 1 : _b, _c = _a.loop, loop = _c === void 0 ? false : _c;
        this.sprites = [];
        this.speed = 1;
        this.loop = false;
        this.sprites = sprites;
        this.speed = speed;
        this.loop = loop;
    }
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map