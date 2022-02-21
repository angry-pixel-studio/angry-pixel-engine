import { GameObject } from "../GameObject";
import { Exception } from "../../utils/Exception";
import { FrameEvent } from "./IterationManager";

export type GameObjectFactory = () => GameObject;

export class GameObjectManager {
    private gameObjects: GameObject[] = [];

    public addGameObject<T extends GameObject>(
        gameObjectFactory: GameObjectFactory,
        name: string,
        parent: GameObject = null
    ): T {
        const found = this.findGameObjectByName(name);
        if (found && found.keep === false) {
            throw new Exception(`There is already a GameObject with the name ${name}`);
        }
        if (found && found.keep) {
            return found as T;
        }

        const gameObject: GameObject = gameObjectFactory();
        this.gameObjects.push(gameObject);

        gameObject.name = name;
        gameObject.parent = parent;
        gameObject.dispatch(FrameEvent.Init);

        return gameObject as T;
    }

    public getGameObjects(): GameObject[] {
        return this.gameObjects;
    }

    public findGameObjectById(id: string): GameObject {
        return this.gameObjects.reduce((prev, gameObject) => (gameObject.id === id ? gameObject : prev), null);
    }

    public findGameObjectByName(name: string): GameObject {
        return this.gameObjects.reduce((prev, gameObject) => (gameObject.name === name ? gameObject : prev), null);
    }

    public findGameObjectsByParent(parent: GameObject): GameObject[] {
        return this.gameObjects.filter((gameObject) => gameObject.parent === parent);
    }

    public findGameObjectByParentAndName(parent: GameObject, name: string): GameObject {
        return this.gameObjects.reduce(
            (prev, gameObject) => (gameObject.name === name && gameObject.parent === parent ? gameObject : prev),
            null
        );
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjects.filter((gameObject) => gameObject.tag === tag);
    }

    public findGameObjectByTag(tag: string): GameObject {
        return this.findGameObjectsByTag(tag)[0] ?? null;
    }

    public destroyAllGameObjects(): void {
        this.gameObjects
            .filter((gameObject) => !gameObject.keep)
            .forEach((gameObject) => this.destroy(gameObject, false));
    }

    public destroyGameObject(gameObject: GameObject): void {
        this.destroy(gameObject, true);
    }

    private destroy(gameObject: GameObject, destroyChildren: boolean): void {
        const index: number = this.gameObjects.indexOf(gameObject);

        if (index !== -1) {
            const gameObject = this.gameObjects.splice(index, 1)[0];
            destroyChildren ? this.destroyChildren(gameObject) : null;
            gameObject.dispatch(FrameEvent.Destroy);
        }
    }

    private destroyChildren(parent: GameObject): void {
        this.findGameObjectsByParent(parent).forEach((gameObject) => {
            this.destroyChildren(gameObject);
            this.destroyGameObject(gameObject);
        });
    }
}
