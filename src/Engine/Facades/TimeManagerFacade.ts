import { TimeManager } from "../Core/GameLoop/TimeManager";
import { container } from "../Game";

export class TimeManagerFacade {
    private static timeManager: TimeManager = null;

    public static initialize(): void {
        this.timeManager = container.getSingleton<TimeManager>("TimeManager");
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
}
