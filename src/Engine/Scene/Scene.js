export default class Scene {
    game = null;
    id = null;
    gameObjects = [];

    constructor(id, game) {
        this.id = id;
        this.game = game;
    }

    addGameObject(gameObject) {
        this.gameObjects = [...this.gameObjects, gameObject];
    }

    addGameObjects(gameObjects) {
        this.gameObjects = [...this.gameObjects, ...gameObjects];
    }

    destroy() {
        Object.keys(this.gameObjects).forEach(key => {
            this.gameObjects[key].destroy();
            this.gameObjects[key] = null;
        });

        Object.keys(this).forEach(key => this[key] = null);
    }
}