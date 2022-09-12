import { GameObjectManager } from "./GameObjectManager";
import { SceneManager } from "./SceneManager";
import { InputManager } from "../../input/InputManager";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { RigidBodyManager } from "../../physics/rigodBody/RigidBodyManager";
import { RenderManager } from "../../rendering/RenderManager";
import { TimeManager } from "./TimeManager";
import { GameObject } from "../GameObject";
import { Component } from "../Component";
import { Scene } from "../Scene";

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
}

export interface IIterationManager {
    running: boolean;
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
}

export class IterationManager implements IIterationManager {
    public running: boolean = false;

    private gameLoopAccumulator: number = 0;
    private currentScene: Scene;
    private gameObjects: GameObject[] = [];
    private components: Component[] = [];

    constructor(
        private readonly timeManager: TimeManager,
        private readonly collisionManager: CollisionManager,
        private readonly physicsManager: RigidBodyManager,
        private readonly renderManager: RenderManager,
        private readonly inputManager: InputManager,
        private readonly gameObjectManager: GameObjectManager,
        private readonly sceneManager: SceneManager
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
        this.renderManager.clearCanvas();
    }

    private startLoop(loadOpeningScene: boolean): void {
        if (this.running) {
            return;
        }

        this.running = true;

        if (loadOpeningScene) {
            this.sceneManager.loadOpeningScene();
        }

        // this.gameLogicIteration();
        this.requestAnimationLoop(window.performance.now());

        // physics fixed at its own frame rate
        if (this.timeManager.gameFramerate !== this.timeManager.physicsFramerate) {
            this.asyncPhysicsLoop();
        }
    }

    private requestAnimationLoop(time: number): void {
        if (!this.running) return;

        this.timeManager.updateForBrowser(time * 0.001);

        this.gameLoopAccumulator += this.timeManager.browserDeltaTime;

        if (this.gameLoopAccumulator >= this.timeManager.minGameDeltatime) {
            this.gameLogicIteration(time * 0.001);
            this.gameLoopAccumulator -= this.timeManager.minGameDeltatime;
        }

        this.renderIteration();

        window.requestAnimationFrame((time: number) => this.requestAnimationLoop(time));
    }

    private gameLogicIteration(time: number): void {
        this.timeManager.updateForGame(time);
        this.load();

        this.physicsManager.clear();
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
            this.physicsIteration(time);
        }

        this.sceneManager.update();
    }

    private renderIteration(): void {
        this.dispatchFrameEvent(FrameEvent.UpdatePreRender);
        this.dispatchFrameEvent(FrameEvent.UpdateCamera);
        this.dispatchFrameEvent(FrameEvent.UpdateRender);

        this.renderManager.clearCanvas();
        this.renderManager.render();
    }

    private physicsIteration(time: number): void {
        if (this.timeManager.timeScale <= 0) return;

        this.timeManager.updateForPhysics(time);

        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);

        this.collisionManager.update();
        this.physicsManager.update(this.timeManager.physicsDeltaTime);

        this.collisionManager.clear();
    }

    private asyncPhysicsLoop(): void {
        if (!this.running) return;

        const time: number = window.performance.now() * 0.001;

        if (!document.hidden) this.physicsIteration(time);

        const timeDiff = 1 / this.timeManager.physicsFramerate - (window.performance.now() * 0.001 - time);
        window.setTimeout(() => this.asyncPhysicsLoop(), Math.max(0.0001, timeDiff) * 1000);
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
