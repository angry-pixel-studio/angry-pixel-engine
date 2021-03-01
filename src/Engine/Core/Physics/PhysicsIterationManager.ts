import { TimeManager } from "../Time/TimeManager";

export const DEFAULT_FRAMERATE = 60;
export const DEFAULT_ITERATIONS = 4;

export class PhysicsIterationManager {
    private timeManager: TimeManager;

    private readonly _physicsFramerate: number;
    private readonly _physicsIterations: number;
    private readonly _physicsDeltaTime: number;

    private _deltaTimeAccumulator: number = 0;

    constructor(timeManager: TimeManager, physicsFramerate: number, physicsIterations: number) {
        this.timeManager = timeManager;

        this._physicsFramerate = physicsFramerate;
        this._physicsIterations = physicsIterations;

        this._physicsDeltaTime = parseFloat((1 / this._physicsFramerate / this._physicsIterations).toFixed(6));
    }

    public get physicsFramerate(): number {
        return this._physicsFramerate;
    }

    public get physicsIterations(): number {
        return this._physicsIterations;
    }

    public get physicsDeltaTime(): number {
        return this._physicsDeltaTime;
    }

    public update(callback: () => void): void {
        this._deltaTimeAccumulator += this.timeManager.deltaTime;

        while (this._deltaTimeAccumulator >= this._physicsDeltaTime) {
            callback();
            this._deltaTimeAccumulator -= this._physicsDeltaTime;
        }
    }
}
