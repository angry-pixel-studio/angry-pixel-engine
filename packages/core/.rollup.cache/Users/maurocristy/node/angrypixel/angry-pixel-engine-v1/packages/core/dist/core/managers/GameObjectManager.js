import { FrameEvent } from "./IterationManager";
/** @internal */
export class GameObjectManager {
    constructor(container) {
        this.container = container;
        this.gameObjects = [];
        this.lastId = 0;
    }
    addGameObject(gameObjectClass, options, parent, name) {
        const gameObject = new gameObjectClass(this.container, ++this.lastId, name, parent);
        this.gameObjects.push(gameObject);
        gameObject.dispatch(FrameEvent.Init, options);
        return gameObject;
    }
    findGameObjects(gameObjectClass) {
        return (gameObjectClass
            ? this.gameObjects.filter((gameObject) => gameObject instanceof gameObjectClass)
            : [...this.gameObjects]);
    }
    findGameObjectById(id) {
        return this.gameObjects.find((gameObject) => gameObject.id === id);
    }
    findGameObject(filter) {
        return (typeof filter === "string"
            ? this.gameObjects.find((gameObject) => gameObject.name === filter)
            : this.gameObjects.find((gameObject) => gameObject instanceof filter));
    }
    findGameObjectsByParent(parent) {
        return this.gameObjects.filter((gameObject) => gameObject.parent === parent);
    }
    findGameObjectByParent(parent, filter) {
        return (typeof filter === "string"
            ? this.gameObjects.find((gameObject) => gameObject.name === filter && gameObject.parent === parent)
            : this.gameObjects.find((gameObject) => gameObject instanceof filter && gameObject.parent === parent));
    }
    findGameObjectsByTag(tag) {
        return this.gameObjects.filter((gameObject) => gameObject.tag === tag);
    }
    destroyAllGameObjects(ignoreKeep = false) {
        this.gameObjects
            .filter((gameObject) => ignoreKeep || !gameObject.keep)
            .forEach((gameObject) => this.destroy(gameObject, false));
    }
    destroyGameObject(gameObject) {
        this.destroy(gameObject, true);
    }
    destroy(gameObject, destroyChildren) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) {
            const gameObject = this.gameObjects.splice(index, 1)[0];
            if (destroyChildren)
                this.destroyChildren(gameObject);
            gameObject.dispatch(FrameEvent.Destroy);
        }
    }
    destroyChildren(parent) {
        this.findGameObjectsByParent(parent).forEach((gameObject) => this.destroyGameObject(gameObject));
    }
}
//# sourceMappingURL=GameObjectManager.js.map