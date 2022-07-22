import { TimeManager } from "../managers/TimeManager";

export class TimeManagerFacade {
    private static timeManager: TimeManager = null;

    public static initialize(timeManager: TimeManager): void {
        this.timeManager = timeManager;
    }

    public static get deltaTime(): number {
        return this.timeManager.deltaTime;
    }

    public static getTimeScale(): number {
        return this.timeManager.timeScale;
    }

    public static setTimeScale(scale: number): void {
        this.timeManager.timeScale = scale;
    }

    public static get unscaledDeltaTime(): number {
        return this.timeManager.unscaledGameDeltaTime;
    }

    public static get physicsDeltaTime(): number {
        return this.timeManager.physicsDeltaTime;
    }

    public static get browserDeltaTime(): number {
        return this.timeManager.browserDeltaTime;
    }
}
