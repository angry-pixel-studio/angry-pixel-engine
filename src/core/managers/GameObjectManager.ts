import { GameObject, GameObjectClass } from "../GameObject";
import { FrameEvent } from "./IterationManager";
import { InitOptions } from "../GameActor";
import { Container } from "../../utils/Container";

/**
 * Used to create, retrieve and destroy GameObject instances.
 * @public
 * @category Managers
 * @example
 * ```js
 * // create a new game object instance
 * this.gameObjectManager.addGameObject(Player);
 *
 * // find a game object by its class
 * const player = this.gameObjectManager.findGameObject(Player);
 *
 * // find game objects by their class
 * const coins = this.gameObjectManager.findGameObjects(Coin);
 *
 * // find game objects by their tag
 * const enemies = this.gameObjectManager.findGameObjectsByTag("Enemy");
 *
 * // destroy a game object
 * this.gameObjectManager.destroyGameObject(player);
 * ```
 */
export interface IGameObjectManager {
    /**
     * Instantiates a new game object.
     * @param gameObjectClass The game object class.
     * @param options [optional] Options for the Init method.
     * @param parent [optional] The parent game object.
     * @param name [optional] The name associated to the game object.
     * @returns The game object instance.
     */
    addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions,
        parent?: GameObject,
        name?: string
    ): T;
    /**
     * Returns a collection of found game objects for the given class, or all the game objects if there is no class.
     * @param gameObjectClass [optional] The game object class to find.
     * @returns The found game objects.
     */
    findGameObjects<T extends GameObject>(gameObjectClass?: GameObjectClass<T>): T[];
    /**
     * Returns the first game object found for the given id, or undefined otherwise.
     * @param id The game object id to find.
     * @returns The found game object.
     */
    findGameObjectById<T extends GameObject>(id: number): T;
    /**
     * Returns the first game object found for the given class, or undefined otherwise.
     * @param gameObjectClass The game object class to find.
     * @returns The found game object.
     */
    findGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    /**
     * Returns the first game object found for the given name, or undefined otherwise.
     * @param name The name of the game object to find.
     * @returns The found game object.
     */
    findGameObject<T extends GameObject>(name: string): T;
    findGameObject<T extends GameObject>(filter: GameObjectClass<T> | string): T;
    /**
     * Returns a collection of children game objects for the given parent object.
     * @param parent The parent game object.
     * @returns The found game objects.
     */
    findGameObjectsByParent<T extends GameObject>(parent: GameObject): T[];
    /**
     * Returns the first child game object for the given parent object and filtered by the given game object class.
     * @param parent The parent game object.
     * @param gameObjectClass The game object class to find.
     * @returns The found game object.
     */
    findGameObjectByParent<T extends GameObject>(parent: GameObject, gameObjectClass: GameObjectClass<T>): T;
    /**
     * Returns the first child game object for the given parent object and filtered by the given name.
     * @param parent The parent game object.
     * @param name The name of the game object to find.
     * @returns The found game object.
     */
    findGameObjectByParent<T extends GameObject>(parent: GameObject, name: string): T;
    findGameObjectByParent<T extends GameObject>(parent: GameObject, filter: GameObjectClass<T> | string): T;
    /**
     * Returns a collection of game objects found for the given tag.
     * @param tag The tag of the game objects to find.
     * @returns The found game objects.
     */
    findGameObjectsByTag<T extends GameObject>(tag: string): T[];
    /**
     * Destroy all game objets.
     * @param ignoreKeep [optional] If TRUE, it also destroys objects with the "keep" property set to TRUE.
     */
    destroyAllGameObjects(ignoreKeep?: boolean): void;
    /**
     * Destroy the given game object.
     * @param gameObject The game object to destory.
     */
    destroyGameObject(gameObject: GameObject): void;
}

/** @private */
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
