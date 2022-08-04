import { GameObjectManager } from "../managers/GameObjectManager";
import { GameObject, GameObjectClass } from "../GameObject";
import { InitOptions } from "../GameActor";

export class GameObjectManagerFacade {
    private static manager: GameObjectManager;

    public static initialize(manager: GameObjectManager): void {
        this.manager = manager;
    }

    /**
     * Adds a new game object to the scene.
     * @param gameObjectClass The class of the game object
     * @param options [optional] This options will be passed to the init method
     * @param parent [optional] The parent game object
     * @param name [optional] The name of the game object
     * @returns the added game object
     */
    public static addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions,
        parent?: GameObject,
        name?: string
    ): T {
        return this.manager.addGameObject<T>(gameObjectClass, options, parent, name);
    }

    /**
     * Returns all the game objects in the scene.
     * @returns The found game objects
     */
    public static findGameObjects(): GameObject[] {
        return this.manager.findGameObjects();
    }

    /**
     * Returns the first game object found for the given class, or undefined otherwise.
     * @param gameObjectClass The game object class to find
     * @returns The found game object
     */
    public static findGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    /**
     * Returns the first game object found for the given name, or undefined otherwise.
     * @param name The name of the game object to find
     * @returns The found game object
     */
    public static findGameObject<T extends GameObject>(name: string): T;
    public static findGameObject<T extends GameObject>(filter: GameObjectClass<T> | string): T {
        return typeof filter === "string"
            ? this.manager.findGameObject<T>(filter as string)
            : this.manager.findGameObject<T>(filter as GameObjectClass<T>);
    }

    /**
     * Returns a collection of game objects found for the given parent
     * @param parent The parent game object
     * @returns The found game objects
     */
    public static findGameObjectsByParent<T extends GameObject>(parent: GameObject): T[] {
        return this.manager.findGameObjectsByParent<T>(parent);
    }

    /**
     * Returns the first child found for the given parent and class, or undefined otherwise.
     * @param parent The parent game object
     * @param gameObjectClass The class of the child game object to find
     * @returns The found child game object
     */
    public static findGameObjectByParent<T extends GameObject>(
        parent: GameObject,
        gameObjectClass: GameObjectClass<T>
    ): T;
    /**
     * Returns the first child found for the given parent and name, or undefined otherwise.
     * @param parent The parent game object
     * @param name The name of the child game object to find
     * @returns The found child game object
     */
    public static findGameObjectByParent<T extends GameObject>(parent: GameObject, name: string): T;
    public static findGameObjectByParent<T extends GameObject>(
        parent: GameObject,
        filter: GameObjectClass<T> | string
    ): T {
        return typeof filter === "string"
            ? this.manager.findGameObjectByParent(parent, filter as string)
            : this.manager.findGameObjectByParent(parent, filter as GameObjectClass<T>);
    }

    /**
     * Returns a collection of game objects found for the given tag
     * @param tag The tag of the game objects to find
     * @returns The found game objects
     */
    public static findGameObjectsByTag<T extends GameObject>(tag: string): T[] {
        return this.manager.findGameObjectsByTag<T>(tag);
    }

    /**
     * Destroy the game objects
     * @param gameObject The game object to destory
     */
    public static destroyGameObject(gameObject: GameObject): void {
        this.manager.destroyGameObject(gameObject);
    }
}
