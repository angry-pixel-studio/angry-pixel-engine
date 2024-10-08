import { inject, injectable } from "@ioc";
import { TYPES } from "@config/types";
import { GameConfig } from "@config/bootstrap";

const minGameFramerate = 30;
const defaultGameFramerate = 60;
const allowedPhysicsFramerates = [60, 120, 180, 240];

export const defaultPhysicsFramerate = 180;

/**
 * Manages the properties associated with time.
 * @public
 * @category Managers
 * @example
 * ```js
 * // using deltaTime to increment a timer
 * this.timer += this.timeManager.deltaTime;
 *
 * // using physicsDeltaTime within a physics component to move the object it belongs to
 * this.transform.position.x += speed * this.timeManager.physicsDeltaTime;
 *
 * // stop all time-related interactions by setting the scale to zero
 * this.timeManager.timeScale = 0;
 * ```
 */
@injectable(TYPES.TimeManager)
export class TimeManager {
    /** @internal */
    public readonly fixedGameFramerate: number;
    /** @internal */
    public readonly fixedGameDeltaTime: number;
    /** @internal */
    public readonly fixedPhysicsFramerate: number;
    /** @internal */
    public readonly fixedPhysicsDeltaTime: number;

    /**
     * The scale on which time passes. The default value is 1.\
     * For example, if set to 2, the time will run at twice the speed.\
     * If set to 0.5, it will run at half the speed.\
     * If set to 0, everything associated with the time will stop.
     */
    public timeScale: number = 1;
    /** The time difference, in seconds, between the last frame of and the current frame recorded by the browser. */
    public browserDeltaTime: number = 0;
    /** The time difference, in seconds, between the last frame and the current frame, unaffected by the scale. */
    public unscaledDeltaTime: number = 0;
    /** The time difference, in seconds, between the last physics frame and the current one, unaffected by the scale. */
    public unscaledPhysicsDeltaTime: number = 0;

    private maxDeltaTime: number = 1 / minGameFramerate;
    private thenForGame: number = 0;
    private thenForPhysics: number = 0;
    private thenForRender: number = 0;

    /** The time difference, in seconds, between the last frame and the current frame. */
    public get deltaTime(): number {
        return this.unscaledDeltaTime * this.timeScale;
    }

    /** The time difference, in seconds, between the last physics frame and the current one. */
    public get physicsDeltaTime(): number {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }

    /** The browser delta time affected by time scale. */
    public get renderDeltaTime(): number {
        return this.browserDeltaTime * this.timeScale;
    }

    constructor(@inject(TYPES.GameConfig) { physicsFramerate }: GameConfig) {
        if (physicsFramerate && !allowedPhysicsFramerates.includes(physicsFramerate)) {
            throw new Error(`Invalid Physics frame rate. Allowed: [${allowedPhysicsFramerates.join(", ")}]`);
        }

        this.fixedGameFramerate = defaultGameFramerate;
        this.fixedGameDeltaTime = parseFloat((1 / this.fixedGameFramerate).toFixed(6));

        this.fixedPhysicsFramerate = physicsFramerate ?? defaultPhysicsFramerate;
        this.fixedPhysicsDeltaTime = parseFloat((1 / this.fixedPhysicsFramerate).toFixed(6));
    }

    /** @internal */
    public updateForRender(time: number): void {
        this.browserDeltaTime = Math.min(Math.max(0, time - this.thenForRender), this.maxDeltaTime);
        this.thenForRender = time;
    }

    /** @internal */
    public updateForGame(time: number): void {
        this.unscaledDeltaTime = Math.min(
            Math.max(this.fixedGameDeltaTime, time - this.thenForGame),
            this.maxDeltaTime,
        );
        this.thenForGame = time;
    }

    /** @internal */
    public updateForPhysics(time: number): void {
        this.unscaledPhysicsDeltaTime = Math.min(Math.max(0, time - this.thenForPhysics), this.maxDeltaTime);
        this.thenForPhysics = time;
    }
}
