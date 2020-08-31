import Transform from "./Components/Transform";
import { EVENT_START, EVENT_UPDATE } from "./Game";

export const LAYER_DEFAULT = 'Default';

export default class GameObject {
    tag = null;
    layer = LAYER_DEFAULT;
        
    scene = null;
    parent = null;

    components = [];
    gameObjects = [];

    constructor() {
        this.addComponent(() => new Transform(this));

        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    gameLoopEventHandler = event => {
        if (event.type === EVENT_START) {
            this.start(event.detail);
        } else if (event.type === EVENT_UPDATE) {
            this.update(event.detail);
        }
    }

    start() { }

    update() { }

    get transform() {
        return this.getComponent(Transform.name);
    }

    addComponent(component) {
        if (typeof component === 'function') {
            component = component();
        }

        this.components = [...this.components, component];

        return this;
    }

    getComponent(type) {
        const components = this.getComponents(type);
        return components.length > 0 ? components[0] : null;
    }

    getComponents(type) {
        if (type !== undefined) {
            return this.components.filter(component => component.constructor.name === type);
        }

        return this.components;
    }

    hasComponent(type) {
        return this.getComponent(type) !== null;
    }

    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            component._destroy();
            delete this.components[index];
        }
    }

    addChild(gameObject) {
        if (typeof gameObject === 'function') {
            gameObject = gameObject();
        }
        
        gameObject.parent = this;
        gameObject.scene = this.scene;
        this.gameObjects = [...this.gameObjects, gameObject];

        return this;
    }

    getChildren(type) {
        if (type !== undefined) {
            return this.gameObjects.filter(object => object.constructor.name === type);
        }

        return this.gameObjects;
    }

    getChild(type) {
        const objects = this.getGameObjects(type);
        return objects.length > 0 ? objects[0] : null;
    }

    getChildrenByTag(tag) {
        return this.gameObjects.filter(object => object.tag === tag);
    }

    getChildtByTag(tag) {
        const objects = this.getGameObjectsByTag(tag);
        return objects.length > 0 ? objects[0] : null;
    }

    destroyChild(gameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) {
            gameObject._destroy();
            delete this.gameObjects[index];
        }
    }

    _destroy() {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.components.forEach(component => this.removeComponent(component));

        this.gameObjects.forEach(gameObject => this.destroyChild(gameObject));

        Object.keys(this).forEach(key => delete this[key]);
    }
}
