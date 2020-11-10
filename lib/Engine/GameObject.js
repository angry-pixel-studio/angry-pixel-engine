"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = exports.LAYER_DEFAULT = void 0;
var uuid_1 = require("uuid");
var Transform_1 = require("./Components/Transform");
var Game_1 = require("./Game");
exports.LAYER_DEFAULT = "Default";
var GameObject = /** @class */ (function () {
    function GameObject() {
        var _this = this;
        this._uuid = uuid_1.v4();
        this.name = null;
        this.tag = null;
        this.layer = exports.LAYER_DEFAULT;
        this.ui = false;
        this._active = true;
        this.started = false;
        this._parent = null;
        this.sceneManager = Game_1.container.getSingleton("SceneManager");
        this.gameObjectManager = Game_1.container.getSingleton("GameObjectManager");
        this.components = [];
        this.inactiveComponents = [];
        this.inactiveChildren = [];
        this.gameLoopEventHandler = function (event) {
            if (_this._active === false) {
                return;
            }
            if (_this.started === false && event.type === Game_1.EVENT_START) {
                _this.start();
                _this.started = true;
            }
            else if (_this.started === true && event.type === Game_1.EVENT_UPDATE) {
                _this.update();
            }
        };
        this.addComponent(function () { return new Transform_1.Transform(); });
        window.addEventListener(Game_1.EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
    }
    Object.defineProperty(GameObject.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "transform", {
        get: function () {
            return this.getComponentByType(Transform_1.TYPE_TRANSFORM);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (parent) {
            this._parent = parent;
            this.transform.forceUpdate();
        },
        enumerable: false,
        configurable: true
    });
    GameObject.prototype.getCurrentScene = function () {
        return this.sceneManager.getCurrentScene();
    };
    GameObject.prototype.start = function () {
        return;
    };
    GameObject.prototype.update = function () {
        return;
    };
    GameObject.prototype.findGameObjectByName = function (name) {
        return this.gameObjectManager.findGameObjectByName(name);
    };
    GameObject.prototype.findGameObjectsByTag = function (tag) {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    };
    GameObject.prototype.findGameObjectByTag = function (tag) {
        return this.gameObjectManager.findGameObjectByTag(tag);
    };
    GameObject.prototype.addComponent = function (componentConstructor, name) {
        if (name === void 0) { name = null; }
        var component = componentConstructor();
        this.checkMultipleComponent(component);
        component.name = name;
        component.gameObject = this;
        this.components.push(component);
        return component;
    };
    GameObject.prototype.checkMultipleComponent = function (component) {
        if (component.allowMultiple === false && this.hasComponentOfType(component.type)) {
            throw new Error("GameObject only allows one component of type " + component.type);
        }
    };
    GameObject.prototype.getComponents = function () {
        return this.components;
    };
    GameObject.prototype.getComponentByName = function (name) {
        return this.components.reduce(function (prev, component) { return (component.name === name ? component : prev); }, null);
    };
    GameObject.prototype.getComponentByType = function (type) {
        return this.components.reduce(function (prev, component) { return (component.type === type ? component : prev); }, null);
    };
    GameObject.prototype.getComponentsByType = function (type) {
        return this.components.filter(function (component) { return component.type === type; });
    };
    GameObject.prototype.hasComponentOfName = function (name) {
        return this.getComponentByName(name) !== null;
    };
    GameObject.prototype.hasComponentOfType = function (type) {
        return this.getComponentByType(type) !== null;
    };
    GameObject.prototype.removeComponentByName = function (name) {
        var _this = this;
        this.components.every(function (component, index) {
            if (component.name === name) {
                component.destroy();
                delete _this.components[index];
                return false;
            }
        });
    };
    GameObject.prototype.removeComponentByType = function (type) {
        var _this = this;
        this.components.every(function (component, index) {
            if (component.type === type) {
                component.destroy();
                delete _this.components[index];
                return false;
            }
        });
    };
    GameObject.prototype.removeComponents = function () {
        var _this = this;
        this.components.every(function (component, index) {
            component.destroy();
            return delete _this.components[index];
        });
        this.components = [];
    };
    GameObject.prototype.addChild = function (gameObjectFactory, name) {
        this.gameObjectManager.addGameObject(gameObjectFactory, name, this);
        return this;
    };
    GameObject.prototype.getChildren = function () {
        return this.gameObjectManager.findGameObjectsByParent(this);
    };
    GameObject.prototype.getChild = function (name) {
        return this.gameObjectManager.findGameObjectByParentAndName(this, name);
    };
    GameObject.prototype.destroyChildren = function () {
        var _this = this;
        this.gameObjectManager
            .findGameObjectsByParent(this)
            .forEach(function (gameObject) { return _this.gameObjectManager.destroyGameObject(gameObject); });
    };
    GameObject.prototype.setActive = function (active) {
        var _this = this;
        if (active === false) {
            this.updateInactiveCache();
        }
        this.components
            .filter(function (component) { return _this.inactiveComponents.indexOf(component.uuid) === -1; })
            .forEach(function (component) { return component.setActive(active); });
        this.getChildren()
            .filter(function (gameObject) { return _this.inactiveChildren.indexOf(gameObject.uuid) === -1; })
            .forEach(function (gameObject) { return gameObject.setActive(active); });
        this.transform.forceUpdate();
        this._active = active;
    };
    GameObject.prototype.updateInactiveCache = function () {
        var _this = this;
        this.inactiveComponents = [];
        this.inactiveChildren = [];
        this.components
            .filter(function (component) { return component.active === false; })
            .forEach(function (component) { return _this.inactiveComponents.push(component.uuid); });
        this.getChildren()
            .filter(function (gameObject) { return gameObject.active === false; })
            .forEach(function (gameObject) { return _this.inactiveChildren.push(gameObject.uuid); });
    };
    GameObject.prototype.destroyGameObjectByName = function (name) {
        this.destroyGameObject(this.findGameObjectByName(name));
    };
    GameObject.prototype.destroyGameObject = function (gameObject) {
        this.gameObjectManager.destroyGameObject(gameObject);
    };
    /**
     * @description NOTE: do not use this method. Use GameObject.destroyGameObject or Scene.destroyGameObject instead.
     */
    GameObject.prototype.destroy = function () {
        var _this = this;
        window.removeEventListener(Game_1.EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(Game_1.EVENT_UPDATE, this.gameLoopEventHandler);
        this.removeComponents();
        // @ts-ignore
        Object.keys(this).forEach(function (key) { return delete _this[key]; });
    };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=GameObject.js.map