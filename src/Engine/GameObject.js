import Transform from "./Components/Transform";
import { EVENT_START, EVENT_UPDATE } from "./Game";

export const LAYER_DEFAULT = 'Default';
export const TRANSFORM_ID = 'Transform';

export default class GameObject {
    id = null;
    tag = null;
    layer = LAYER_DEFAULT;
    active = true;
    scene = null;
    parent = null;
    components = [];
    gameObjects = [];
    inactiveComponents = [];
    inactiveGameObjects = [];

    constructor() {
        this.addComponent(() => new Transform(), TRANSFORM_ID);

        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    gameLoopEventHandler = event => {
        if (this.active === false) {
            return;
        }

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
            return delete this.components[index];
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
            return delete this.gameObjects[index];
        });
    }

    /**
     * @param {boolean} value 
     */
    setActive(value) {
        if (typeof value !== 'boolean') {
            throw 'Method parameter must be boolean.'
        }
        
        this.components
            .filter(component => this.inactiveComponents.indexOf(component.id) === -1)
            .forEach(component => component.active = value);

        this.gameObjects
            .filter(gameObject => this.inactiveGameObjects.indexOf(gameObject.id) === -1)
            .forEach(gameObject => gameObject.setActive(value));

        this.active = value;
    }

    /**
     * @param {string} id 
     * @param {boolean} active 
     */
    setComponentActive(id, active) {
        if (typeof active !== 'boolean') {
            throw 'Method parameter "active" must be boolean.'
        }

        const component = this.getComponent(id);
        
        if (component === null) {
            throw `Component ith id ${id} does not exists`;
        }

        const inactiveIndex = this.inactiveComponents.indexOf(id);

        if (active === false && inactiveIndex === -1) {
            this.inactiveComponents.push(id);
        } else if (active === true && inactiveIndex !== -1) {
            delete this.inactiveComponents[inactiveIndex];
        }

        component.active = active;
    }

    /**
     * @param {string} id 
     * @param {boolean} active 
     */
    setChildActive(id, active) {
        if (typeof active !== 'boolean') {
            throw 'Method parameter "active" must be boolean.'
        }

        const gameObject = this.getChild(id);
        
        if (gameObject === null) {
            throw `GameObject with id ${id} does not exists`;
        }

        const inactiveIndex = this.inactiveGameObjects.indexOf(id);

        if (active === false && inactiveIndex === -1) {
            this.inactiveGameObjects.push(id);
        } else if (active === true && inactiveIndex !== -1) {
            delete this.inactiveGameObjects[inactiveIndex];
        }

        gameObject.setActive(active);
    }

    _destroy() {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.removeComponents();
        this.destroyChildren();

        Object.keys(this).forEach(key => delete this[key]);
    }
}
