import { IGameObjectManager } from "./GameObjectManager";
import { ISceneManager } from "./SceneManager";
import { ITimeManager } from "./TimeManager";
import { GameObject } from "../GameObject";
import { Component } from "../Component";
import { Scene } from "../Scene";
import { IIterationManager } from "./IterationManager";
import { FrameEvent } from "./IterationManager";
import { IPhysicsManager } from "@angry-pixel/2d-physics";

/** @internal */
export class HeadlessIterationManager implements IIterationManager {
    public running: boolean = false;

    private loadedScene: Scene;
    private gameObjects: GameObject[] = [];
    private components: Component[] = [];
    private gameInterval: NodeJS.Timer | number;
    private physicsInterval: NodeJS.Timer | number;
    private changingScene: boolean = false;

    private readonly sceneEvents: FrameEvent[] = [FrameEvent.Start, FrameEvent.Update, FrameEvent.StopGame];
    private readonly gameObjectEvents: FrameEvent[] = [FrameEvent.Start, FrameEvent.Update];

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
        this.dispatchFrameEvent(FrameEvent.StopGame);
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

        if (this.sceneManager.pendingSceneToload()) {
            this.sceneManager.loadPendingScene();
            this.changingScene = false;
        }

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

        if (this.sceneManager.pendingSceneToload()) {
            this.changingScene = true;
            this.sceneManager.unloadCurrentScene();
        }
    }

    private physicsIteration(): void {
        if (this.timeManager.timeScale <= 0 || this.changingScene) return;

        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);

        this.physicsManager.resolve(this.timeManager.physicsDeltaTime);
    }

    private asyncGameLoop(): void {
        this.gameInterval = setInterval(() => {
            if (!this.running) return clearInterval(this.gameInterval as number);
            this.gameLogicIteration(process.uptime());
        }, 1000 / this.timeManager.gameFramerate);
    }

    private asyncPhysicsLoop(): void {
        this.physicsInterval = setInterval(() => {
            if (!this.running) return clearInterval(this.physicsInterval as number);
            this.timeManager.updateForPhysics(process.uptime());
            this.physicsIteration();
        }, 1000 / this.timeManager.physicsFramerate);
    }

    private load(): void {
        this.loadedScene = this.sceneManager.getLoadedScene();
        this.gameObjects = this.gameObjectManager.findGameObjects().filter((gameObject) => gameObject.active);

        this.components = [];
        this.gameObjects.forEach((gameObject) =>
            gameObject
                .getComponents()
                .filter((component) => component.active)
                .forEach((c) => this.components.push(c))
        );
    }

    private dispatchFrameEvent(event: FrameEvent): void {
        if (this.sceneEvents.includes(event)) {
            this.loadedScene.dispatch(event);
        } else if (this.gameObjectEvents.includes(event)) {
            this.gameObjects
                .filter((gameObject) => gameObject.active)
                .forEach((gameObject) => gameObject.dispatch(event));
        }

        this.components.filter((component) => component.active).forEach((component) => component.dispatch(event));
    }
}
