export default class Scene {
    game = null;
    id = null;
    gameObjects = [];

    constructor(id, game) {
        this.id = id;
        this.game = game;
    }

    addGameObject = gameObject => this.gameObjects = [...this.gameObjects, gameObject];
    addGameObjects = gameObjects => this.gameObjects = [...this.gameObjects, ...gameObjects];
}