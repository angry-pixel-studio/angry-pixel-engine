import { IGameObjectManager } from "./GameObjectManager";
import { ISceneManager } from "./SceneManager";
import { ITimeManager } from "./TimeManager";
import { GameObject } from "../GameObject";
import { Component } from "../Component";
import { Scene } from "../Scene";
import { IIterationManager } from "./IterationManager";
import { FrameEvent } from "./IterationManager";

import { IPhysicsManager } from "angry-pixel-2d-physics";

export class HeadlessIterationManager implements IIterationManager {
    public running: boolean = false;

    private currentScene: Scene;
    private gameObjects: GameObject[] = [];
    private components: Component[] = [];

    private gameInterval: NodeJS.Timer;
    private physicsInterval: NodeJS.Timer;

    constructor(
        private readonly timeManager: ITimeManager,
        private readonly physicsManager: IPhysicsManager,
        private readonly gameObjectManager: IGameObjectManager,
        private readonly sceneManager: ISceneManager
    ) {}

    public start(): void {
        this.startLoop(true);
    }

    public pause(): void {
        this.running = false;
    }

    public resume(): void {
        this.startLoop(false);
    }

    public stop(): void {
        this.running = false;
        this.sceneManager.unloadCurrentScene();
        this.physicsManager.clear();
    }

    private startLoop(loadOpeningScene: boolean): void {
        if (this.running) {
            return;
        }

        this.running = true;

        if (loadOpeningScene) {
            this.sceneManager.loadOpeningScene();
        }

        this.asyncGameLoop();

        // physics fixed at its own frame rate
        if (this.timeManager.gameFramerate !== this.timeManager.physicsFramerate) {
            this.asyncPhysicsLoop();
        }
    }

    private gameLogicIteration(time: number): void {
        this.timeManager.updateForGame(time);
        this.load();

        // starts all game objects and components
        this.dispatchFrameEvent(FrameEvent.Start);
        // updates all game objects and custom components
        this.dispatchFrameEvent(FrameEvent.Update);
        // updates engine components
        this.dispatchFrameEvent(FrameEvent.UpdateEngine);
        // updates transform components
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);

        // physics fixed at game frame rate
        if (this.timeManager.gameFramerate === this.timeManager.physicsFramerate) {
            this.timeManager.updateForPhysics(time);
            this.physicsIteration();
        }

        this.sceneManager.update();
    }

    private physicsIteration(): void {
        if (this.timeManager.timeScale <= 0) return;

        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);

        this.physicsManager.resolve(this.timeManager.physicsDeltaTime);
    }

    private asyncGameLoop(): void {
        this.gameInterval = setInterval(() => {
            if (!this.running) return clearInterval(this.gameInterval);
            this.gameLogicIteration(process.uptime());
        }, 1000 / this.timeManager.gameFramerate);
    }

    private asyncPhysicsLoop(): void {
        this.physicsInterval = setInterval(() => {
            if (!this.running) return clearInterval(this.physicsInterval);
            this.timeManager.updateForPhysics(process.uptime());
            this.physicsIteration();
        }, 1000 / this.timeManager.physicsFramerate);
    }

    private load(): void {
        this.currentScene = this.sceneManager.getCurrentScene();
        this.gameObjects = this.gameObjectManager.findGameObjects().filter((gameObject) => gameObject.active);
        this.components = this.gameObjects.reduce(
            (components, gameObject) => [
                ...components,
                ...gameObject.getComponents().filter((component) => component.active),
            ],
            []
        );
    }

    private dispatchFrameEvent(event: FrameEvent): void {
        if (event === FrameEvent.Start || event === FrameEvent.Update) {
            this.currentScene.dispatch(event);
            this.gameObjects
                .filter((gameObject) => gameObject.active)
                .forEach((gameObject) => gameObject.dispatch(event));
        }

        this.components.filter((component) => component.active).forEach((component) => component.dispatch(event));
    }
}
