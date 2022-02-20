import { Exception } from "../../utils/Exception";

export const MIN_BROWSER_FRAMERATE = 15;
export const DEFAULT_GAME_FRAMERATE = 60;
export const MIN_PHYSICS_FRAMERATE = 60;
export const DEFAULT_PHYSICS_FRAMERATE = 240;

export class TimeManager {
    public readonly minGameDeltatime: number = 0;
    public readonly minPhysicsDeltaTime: number = 0;

    public readonly gameFramerate: number = DEFAULT_GAME_FRAMERATE;
    public readonly physicsFramerate: number = DEFAULT_PHYSICS_FRAMERATE;

    public timeScale: number = 1;
    public browserDeltaTime: number = 0;
    public unscaledGameDeltaTime: number = 0;
    public unscaledPhysicsDeltaTime: number = 0;

    private readonly max: number = 1 / MIN_BROWSER_FRAMERATE;
    private then: number = 0;

    constructor(physicsFramerate: number) {
        if (physicsFramerate < MIN_PHYSICS_FRAMERATE) {
            throw new Exception(`Physics framerate cannot be less than ${MIN_PHYSICS_FRAMERATE}`);
        }

        if (physicsFramerate % MIN_PHYSICS_FRAMERATE !== 0) {
            throw new Exception(`Physics framerate must be multiple of ${MIN_PHYSICS_FRAMERATE}`);
        }

        this.physicsFramerate = physicsFramerate;
        this.minGameDeltatime = parseFloat((1 / this.gameFramerate).toFixed(6));
        this.minPhysicsDeltaTime = parseFloat((1 / this.physicsFramerate).toFixed(6));
    }

    public update(time: number): void {
        const now: number = time * 0.001;

        this.browserDeltaTime = Math.min(Math.max(0, now - this.then), this.max);
        this.unscaledGameDeltaTime = Math.max(this.minGameDeltatime, this.browserDeltaTime);

        this.unscaledPhysicsDeltaTime =
            this.gameFramerate === this.physicsFramerate ? this.unscaledGameDeltaTime : this.minPhysicsDeltaTime;

        this.then = now;
    }

    public get deltaTime(): number {
        return this.unscaledGameDeltaTime * this.timeScale;
    }

    public get physicsDeltaTime(): number {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }
}
