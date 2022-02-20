import { InputManager } from "../../input/InputManager";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { RigidBodyManager } from "../../physics/rigodBody/RigidBodyManager";
import { RenderManager } from "../../rendering/RenderManager";
import { TimeManager } from "./TimeManager";

export const EVENT_START: string = "angry-pixel-start";
export const EVENT_UPDATE: string = "angry-pixel-update";
export const EVENT_UPDATE_ENGINE: string = "angry-pixel-update-engine";
export const EVENT_UPDATE_COLLIDER: string = "angry-pixel-update-collider";
export const EVENT_UPDATE_PHYSICS: string = "angry-pixel-update-physics";
export const EVENT_UPDATE_TRANSFORM: string = "angry-pixel-update-transform";
export const EVENT_UPDATE_PRERENDER: string = "angry-pixel-update-prerender";
export const EVENT_UPDATE_CAMERA: string = "angry-pixel-update-camera";
export const EVENT_UPDATE_RENDER: string = "angry-pixel-update-render";

export class IterationManager {
    private gameLoopAccumulator: number = 0;
    private physicsLoopAccumulator: number = 0;

    constructor(
        private readonly timeManager: TimeManager,
        private readonly collisionManager: CollisionManager,
        private readonly physicsManager: RigidBodyManager,
        private readonly renderManager: RenderManager,
        private readonly inputManager: InputManager
    ) {}

    public update(time: number): void {
        this.timeManager.update(time);

        this.gameLoopAccumulator += this.timeManager.browserDeltaTime;

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
    }

    private mainIteration(): void {
        // starts all game objects and components
        this.dispatchFrameEvent(EVENT_START);
        // updates input controllers
        this.inputManager.update();
        // updates all game objects and custom components
        this.dispatchFrameEvent(EVENT_UPDATE);
        // updates engine components
        this.dispatchFrameEvent(EVENT_UPDATE_ENGINE);
        // updates transform components
        this.dispatchFrameEvent(EVENT_UPDATE_TRANSFORM);
    }

    private physicsIteration(): void {
        this.dispatchFrameEvent(EVENT_UPDATE_PHYSICS);

        this.dispatchFrameEvent(EVENT_UPDATE_COLLIDER);
        this.collisionManager.update();

        this.physicsManager.update(this.timeManager.physicsDeltaTime);
    }

    private preRenderIteration(): void {
        this.dispatchFrameEvent(EVENT_UPDATE_TRANSFORM);
        this.dispatchFrameEvent(EVENT_UPDATE_PRERENDER);
        this.dispatchFrameEvent(EVENT_UPDATE_CAMERA);
    }

    private renderIteration(): void {
        this.dispatchFrameEvent(EVENT_UPDATE_RENDER);

        this.renderManager.clearCanvas();
        this.renderManager.render();
    }

    private dispatchFrameEvent(event: string): void {
        window.dispatchEvent(new CustomEvent(event));
    }
}
