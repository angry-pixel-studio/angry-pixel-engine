import { GameObject, GameObjectClass } from "../GameObject";
import { FrameEvent } from "./IterationManager";
import { InitOptions } from "../GameActor";
import { Container } from "../../utils/Container";

export interface IGameObjectManager {
    addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions,
        parent?: GameObject,
        name?: string
    ): T;
    findGameObjects<T extends GameObject>(gameObjectClass?: GameObjectClass<T>): T[];
    findGameObjectById<T extends GameObject>(id: number): T;
    findGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    findGameObject<T extends GameObject>(name: string): T;
    findGameObject<T extends GameObject>(filter: GameObjectClass<T> | string): T;
    findGameObjectsByParent<T extends GameObject>(parent: GameObject): T[];
    findGameObjectByParent<T extends GameObject>(parent: GameObject, gameObjectClass: GameObjectClass<T>): T;
    findGameObjectByParent<T extends GameObject>(parent: GameObject, name: string): T;
    findGameObjectByParent<T extends GameObject>(parent: GameObject, filter: GameObjectClass<T> | string): T;
    findGameObjectsByTag<T extends GameObject>(tag: string): T[];
    destroyAllGameObjects(ignoreKeep?: boolean): void;
    destroyGameObject(gameObject: GameObject): void;
}

export class GameObjectManager implements IGameObjectManager {
    private gameObjects: GameObject[] = [];

    constructor(private readonly container: Container) {}

    public addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions,
        parent?: GameObject,
        name?: string
    ): T {
        const gameObject = new gameObjectClass(this.container, this.gameObjects.length + 1, name, parent);
        this.gameObjects.push(gameObject);

        gameObject.dispatch(FrameEvent.Init, options);

        return gameObject;
    }

    public findGameObjects<T extends GameObject>(gameObjectClass?: GameObjectClass<T>): T[] {
        return (
            gameObjectClass
                ? this.gameObjects.filter((gameObject) => gameObject instanceof gameObjectClass)
                : [...this.gameObjects]
        ) as T[];
    }

    public findGameObjectById<T extends GameObject>(id: number): T {
        return this.gameObjects.find((gameObject) => gameObject.id === id) as T;
    }

    public findGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    public findGameObject<T extends GameObject>(name: string): T;
    public findGameObject<T extends GameObject>(filter: GameObjectClass<T> | string): T {
        return (
            typeof filter === "string"
                ? this.gameObjects.find((gameObject) => gameObject.name === filter)
                : this.gameObjects.find((gameObject) => gameObject instanceof filter)
        ) as T;
    }

    public findGameObjectsByParent<T extends GameObject>(parent: GameObject): T[] {
        return this.gameObjects.filter((gameObject) => gameObject.parent === parent) as T[];
    }

    public findGameObjectByParent<T extends GameObject>(parent: GameObject, gameObjectClass: GameObjectClass<T>): T;
    public findGameObjectByParent<T extends GameObject>(parent: GameObject, name: string): T;
    public findGameObjectByParent<T extends GameObject>(parent: GameObject, filter: GameObjectClass<T> | string): T {
        return (
            typeof filter === "string"
                ? this.gameObjects.find((gameObject) => gameObject.name === filter && gameObject.parent === parent)
                : this.gameObjects.find((gameObject) => gameObject instanceof filter && gameObject.parent === parent)
        ) as T;
    }

    public findGameObjectsByTag<T extends GameObject>(tag: string): T[] {
        return this.gameObjects.filter((gameObject) => gameObject.tag === tag) as T[];
    }

    public destroyAllGameObjects(ignoreKeep: boolean = false): void {
        this.gameObjects
            .filter((gameObject) => ignoreKeep || !gameObject.keep)
            .forEach((gameObject) => this.destroy(gameObject, false));
    }

    public destroyGameObject(gameObject: GameObject): void {
        this.destroy(gameObject, true);
    }

    private destroy(gameObject: GameObject, destroyChildren: boolean): void {
        const index: number = this.gameObjects.indexOf(gameObject);

        if (index !== -1) {
            const gameObject = this.gameObjects.splice(index, 1)[0];
            if (destroyChildren) this.destroyChildren(gameObject);
            gameObject.dispatch(FrameEvent.Destroy);
        }
    }

    private destroyChildren(parent: GameObject): void {
        this.findGameObjectsByParent(parent).forEach((gameObject) => this.destroyGameObject(gameObject));
    }
}
