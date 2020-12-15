"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
var Vector2_1 = require("../../Math/Vector2");
var Rectangle_1 = require("../../Math/Rectangle");
var QuadTree = /** @class */ (function () {
    function QuadTree(level, bounds) {
        // TODO: maxColliders and maxLevels should be calculated automatically based
        // on the size of the scene and set on the constructor.
        this.maxColliders = 20;
        this.maxLevels = 5;
        // Quads cardinal positions
        this.sw = 0;
        this.se = 1;
        this.nw = 2;
        this.ne = 3;
        this.colliders = [];
        this.quadrants = [];
        this.level = level;
        this.bounds = bounds;
    }
    QuadTree.prototype.insert = function (collider) {
        if (this.hasQuadChildren()) {
            this.insertColliderIntoChildrenQuads(collider);
            return;
        }
        this.colliders.push(collider);
        if (!this.isQuadFull()) {
            return;
        }
        if (this.level < this.maxLevels) {
            this.splitQuad();
        }
    };
    QuadTree.prototype.retrieve = function (collider) {
        var colliders = [];
        if (this.hasQuadChildren()) {
            var quadrants = this.getChildrenQuadrantForCollider(collider);
            for (var _i = 0, quadrants_1 = quadrants; _i < quadrants_1.length; _i++) {
                var quadrant = quadrants_1[_i];
                colliders.push.apply(colliders, quadrant.retrieve(collider));
            }
        }
        colliders.push.apply(colliders, this.colliders);
        var selfIndex = colliders.indexOf(collider);
        if (selfIndex !== -1) {
            colliders.splice(selfIndex, 1);
        }
        return colliders;
    };
    QuadTree.prototype.clear = function () {
        for (var _i = 0, _a = this.quadrants; _i < _a.length; _i++) {
            var quadrant = _a[_i];
            quadrant.clear();
        }
        this.colliders = [];
        this.quadrants = [];
    };
    QuadTree.prototype.splitQuad = function () {
        var _a = this.getQuadrantMidPoint(), midPointX = _a.x, midPointY = _a.y;
        var newLevel = this.level + 1;
        var newWidth = this.bounds.width / 2;
        var newHeight = this.bounds.height / 2;
        this.quadrants = [
            new QuadTree(newLevel, new Rectangle_1.Rectangle(midPointX - newWidth, midPointY - newHeight, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle_1.Rectangle(midPointX, midPointY - newHeight, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle_1.Rectangle(midPointX - newWidth, midPointY, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle_1.Rectangle(midPointX, midPointY, newWidth, newHeight)),
        ];
        for (var _i = 0, _b = this.colliders; _i < _b.length; _i++) {
            var collider = _b[_i];
            this.insertColliderIntoChildrenQuads(collider);
        }
        this.colliders = [];
    };
    QuadTree.prototype.getChildrenQuadrantForCollider = function (collider) {
        if (this.quadrants.length === 0) {
            throw new Error("Current quadrant does not have quadrant children.");
        }
        var _a = this.getQuadrantMidPoint(), midPointX = _a.x, midPointY = _a.y;
        var childrenQuadrants = [];
        if (collider.bottomLeftQuadVertex.x <= midPointX && collider.bottomLeftQuadVertex.y <= midPointY) {
            childrenQuadrants.push(this.quadrants[this.sw]);
        }
        if (collider.bottomRightQuadvertex.x >= midPointX && collider.bottomRightQuadvertex.y <= midPointY) {
            childrenQuadrants.push(this.quadrants[this.se]);
        }
        if (collider.topLeftQuadVertex.x <= midPointX && collider.topLeftQuadVertex.y >= midPointY) {
            childrenQuadrants.push(this.quadrants[this.nw]);
        }
        if (collider.topRightQuadVertex.x >= midPointX && collider.topRightQuadVertex.y >= midPointY) {
            childrenQuadrants.push(this.quadrants[this.ne]);
        }
        if (childrenQuadrants.length === 0) {
            throw new Error("Children does not fit in any children quadrant");
        }
        return childrenQuadrants;
    };
    QuadTree.prototype.insertColliderIntoChildrenQuads = function (collider) {
        var quadrants = this.getChildrenQuadrantForCollider(collider);
        for (var _i = 0, quadrants_2 = quadrants; _i < quadrants_2.length; _i++) {
            var quadrant = quadrants_2[_i];
            quadrant.insert(collider);
        }
    };
    QuadTree.prototype.getQuadrantMidPoint = function () {
        return new Vector2_1.Vector2(this.bounds.width / 2 + this.bounds.x, this.bounds.height / 2 + this.bounds.y);
    };
    QuadTree.prototype.hasQuadChildren = function () {
        return this.quadrants.length > 0;
    };
    QuadTree.prototype.isQuadFull = function () {
        return this.colliders.length > this.maxColliders;
    };
    return QuadTree;
}());
exports.QuadTree = QuadTree;
//# sourceMappingURL=QuadTree.js.map