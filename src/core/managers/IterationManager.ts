import { IGameObjectManager } from "./GameObjectManager";
import { ISceneManager } from "./SceneManager";
import { IInputManager } from "../../input/InputManager";
import { IRenderManager } from "angry-pixel-2d-renderer";
import { ITimeManager } from "./TimeManager";
import { GameObject } from "../GameObject";
import { Component } from "../Component";
import { Scene } from "../Scene";
import { IPhysicsManager } from "angry-pixel-2d-physics";

/** @private */
export enum FrameEvent {
    Init,
    Start,
    Update,
    UpdateEngine,
    UpdateCollider,
    UpdatePhysics,
    UpdateTransform,
    UpdatePreRender,
    UpdateCamera,
    UpdateRender,
    Destroy,
    StopGame,
}

/** @private */
export interface IIterationManager {
    running: boolean;
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
}

/** @private */
export const now = (): number => window.performance.now() * 0.001;

/** @private */
export class IterationManager implements IIterationManager {
    public running: boolean = false;

    private gameLoopAccumulator: number = 0;
    private loadedScene: Scene;
    private gameObjects: GameObject[] = [];
    private components: Component[] = [];
    private physicsIntervalId: number;
    private changingScene: boolean = false;

    private readonly sceneEvents: FrameEvent[] = [FrameEvent.Start, FrameEvent.Update, FrameEvent.StopGame];
    private readonly gameObjectEvents: FrameEvent[] = [FrameEvent.Start, FrameEvent.Update];

    constructor(
        private readonly timeManager: ITimeManager,
        private readonly physicsManager: IPhysicsManager,
        private readonly renderManager: IRenderManager,
        private readonly inputManager: IInputManager,
        private readonly gameObjectManager: IGameObjectManager,
        private readonly sceneManager: ISceneManager,
        private readonly canvasColor: string
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
        this.renderManager.clearScreen(this.canvasColor);
    }

    private startLoop(loadOpeningScene: boolean): void {
        if (this.running) {
            return;
        }

        this.running = true;

        if (loadOpeningScene) {
            this.sceneManager.loadOpeningScene();
        }

        this.requestAnimationLoop(window.performance.now());

        // physics fixed at its own frame rate
        if (this.timeManager.gameFramerate !== this.timeManager.physicsFramerate) {
            this.asyncPhysicsLoop();
        }
    }

    private requestAnimationLoop(time: number): void {
        if (!this.running) return;

        this.timeManager.updateForBrowser(time * 0.001);

        if (this.sceneManager.pendingSceneToload()) {
            this.sceneManager.loadPendingScene();
            this.changingScene = false;
        }

        this.gameLoopAccumulator += this.timeManager.browserDeltaTime;

        if (this.gameLoopAccumulator >= this.timeManager.minGameDeltatime) {
            this.gameLogicIteration(time * 0.001);
            this.gameLoopAccumulator -= this.timeManager.minGameDeltatime;
        }

        this.renderIteration();

        if (this.sceneManager.pendingSceneToload()) {
            this.changingScene = true;
            this.sceneManager.unloadCurrentScene();
        }

        window.requestAnimationFrame((time: number) => this.requestAnimationLoop(time));
    }

    private gameLogicIteration(time: number): void {
        this.timeManager.updateForGame(time);
        this.load();

        // starts all game objects and components
        this.dispatchFrameEvent(FrameEvent.Start);
        // updates input controllers
        this.inputManager.update();
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

        this.dispatchFrameEvent(FrameEvent.UpdatePreRender);
    }

    private renderIteration(): void {
        this.dispatchFrameEvent(FrameEvent.UpdatePreRender);
        this.dispatchFrameEvent(FrameEvent.UpdateCamera);
        this.dispatchFrameEvent(FrameEvent.UpdateRender);

        this.renderManager.clearScreen(this.canvasColor);
        this.renderManager.render();
        this.renderManager.clearData();
    }

    private physicsIteration(): void {
        if (this.timeManager.timeScale <= 0 || this.changingScene) return;

        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);

        this.physicsManager.resolve(this.timeManager.physicsDeltaTime);
    }

    private asyncPhysicsLoop(): void {
        this.physicsIntervalId = window.setInterval(() => {
            if (!this.running) return window.clearInterval(this.physicsIntervalId);
            this.timeManager.updateForPhysics(now());
            if (!document.hidden) this.physicsIteration();
        }, 1000 / this.timeManager.physicsFramerate);
    }

    private load(): void {
        this.loadedScene = this.sceneManager.getLoadedScene();
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
        if (this.sceneEvents.includes(event)) {
            this.loadedScene.dispatch(event);
        }

        if (this.gameObjectEvents.includes(event)) {
            this.gameObjects
                .filter((gameObject) => gameObject.active)
                .forEach((gameObject) => gameObject.dispatch(event));
        }

        this.components.filter((component) => component.active).forEach((component) => component.dispatch(event));
    }
}
