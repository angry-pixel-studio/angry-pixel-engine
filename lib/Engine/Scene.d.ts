import { GameCamera } from "./GameObjects/GameCamera";
import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { GameObjectFactory } from "./Core/GameObject/GameObjectManager";
export declare const GAME_CAMERA_ID = "GameCamera";
export declare class Scene {
    game: Game;
    name: string;
    private gameObjectManager;
    private firstFrame;
    constructor();
    private gameLoopEventHandler;
    protected start(): void;
    protected update(): void;
    get gameCamera(): GameCamera;
    addGameObject(gameObjectFactory: GameObjectFactory, name: string): this;
    getRootGameObjects(): GameObject[];
    findGameObjectByName<T extends GameObject>(name: string): T | null;
    findGameObjectsByTag(tag: string): GameObject[];
    findGameObjectByTag<T extends GameObject>(tag: string): T | null;
    destroyAllGameObjects(): void;
    destroyGameObjectByName(name: string): void;
    destroyGameObject(gameObject: GameObject): void;
    /**
     * @description NOTE: do not use this method. Use SceneManager.unloadCurrentScene instead.
     */
    destroy(): void;
}
