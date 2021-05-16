import { MiniEngineException } from "../Exception/MiniEngineException";
import { TimeManager } from "../Time/TimeManager";

export const MIN_FRAMERATE = 60;
export const DEFAULT_FRAMERATE = 240;
const DYNAMIC_ITERATIONS = 2;

export class PhysicsIterationManager {
    public readonly physicsFramerate: number;
    private readonly unscaledPhysicsDeltaTime: number;
    private readonly timeManager: TimeManager;

    private _physicsDeltaTime: number = 0;
    private _deltaTimeAccumulator: number = 0;

    constructor(timeManager: TimeManager, physicsFramerate: number = null) {
        if (physicsFramerate !== null && physicsFramerate < MIN_FRAMERATE) {
            throw new MiniEngineException(`physicsFrameRate cannot be less than ${MIN_FRAMERATE}`);
        }

        this.timeManager = timeManager;
        this.physicsFramerate = physicsFramerate;
        this.unscaledPhysicsDeltaTime = physicsFramerate ? parseFloat((1 / this.physicsFramerate).toFixed(6)) : null;
    }

    public get physicsDeltaTime(): number {
        return this._physicsDeltaTime;
    }

    public update(callback: () => void): void {
        if (this.timeManager.timeScale === 0) {
            return;
        }

        this.physicsFramerate !== null ? this.updateFixed(callback) : this.updateDynamic(callback);
    }

    private updateFixed(callback: () => void): void {
        this._physicsDeltaTime = this.unscaledPhysicsDeltaTime * this.timeManager.timeScale;
        this._deltaTimeAccumulator += this.timeManager.unscaledDeltaTime;

        while (this._deltaTimeAccumulator >= this.unscaledPhysicsDeltaTime) {
            callback();
            this._deltaTimeAccumulator -= this.unscaledPhysicsDeltaTime;
        }
    }

    private updateDynamic(callback: () => void): void {
        this._physicsDeltaTime = this.timeManager.deltaTime / DYNAMIC_ITERATIONS;

        for (let i = 0; i < DYNAMIC_ITERATIONS; i++) {
            callback();
        }
    }
}
