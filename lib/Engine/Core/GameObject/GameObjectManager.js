"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectManager = void 0;
var GameObjectManager = /** @class */ (function () {
    function GameObjectManager() {
        this.gameObjects = [];
    }
    GameObjectManager.prototype.addGameObject = function (gameObjectFactory, name, parent) {
        if (parent === void 0) { parent = null; }
        if (this.findGameObjectByName(name)) {
            throw new Error("There is already a GameObject with the name " + name);
        }
        var gameObject = gameObjectFactory();
        gameObject.name = name;
        gameObject.parent = parent;
        this.gameObjects.push(gameObject);
        return gameObject;
    };
    GameObjectManager.prototype.getGameObjects = function () {
        return this.gameObjects;
    };
    GameObjectManager.prototype.findGameObjectByUuid = function (uuid) {
        return this.gameObjects.reduce(function (prev, gameObject) { return (gameObject.uuid === uuid ? gameObject : prev); }, null);
    };
    GameObjectManager.prototype.findGameObjectByName = function (name) {
        return this.gameObjects.reduce(function (prev, gameObject) { return (gameObject.name === name ? gameObject : prev); }, null);
    };
    GameObjectManager.prototype.findGameObjectsByParent = function (parent) {
        return this.gameObjects.filter(function (gameObject) { return gameObject.parent === parent; });
    };
    GameObjectManager.prototype.findGameObjectByParentAndName = function (parent, name) {
        return this.gameObjects.reduce(function (prev, gameObject) { return (gameObject.name === name && gameObject.parent === parent ? gameObject : prev); }, null);
    };
    GameObjectManager.prototype.findGameObjectsByTag = function (tag) {
        return this.gameObjects.filter(function (gameObject) { return gameObject.tag === tag; });
    };
    GameObjectManager.prototype.findGameObjectByTag = function (tag) {
        var _a;
        return (_a = this.findGameObjectsByTag(tag)[0]) !== null && _a !== void 0 ? _a : null;
    };
    GameObjectManager.prototype.destroyAllGameObjects = function () {
        var _this = this;
        this.gameObjects.forEach(function (gameObject) { return _this._destroyGameObject(gameObject, false); });
        this.gameObjects = [];
    };
    GameObjectManager.prototype.destroyGameObject = function (gameObject) {
        this._destroyGameObject(gameObject, true);
    };
    GameObjectManager.prototype._destroyGameObject = function (gameObject, destroyChildren) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) {
            destroyChildren ? this.destroyChildren(gameObject) : null;
            gameObject.destroy();
            delete this.gameObjects[index];
        }
    };
    GameObjectManager.prototype.destroyChildren = function (parent) {
        var _this = this;
        this.findGameObjectsByParent(parent).forEach(function (gameObject) {
            _this.destroyChildren(gameObject);
            _this.destroyGameObject(gameObject);
        });
    };
    return GameObjectManager;
}());
exports.GameObjectManager = GameObjectManager;
//# sourceMappingURL=GameObjectManager.js.map