import GameCamera from "./GameObjects/GameCamera";
import { EVENT_START, EVENT_UPDATE } from "./Game";

export const GAME_CAMERA_ID = 'GameCamera';

export default class Scene {
    game = null;
    id = null;
    gameObjects = [];

    constructor() {
        this.addGameObject(() => new GameCamera(), GAME_CAMERA_ID);

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

    get gameCamera() {
        return this.getGameObject(GAME_CAMERA_ID);
    }

    addGameObject(gameObjectFunction, id = null) {
        if (typeof gameObjectFunction !== 'function') {
            throw 'Method parameter must be a function.';
        }
        
        const gameObject = gameObjectFunction();
        gameObject.id = id;
        gameObject.scene = this;
        this.gameObjects = [...this.gameObjects, gameObject];

        return this;
    }

    getGameObjects() {
        return this.gameObjects;
    }

    getGameObject(id) {
        return this.gameObjects.reduce(
            (prev, child) => child.id === id
                ? child
                : prev
            , null
        );
    }

    getGameObjectsByTag(tag) {
        return this.gameObjects.filter(object => object.tag === tag);
    }

    getGameObjectByTag(tag) {
        const objects = this.getGameObjectsByTag(tag);
        return objects.length > 0 ? objects[0] : null;
    }

    destroyGameObject(id) {
        this.gameObjects.every((gameObject, index) => {
            if (gameObject.id === id) {
                gameObject._destroy();
                delete this.gameObjects[index];

                return false;
            }
        });
    }

    destroyGameObjects() {
        this.gameObjects.every((gameObject, index) => {
            gameObject._destroy();
            return delete this.gameObjects[index];
        });
    }

    _destroy() {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.destroyGameObjects();

        Object.keys(this).forEach(key => delete this[key]);
    }
}