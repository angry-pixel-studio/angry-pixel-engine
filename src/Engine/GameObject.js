import Transform from "./Components/Transform";
import { EVENT_START, EVENT_UPDATE } from "./Game";

export const LAYER_DEFAULT = 'Default';
export const TRANSFORM_ID = 'Transform';

export default class GameObject {
    id = null;
    tag = null;
    layer = LAYER_DEFAULT;
        
    scene = null;
    parent = null;

    components = [];
    gameObjects = [];

    constructor() {
        this.addComponent(() => new Transform(), TRANSFORM_ID);

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
        return this.getComponent(TRANSFORM_ID);
    }

    addComponent(componentFunction, id = null) {
        if (typeof componentFunction !== 'function') {
            throw 'Method parameter must be a function.';
        }

        const component = componentFunction();
        component.id = id;
        component.gameObject = this;
        this.components = [...this.components, component];

        return this;
    }

    getComponents() {
        return this.components;
    }

    getComponent(id) {
        return this.components.reduce(
            (prev, component) => component.id === id
                ? component
                : prev
            , null
        );
    }

    hasComponent(id) {
        return this.getComponent(id) !== null;
    }

    removeComponent(id) {
        this.components.every((component, index) => {
            if (component.id === id) {
                component._destroy();
                delete this.components[index];

                return false;
            }
        });
    }

    removeComponents() {
        this.components.every((component, index) => {
            component._destroy();
            delete this.components[index];
        });
    }

    addChild(gameObjectFunction, id = null) {
        if (typeof gameObjectFunction !== 'function') {
            throw 'Method parameter must be a function.';
        }
        
        const gameObject = gameObjectFunction();
        gameObject.id = id;
        gameObject.parent = this;
        gameObject.scene = this.scene;
        this.gameObjects = [...this.gameObjects, gameObject];

        return this;
    }

    getChildren() {
        return this.gameObjects;
    }

    getChild(id) {
        return this.gameObjects.reduce(
            (prev, child) => child.id === id
                ? child
                : prev
            , null
        );
    }

    getChildrenByTag(tag) {
        return this.gameObjects.filter(object => object.tag === tag);
    }

    getChildByTag(tag) {
        const objects = this.getGameObjectsByTag(tag);
        return objects.length > 0 ? objects[0] : null;
    }

    destroyChild(id) {
        this.gameObjects.every((gameObject, index) => {
            if (gameObject.id === id) {
                gameObject._destroy();
                delete this.gameObjects[index];

                return false;
            }
        });
    }

    destroyChildren() {
        this.gameObjects.every((gameObject, index) => {
            gameObject._destroy();
            delete this.gameObjects[index];
        });
    }

    _destroy() {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.removeComponents();
        this.destroyChildren();

        Object.keys(this).forEach(key => delete this[key]);
    }
}
