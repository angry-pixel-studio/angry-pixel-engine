"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderComponent = exports.PhysicsComponent = exports.Component = void 0;
var uuid_1 = require("uuid");
var Game_1 = require("./Game");
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this.sceneManager = Game_1.container.getSingleton("SceneManager");
        this.gameObjectManager = Game_1.container.getSingleton("GameObjectManager");
        this.uuid = uuid_1.v4();
        this.allowMultiple = true;
        this.type = null;
        this.name = null;
        this.gameObject = null;
        this._active = true;
        this.firstFrame = true;
        this.gameLoopEventHandler = function () {
            if (_this._active === false) {
                return;
            }
            if (_this.firstFrame === true) {
                _this.start();
                _this.firstFrame = false;
            }
            else {
                _this.update();
            }
        };
        this.createEventListener();
    }
    Component.prototype.createEventListener = function () {
        window.addEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
    };
    Component.prototype.destroyEventListener = function () {
        window.removeEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
    };
    Object.defineProperty(Component.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setActive = function (active) {
        this._active = active;
    };
    Component.prototype.start = function () {
        // do nothing
    };
    Component.prototype.update = function () {
        // do nothing
    };
    Component.prototype.getCurrentScene = function () {
        return this.sceneManager.getCurrentScene();
    };
    Component.prototype.getComponentByName = function (name) {
        return this.gameObject.getComponentByName(name);
    };
    Component.prototype.getComponentByType = function (type) {
        return this.gameObject.getComponentByType(type);
    };
    Component.prototype.getComponentsByType = function (type) {
        return this.gameObject.getComponentsByType(type);
    };
    Component.prototype.findGameObjectByName = function (name) {
        return this.gameObjectManager.findGameObjectByName(name);
    };
    Component.prototype.findGameObjectsByTag = function (tag) {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    };
    Component.prototype.findGameObjectByTag = function (tag) {
        return this.gameObjectManager.findGameObjectByTag(tag);
    };
    Component.prototype.destroyGameObjectByName = function (name) {
        this.destroyGameObject(this.findGameObjectByName(name));
    };
    Component.prototype.destroyGameObject = function (gameObject) {
        this.gameObjectManager.destroyGameObject(gameObject);
    };
    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    Component.prototype.destroy = function () {
        var _this = this;
        this.destroyEventListener();
        // @ts-ignore
        Object.keys(this).forEach(function (key) { return delete _this[key]; });
    };
    return Component;
}());
exports.Component = Component;
var PhysicsComponent = /** @class */ (function (_super) {
    __extends(PhysicsComponent, _super);
    function PhysicsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhysicsComponent.prototype.createEventListener = function () {
        window.addEventListener(Game_1.EVENT_UPDATE_PHYSICS, this.gameLoopEventHandler);
    };
    PhysicsComponent.prototype.destroyEventListener = function () {
        window.removeEventListener(Game_1.EVENT_UPDATE_PHYSICS, this.gameLoopEventHandler);
    };
    return PhysicsComponent;
}(Component));
exports.PhysicsComponent = PhysicsComponent;
var RenderComponent = /** @class */ (function (_super) {
    __extends(RenderComponent, _super);
    function RenderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderComponent.prototype.createEventListener = function () {
        window.addEventListener(Game_1.EVENT_UPDATE_RENDER, this.gameLoopEventHandler);
    };
    RenderComponent.prototype.destroyEventListener = function () {
        window.removeEventListener(Game_1.EVENT_UPDATE_RENDER, this.gameLoopEventHandler);
    };
    return RenderComponent;
}(Component));
exports.RenderComponent = RenderComponent;
//# sourceMappingURL=Component.js.map