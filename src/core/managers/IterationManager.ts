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

export class IterationManager {
    private gameLoopAccumulator: number = 0;
    private physicsLoopAccumulator: number = 0;

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

    public update(time: number): void {
        this.timeManager.update(time);

        this.gameLoopAccumulator += this.timeManager.browserDeltaTime;

        this.load();

        if (this.gameLoopAccumulator >= this.timeManager.minGameDeltatime) {
            this.mainIteration();

            // physics fixed at the game frame rate
            if (this.timeManager.gameFramerate === this.timeManager.physicsFramerate) {
                this.physicsIteration();
            }

            this.gameLoopAccumulator -= this.timeManager.minGameDeltatime;
        }

        // physics fixed at its own frame rate
        if (this.timeManager.gameFramerate !== this.timeManager.physicsFramerate) {
            this.physicsLoopAccumulator += this.timeManager.browserDeltaTime;

            while (this.physicsLoopAccumulator >= this.timeManager.minPhysicsDeltaTime) {
                this.physicsLoopAccumulator -= this.timeManager.minPhysicsDeltaTime;

                if (this.timeManager.timeScale > 0) this.physicsIteration();
            }
        }

        this.preRenderIteration();
        this.renderIteration();

        this.sceneManager.update();
    }

    private load(): void {
        this.currentScene = this.sceneManager.getCurrentScene();
        this.gameObjects = this.gameObjectManager.getGameObjects().filter((gameObject) => gameObject.active);
        this.components = this.gameObjects.reduce(
            (components, gameObject) => [
                ...components,
                ...gameObject.getComponents().filter((component) => component.active),
            ],
            []
        );
    }

    private mainIteration(): void {
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
    }

    private physicsIteration(): void {
        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);

        this.collisionManager.update();
        this.physicsManager.update(this.timeManager.physicsDeltaTime);

        this.collisionManager.clear();
    }

    private preRenderIteration(): void {
        this.physicsManager.clear();

        this.dispatchFrameEvent(FrameEvent.UpdateTransform);
        this.dispatchFrameEvent(FrameEvent.UpdatePreRender);
        this.dispatchFrameEvent(FrameEvent.UpdateCamera);
    }

    private renderIteration(): void {
        this.dispatchFrameEvent(FrameEvent.UpdateRender);

        this.renderManager.clearCanvas();
        this.renderManager.render();
    }

    private dispatchFrameEvent(event: FrameEvent): void {
        if (event === FrameEvent.Start || event === FrameEvent.Update) {
            this.currentScene.dispatch(event);
            this.gameObjects.forEach((gameObject) => gameObject.dispatch(event));
        }

        this.components.forEach((component) => component.dispatch(event));
    }
}
