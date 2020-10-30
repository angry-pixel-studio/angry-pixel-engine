"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
var FRAME_RATE = 24;
var Animation = /** @class */ (function () {
    function Animation(_a) {
        var sprites = _a.sprites, speed = _a.speed, loop = _a.loop;
        this.sprites = [];
        this._playing = false;
        this.currentFrame = 1;
        this.currentInterval = null;
        this.speed = 1;
        this.loop = false;
        this.currentSprite = null;
        this.sprites = sprites ? sprites : this.sprites;
        this.speed = speed !== undefined ? speed : this.speed;
        this.loop = loop !== undefined ? loop : this.loop;
        this.currentFrame = 1;
        this.currentSprite = null;
    }
    Animation.prototype.play = function () {
        if (this.sprites.length > 0 && this._playing === false) {
            this._playing = true;
            this.currentFrame = 1;
            this.currentSprite = this.sprites[this.currentFrame - 1];
            this.update();
        }
    };
    Animation.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._playing === true && (this.loop || this.sprites.length !== this.currentFrame))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.currentInterval = window.setTimeout(function () {
                                    _this.currentFrame = _this.sprites.length === _this.currentFrame ? 1 : _this.currentFrame + 1;
                                    _this.currentSprite = _this.sprites[_this.currentFrame - 1];
                                    resolve();
                                }, Math.floor(1000 / (FRAME_RATE * _this.speed)));
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2:
                        this._playing = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Animation.prototype.stop = function () {
        this._playing = false;
        clearInterval(this.currentInterval);
    };
    Object.defineProperty(Animation.prototype, "playing", {
        get: function () {
            return this._playing;
        },
        enumerable: false,
        configurable: true
    });
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map