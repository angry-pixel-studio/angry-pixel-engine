import { InputManager } from "../../input/InputManager";
import { CollisionManager } from "../../physics/collision/CollisionManager";
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
    private deltaAux: number = 0;

    constructor(
        private readonly timeManager: TimeManager,
        private readonly collisionManager: CollisionManager,
        private readonly renderManager: RenderManager,
        private readonly inputManager: InputManager
    ) {}

    public update(time: number): void {
        this.timeManager.update(time);

        this.deltaAux = Math.min(this.timeManager.browserDeltaTime, this.timeManager.maxGameDeltatime);

        this.gameLoopAccumulator += this.deltaAux;
        this.physicsLoopAccumulator += this.timeManager.browserDeltaTime;

        this.timeManager.unscaledGameDeltaTime = Math.max(
            this.timeManager.maxGameDeltatime,
            this.timeManager.browserDeltaTime
        );

        this.timeManager.unscaledPhysicsDeltaTime = this.timeManager.maxPhysicsDeltaTime;

        if (this.gameLoopAccumulator > this.timeManager.maxGameDeltatime) {
            this.mainIteration();
            this.gameLoopAccumulator -= this.timeManager.maxGameDeltatime;
        }

        while (this.physicsLoopAccumulator > this.timeManager.maxPhysicsDeltaTime) {
            if (this.timeManager.timeScale > 0) this.physicsIteration();
            this.physicsLoopAccumulator -= this.timeManager.maxPhysicsDeltaTime;
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

        // pre-physics updates
        this.dispatchFrameEvent(EVENT_UPDATE_TRANSFORM);
        this.dispatchFrameEvent(EVENT_UPDATE_COLLIDER);
        this.collisionManager.update();
    }

    private physicsIteration(): void {
        this.dispatchFrameEvent(EVENT_UPDATE_PHYSICS);
        this.dispatchFrameEvent(EVENT_UPDATE_COLLIDER);
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
