import { inject, injectable } from "../../ioc/container";
import { TYPES } from "../../config/types";
import { IGameConfig } from "../Game";

const minGameFramerate = 30;
const defaultGameFramerate = 60;
const defaultPhysicsFramerate = 180;
const allowedPhysicsFramerates = [60, 120, 180, 240];

export interface ITimeManager {
    /** @internal */
    fixedGameFramerate: number;
    /** @internal */
    fixedGameDeltaTime: number;
    /** @internal */
    fixedPhysicsFramerate: number;
    /** @internal */
    fixedPhysicsDeltaTime: number;

    /**
     * The scale on which time passes. The default value is 1.\
     * For example, if set to 2, the time will run at twice the speed.\
     * If set to 0.5, it will run at half the speed.\
     * If set to 0, everything associated with the time will stop.
     */
    timeScale: number;
    /** The time difference, in seconds, between the last frame and the current frame. */
    deltaTime: number;
    /** The time difference, in seconds, between the last physics frame and the current one. */
    physicsDeltaTime: number;
    /** The browser delta time affected by time scale. */
    renderDeltaTime: number;
    /** The time difference, in seconds, between the last frame and the current frame, unaffected by the scale. */
    unscaledDeltaTime: number;
    /** The time difference, in seconds, between the last physics frame and the current one, unaffected by the scale. */
    unscaledPhysicsDeltaTime: number;
    /** The time difference, in seconds, between the last frame of and the current frame recorded by the browser. */
    browserDeltaTime: number;
    /** @internal */
    updateForGame(time: number): void;
    /** @internal */
    updateForBrowser(time: number): void;
    /** @internal */
    updateForPhysics(time: number): void;
}

/** @internal */
@injectable(TYPES.TimeManager)
export class TimeManager implements ITimeManager {
    public readonly fixedGameFramerate: number;
    public readonly fixedGameDeltaTime: number;
    public readonly fixedPhysicsFramerate: number;
    public readonly fixedPhysicsDeltaTime: number;

    public timeScale: number = 1;
    public browserDeltaTime: number = 0;
    public unscaledDeltaTime: number = 0;
    public unscaledPhysicsDeltaTime: number = 0;

    private maxDeltaTime: number = 1 / minGameFramerate;
    private thenForGame: number = 0;
    private thenForPhysics: number = 0;
    private thenForBrowser: number = 0;

    public get deltaTime(): number {
        return this.unscaledDeltaTime * this.timeScale;
    }

    public get physicsDeltaTime(): number {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }

    public get renderDeltaTime(): number {
        return this.browserDeltaTime * this.timeScale;
    }

    constructor(@inject(TYPES.GameConfig) { physicsFramerate }: IGameConfig) {
        if (physicsFramerate && !allowedPhysicsFramerates.includes(physicsFramerate)) {
            throw new Error(`Invalid Physics frame rate. Allowed: [${allowedPhysicsFramerates.join(", ")}]`);
        }

        this.fixedGameFramerate = defaultGameFramerate;
        this.fixedGameDeltaTime = parseFloat((1 / this.fixedGameFramerate).toFixed(6));

        this.fixedPhysicsFramerate = physicsFramerate ?? defaultPhysicsFramerate;
        this.fixedPhysicsDeltaTime = parseFloat((1 / this.fixedPhysicsFramerate).toFixed(6));
    }

    public updateForBrowser(time: number): void {
        this.browserDeltaTime = Math.min(Math.max(0, time - this.thenForBrowser), this.maxDeltaTime);
        this.thenForBrowser = time;
    }

    public updateForGame(time: number): void {
        this.unscaledDeltaTime = Math.min(
            Math.max(this.fixedGameDeltaTime, time - this.thenForGame),
            this.maxDeltaTime,
        );
        this.thenForGame = time;
    }

    public updateForPhysics(time: number): void {
        this.unscaledPhysicsDeltaTime = Math.min(Math.max(0, time - this.thenForPhysics), this.maxDeltaTime);
        this.thenForPhysics = time;
    }
}
