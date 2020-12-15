"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleCollider = void 0;
var Vector2_1 = require("../../../Math/Vector2");
var Rectangle_1 = require("../Shape/Rectangle");
var RectangleCollider = /** @class */ (function () {
    function RectangleCollider(position, width, height, gameObject) {
        this._position = new Vector2_1.Vector2(0, 0);
        this._width = 0;
        this._height = 0;
        this._position.set(position.x, position.y);
        this._quadVertex = [new Vector2_1.Vector2(0, 0), new Vector2_1.Vector2(0, 0), new Vector2_1.Vector2(0, 0), new Vector2_1.Vector2(0, 0)];
        this._width = width;
        this._height = height;
        this.gameObject = gameObject;
        this.shape = new Rectangle_1.Rectangle(this.position.x - this.width / 2, this._position.y - this._height / 2, this.position.x + this.width / 2, this._position.y + this._height / 2);
        this.updateQuadVertex();
    }
    Object.defineProperty(RectangleCollider.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (coordinates) {
            this._position.set(coordinates.x, coordinates.y);
            this.updateQuadVertex();
            this.updateShape();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this._width = width;
            this.updateQuadVertex();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this._height = height;
            this.updateQuadVertex();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "bottomLeftQuadVertex", {
        get: function () {
            return this._quadVertex[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "bottomRightQuadvertex", {
        get: function () {
            return this._quadVertex[3];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "topLeftQuadVertex", {
        get: function () {
            return this._quadVertex[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "topRightQuadVertex", {
        get: function () {
            return this._quadVertex[2];
        },
        enumerable: false,
        configurable: true
    });
    RectangleCollider.prototype.updateShape = function () {
        this.shape.position = this._position;
        this.shape.update();
    };
    // TODO:update using shape vertex
    RectangleCollider.prototype.updateQuadVertex = function () {
        this._quadVertex[0].set(this._position.x - this._width / 2, this._position.y - this._height / 2);
        this._quadVertex[1].set(this._position.x - this._width / 2, this._position.y + this._height / 2);
        this._quadVertex[2].set(this._position.x + this._width / 2, this._position.y + this._height / 2);
        this._quadVertex[3].set(this._position.x + this._width / 2, this._position.y - this._height / 2);
    };
    return RectangleCollider;
}());
exports.RectangleCollider = RectangleCollider;
//# sourceMappingURL=RectangleCollider.js.map