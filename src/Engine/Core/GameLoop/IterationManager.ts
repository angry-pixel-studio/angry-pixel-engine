import {
    EVENT_START,
    EVENT_UPDATE,
    EVENT_UPDATE_CAMERA,
    EVENT_UPDATE_COLLIDER,
    EVENT_UPDATE_ENGINE,
    EVENT_UPDATE_PHYSICS,
    EVENT_UPDATE_PRERENDER,
    EVENT_UPDATE_RENDER,
    EVENT_UPDATE_TRANSFORM,
} from "../../Game";
import { CollisionManager } from "../Collision/CollisionManager";
import { RenderManager } from "../Rendering/RenderManager";
import { TimeManager } from "./TimeManager";

export class IterationManager {
    private readonly timeManager: TimeManager;
    private readonly collisionManager: CollisionManager;
    private readonly renderManager: RenderManager;

    private gameLoopAccumulator: number = 0;
    private physicsLoopAccumulator: number = 0;
    private deltaAux: number = 0;

    constructor(timeManager: TimeManager, colissionManager: CollisionManager, renderManager: RenderManager) {
        this.timeManager = timeManager;
        this.collisionManager = colissionManager;
        this.renderManager = renderManager;
    }

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
