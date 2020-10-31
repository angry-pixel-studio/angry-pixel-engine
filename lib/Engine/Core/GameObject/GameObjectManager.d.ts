import { GameObject } from "../../GameObject";
export declare type GameObjectFactory = () => GameObject;
export declare class GameObjectManager {
    private gameObjects;
    addGameObject(gameObjectFactory: GameObjectFactory, name: string, parent?: GameObject | null): GameObject;
    getGameObjects(): GameObject[];
    findGameObjectByUuid(uuid: string): GameObject | null;
    findGameObjectByName(name: string): GameObject | null;
    findGameObjectsByParent(parent: GameObject): GameObject[];
    findGameObjectByParentAndName(parent: GameObject, name: string): GameObject | null;
    findGameObjectsByTag(tag: string): GameObject[];
    findGameObjectByTag(tag: string): GameObject | null;
    destroyAllGameObjects(): void;
    destroyGameObject(gameObject: GameObject): void;
    private _destroyGameObject;
    private destroyChildren;
}
