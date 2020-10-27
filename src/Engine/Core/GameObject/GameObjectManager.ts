import GameObject from "../../GameObject";

export type GameObjectFactory = () => GameObject;

export default class GameObjectManager {
    private gameObjects: GameObject[] = [];

    public addGameObject(
        gameObjectFactory: GameObjectFactory,
        name: string,
        parent: GameObject | null = null
    ): GameObject {
        if (this.findGameObjectByName(name)) {
            throw new Error(`There is already a GameObject with the name ${name}`);
        }

        const gameObject: GameObject = gameObjectFactory();
        gameObject.name = name;
        gameObject.parent = parent;

        this.gameObjects.push(gameObject);

        return gameObject;
    }

    public getGameObjects(): GameObject[] {
        return this.gameObjects;
    }

    public findGameObjectByUuid(uuid: string): GameObject | null {
        return this.gameObjects.reduce((prev, gameObject) => (gameObject.uuid === uuid ? gameObject : prev), null);
    }

    public findGameObjectByName(name: string): GameObject | null {
        return this.gameObjects.reduce((prev, gameObject) => (gameObject.name === name ? gameObject : prev), null);
    }

    public findGameObjectsByParent(parent: GameObject): GameObject[] {
        return this.gameObjects.filter((gameObject) => gameObject.parent === parent);
    }

    public findGameObjectByParentAndName(parent: GameObject, name: string): GameObject | null {
        return this.gameObjects.reduce(
            (prev, gameObject) => (gameObject.name === name && gameObject.parent === parent ? gameObject : prev),
            null
        );
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjects.filter((gameObject) => gameObject.tag === tag);
    }

    public findGameObjectByTag(tag: string): GameObject | null {
        return this.findGameObjectsByTag(tag)[0] ?? null;
    }

    public destroyAllGameObjects(): void {
        this.gameObjects.every((gameObject) => this._destroyGameObject(gameObject, false));
        this.gameObjects = [];
    }

    public destroyGameObject(gameObject: GameObject): void {
        this._destroyGameObject(gameObject, true);
    }

    private _destroyGameObject(gameObject: GameObject, destroyChildren: boolean): void {
        const index: number = this.gameObjects.indexOf(gameObject);

        if (index !== -1) {
            destroyChildren ? this.destroyChildren(gameObject) : null;
            gameObject.destroy();
            delete this.gameObjects[index];
        }
    }

    private destroyChildren(parent: GameObject): void {
        this.findGameObjectsByParent(parent).every((gameObject) => {
            this.destroyChildren(gameObject);
            this.destroyGameObject(gameObject);
        });
    }
}
