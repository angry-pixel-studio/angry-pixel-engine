import { Exception } from "../../utils/Exception";

export const MIN_GAME_FRAMERATE = 30;
export const DEFAULT_GAME_FRAMERATE = 60;
export const DEFAULT_PHYSICS_FRAMERATE = 180;

const allowedPhysicsFramerates = [60, 120, 180, 240];

/**
 * Manages the properties associated with time.
 * @public
 */
export interface ITimeManager {
    /** @private */
    minGameDeltatime: number;
    /** @private */
    minPhysicsDeltaTime: number;
    /** @private */
    gameFramerate: number;
    /** @private */
    physicsFramerate: number;
    /** The time difference, in seconds, between the last frame and the current frame. */
    deltaTime: number;
    /** The time difference, in seconds, between the last physics frame and the current one. */
    physicsDeltaTime: number;
    /**
     * The scale on which time passes. The default value is 1.
     * For example, if set to 2, the time will run at twice the speed.
     * If set to 0.5, it will run at half the speed.\
     * If set to 0, everything associated with the time will stop.
     */
    timeScale: number;
    /** The time difference, in seconds, between the last frame and the current frame, unaffected by the scale. */
    unscaledDeltaTime: number;
    /** The time difference, in seconds, between the last physics frame and the current one, unaffected by the scale. */
    unscaledPhysicsDeltaTime: number;
    /** The time difference, in seconds, between the last frame of and the current frame recorded by the browser. */
    browserDeltaTime: number;
    /** @private */
    updateForGame(time: number): void;
    /** @private */
    updateForBrowser(time: number): void;
    /** @private */
    updateForPhysics(time: number): void;
}

/** @private */
export class TimeManager implements ITimeManager {
    public readonly minGameDeltatime: number = 0;
    public readonly minPhysicsDeltaTime: number = 0;
    public readonly gameFramerate: number = DEFAULT_GAME_FRAMERATE;
    public readonly physicsFramerate: number = DEFAULT_PHYSICS_FRAMERATE;

    public timeScale: number = 1;
    public browserDeltaTime: number = 0;
    public unscaledDeltaTime: number = 0;
    public unscaledPhysicsDeltaTime: number = 0;

    private readonly maxDeltaTime: number = 1 / MIN_GAME_FRAMERATE;
    private thenForGame: number = 0;
    private thenForPhysics: number = 0;
    private thenForBrowser: number = 0;

    public get deltaTime(): number {
        return this.unscaledDeltaTime * this.timeScale;
    }

    public get physicsDeltaTime(): number {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }

    constructor(physicsFramerate: number) {
        if (!allowedPhysicsFramerates.includes(physicsFramerate)) {
            throw new Exception(`Invalid Physics frame rate. Allowed: [${allowedPhysicsFramerates.join(", ")}]`);
        }

        this.physicsFramerate = physicsFramerate;
        this.minGameDeltatime = parseFloat((1 / this.gameFramerate).toFixed(6));
        this.minPhysicsDeltaTime = parseFloat((1 / this.physicsFramerate).toFixed(6));
    }

    public updateForGame(time: number): void {
        this.unscaledDeltaTime = Math.min(Math.max(this.minGameDeltatime, time - this.thenForGame), this.maxDeltaTime);

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
}
