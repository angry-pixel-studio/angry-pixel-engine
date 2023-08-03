import { Exception } from "../../utils/Exception";

export const MIN_GAME_FRAMERATE = 30;
export const DEFAULT_GAME_FRAMERATE = 60;
export const DEFAULT_PHYSICS_FRAMERATE = 180;

const allowedPhysicsFramerates = [60, 120, 180, 240];

export interface ITimeManager {
    minGameDeltatime: number;
    minPhysicsDeltaTime: number;
    gameFramerate: number;
    physicsFramerate: number;
    timeScale: number;
    browserDeltaTime: number;
    gameDeltaTime: number;
    unscaledGameDeltaTime: number;
    unscaledPhysicsDeltaTime: number;
    updateForGame(time: number): void;
    updateForBrowser(time: number): void;
    updateForPhysics(time: number): void;
    deltaTime: number;
    physicsDeltaTime: number;
}

export class TimeManager implements ITimeManager {
    public readonly minGameDeltatime: number = 0;
    public readonly minPhysicsDeltaTime: number = 0;

    public readonly gameFramerate: number = DEFAULT_GAME_FRAMERATE;
    public readonly physicsFramerate: number = DEFAULT_PHYSICS_FRAMERATE;

    public timeScale: number = 1;
    public browserDeltaTime: number = 0;
    public gameDeltaTime: number = 0;
    public unscaledGameDeltaTime: number = 0;
    public unscaledPhysicsDeltaTime: number = 0;

    private readonly maxDeltaTime: number = 1 / MIN_GAME_FRAMERATE;
    private thenForGame: number = 0;
    private thenForPhysics: number = 0;
    private thenForBrowser: number = 0;

    constructor(physicsFramerate: number) {
        if (!allowedPhysicsFramerates.includes(physicsFramerate)) {
            throw new Exception(`Invalid Physics frame rate. Allowed: [${allowedPhysicsFramerates.join(", ")}]`);
        }

        this.physicsFramerate = physicsFramerate;
        this.minGameDeltatime = parseFloat((1 / this.gameFramerate).toFixed(6));
        this.minPhysicsDeltaTime = parseFloat((1 / this.physicsFramerate).toFixed(6));
    }

    public updateForGame(time: number): void {
        this.unscaledGameDeltaTime = Math.min(
            Math.max(this.minGameDeltatime, time - this.thenForGame),
            this.maxDeltaTime
        );

        this.thenForGame = time;
    }

    public updateForBrowser(time: number): void {
        this.browserDeltaTime = Math.min(Math.max(0, time - this.thenForBrowser), this.maxDeltaTime);

        this.thenForBrowser = time;
    }

    public updateForPhysics(time: number): void {
        this.unscaledPhysicsDeltaTime = Math.min(Math.max(0, time - this.thenForPhysics), this.maxDeltaTime);

        this.thenForPhysics = time;
    }

    public get deltaTime(): number {
        return this.unscaledGameDeltaTime * this.timeScale;
    }

    public get physicsDeltaTime(): number {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }
}
