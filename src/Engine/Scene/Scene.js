import GameCamera from "../GameObjects/GameCamera";
import { EVENT_START, EVENT_UPDATE } from "../Game";

export default class Scene {
    game = null;
    id = null;
    gameObjects = [];

    constructor(id, game) {
        this.id = id;
        this.game = game;

        this.addGameObject(() => new GameCamera());

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

    addGameObject(gameObject) {
        if (typeof gameObject === 'function') {
            gameObject = gameObject();
        }
        
        gameObject.scene = this;
        this.gameObjects = [...this.gameObjects, gameObject];

        return this;
    }

    getGameObjects(type) {
        if (type !== undefined) {
            return this.gameObjects.filter(object => object.constructor.name === type);
        }

        return this.gameObjects;
    }

    getGameObject(type) {
        const objects = this.getGameObjects(type);
        return objects.length > 0 ? objects[0] : null;
    }

    getGameObjectsByTag(tag) {
        return this.gameObjects.filter(object => object.tag === tag);
    }

    getGameObjectByTag(tag) {
        const objects = this.getGameObjectsByTag(tag);
        return objects.length > 0 ? objects[0] : null;
    }

    destroy() {
        this.gameObjects.forEach((object, key) => {
            object.destroy();
            this.gameObjects[key] = null;
        });

        Object.keys(this).forEach(key => this[key] = null);

        window.removeEventListener('gameLoop', this.gameLoopEventHandler);
    }
}