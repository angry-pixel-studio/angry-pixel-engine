import { GameObjectManager, GameObjectFactory } from "../Core/GameObject/GameObjectManager";
import { container } from "../Game";
import { GameObject } from "../GameObject";

export class GameObjectManagerFacade {
    private static manager: GameObjectManager;

    public static initialize(): void {
        this.manager = container.getSingleton<GameObjectManager>("GameObjectManager");
    }

    public static addGameObject(
        gameObjectFactory: GameObjectFactory,
        name: string,
        parent: GameObject | null = null
    ): GameObject {
        return this.manager.addGameObject(gameObjectFactory, name, parent);
    }

    public static getGameObjects(): GameObject[] {
        return this.manager.getGameObjects();
    }

    public static findGameObjectByName<T extends GameObject>(name: string): T | null {
        return this.manager.findGameObjectByName(name) as T;
    }

    public static findGameObjectsByParent(parent: GameObject): GameObject[] {
        return this.manager.findGameObjectsByParent(parent);
    }

    public static findGameObjectByParentAndName<T extends GameObject>(parent: GameObject, name: string): T | null {
        return this.manager.findGameObjectByParentAndName(parent, name) as T;
    }

    public static findGameObjectsByTag(tag: string): GameObject[] {
        return this.manager.findGameObjectsByTag(tag);
    }

    public static findGameObjectByTag<T extends GameObject>(tag: string): T | null {
        return this.manager.findGameObjectByTag(tag) as T;
    }

    public static destroyAllGameObjects(): void {
        this.manager.destroyAllGameObjects();
    }

    public static destroyGameObject(gameObject: GameObject): void {
        this.manager.destroyGameObject(gameObject);
    }

    public static destroyGameObjectByName(name: string): void {
        this.destroyGameObject(this.findGameObjectByName(name));
    }
}
