export default class Scene {
    game = null;
    id = null;
    gameObjects = [];

    constructor(id, game) {
        this.id = id;
        this.game = game;

        window.addEventListener('gameLoop', this.gameLoopEventHandler);
    }

    gameLoopEventHandler = event => this.gameLoop(event.detail);

    gameLoop() { }

    addGameObject(gameObject) {
        if (typeof gameObject === 'function') {
            gameObject = gameObject();
        }
        
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
        let objects = this.getGameObjects(type);
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