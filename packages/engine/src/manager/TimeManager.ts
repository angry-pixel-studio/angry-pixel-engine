import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";
import { GameConfig } from "@config/bootstrap";
import { Component, Entity, EntityManager } from "@angry-pixel/ecs";

const minGameFramerate = 30;
const defaultGameFramerate = 60;
const allowedPhysicsFramerates = [60, 120, 180, 240];

export const defaultPhysicsFramerate = 180;

type Interval = {
    callback: () => void;
    delay: number;
    timer: number;
    times?: number;
    executeImmediately?: boolean;
    entityRef?: Entity;
    componentRef?: Component;
    useTimeScale?: boolean;
};

/**
 * Options for configuring an interval timer.
 * @property {Function} callback - The function to execute at each interval
 * @property {number} delay - The time in milliseconds between each execution
 * @property {number} [times] - Optional number of times to execute before auto-clearing. Omit for infinite execution.
 * @property {boolean} [executeImmediately] - Whether to execute the callback immediately before starting the interval timer
 * @public
 * @category Managers
 * @example
 * ```ts
 * const intervalId = timeManager.setInterval({
 *     callback: () => console.log("Will be called 5 times!"),
 *     delay: 1000,
 *     times: 5,
 * });
 * ```
 */
export type IntervalOptions = {
    /** The function to execute at each interval */
    callback: () => void;
    /** The time in milliseconds between each execution */
    delay: number;
    /** Optional number of times to execute before auto-clearing. Omit for infinite execution. */
    times?: number;
    /** Whether to execute the callback immediately before starting the interval timer */
    executeImmediately?: boolean;
    /** Entity reference to cancel the interval when the entity is disabled or destroyed */
    entityRef?: Entity;
    /** Component reference to cancel the interval when the component is disabled or destroyed */
    componentRef?: Component;
    /** Whether to use the time scale for the interval, default is TRUE */
    useTimeScale?: boolean;
};

/**
 * Manages the properties associated with time.\
 * Provides methods to set intervals, clear intervals, and manage time scaling.\
 * Manages the fixed game framerate and physics framerate.\
 * Manages the fixed game delta time and physics delta time.
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
 *
 * // set an interval that will be cleared after being called 5 times
 * const intervalId = timeManager.setInterval({
 *     callback: () => console.log("Will be called 5 times!"),
 *     delay: 1000,
 *     times: 5,
 * });
 *
 * // set an interval that will be called indefinitely
 * const intervalId = timeManager.setInterval({
 *     callback: () => console.log("Will be called indefinitely!"),
 *     delay: 1000,
 * });
 *
 * // set an interval that will be called immediately and indefinitely
 * const intervalId = timeManager.setInterval({
 *     callback: () => console.log("Will be called immediately and indefinitely!"),
 *     delay: 1000,
 *     executeImmediately: true,
 * });
 *
 * // set an interval that will be cleared when the entity is destroyed
 * const intervalId = timeManager.setInterval({
 *     callback: () => console.log("Will be called indefinitely!"),
 *     delay: 1000,
 *     entityRef: entity,
 * });
 *
 * // set an interval that will be cleared when the component is destroyed
 * const intervalId = timeManager.setInterval({
 *     callback: () => console.log("Will be called indefinitely!"),
 *     delay: 1000,
 *     componentRef: component,
 * });
 *
 * // clear the interval with the given id
 * this.timeManager.clearInterval(intervalId);
 * ```
 */
@injectable(SYMBOLS.TimeManager)
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

    private lastIntervalId: number = 0;
    private intervals: Map<number, Interval> = new Map();

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

    constructor(
        @inject(SYMBOLS.GameConfig) { physicsFramerate }: GameConfig,
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
    ) {
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

    /** @internal */
    public updateIntervals(): void {
        if (this.intervals.size === 0) return;

        for (const [intervalId, interval] of this.intervals) {
            if (!this.intervalHealthCheck(interval)) {
                this.clearInterval(intervalId);
                continue;
            }

            if (interval.executeImmediately) {
                interval.timer = interval.delay;
                interval.executeImmediately = false;
            } else {
                interval.timer += (interval.useTimeScale ? this.deltaTime : this.unscaledDeltaTime) * 1000;
            }

            if (interval.timer >= interval.delay) {
                interval.callback();

                if (interval.times && --interval.times <= 0) this.clearInterval(intervalId);
                else interval.timer -= interval.delay;
            }
        }
    }

    private intervalHealthCheck(interval: Interval): boolean {
        if (interval.entityRef && !this.entityManager.isEntityEnabled(interval.entityRef)) return false;
        if (interval.componentRef && !this.entityManager.isComponentEnabled(interval.componentRef)) return false;
        return true;
    }

    /**
     * Sets a timer which executes a function repeatedly at a fixed time interval.\
     * If `times` is provided, the interval will be cleared after the function has been called that many times.\
     * But if `times` is not provided, the interval will continue until it is cleared.\
     * If `executeImmediately` is set to true, the function will be called immediately after the interval is set.\
     * If `useTimeScale` is set to false, the interval will use the unscaled delta time.\
     * Intervals are cleared when loading a new scene.
     * @param intervalOptions
     * @returns intervalId
     * @example
     * ```ts
     * const intervalId = timeManager.setInterval({
     *     callback: () => console.log("Will be called 5 times!"),
     *     delay: 1000,
     *     times: 5,
     * });
     * ```
     * @example
     * ```ts
     * const intervalId = timeManager.setInterval({
     *     callback: () => console.log("Will be called indefinitely!"),
     *     delay: 1000,
     * });
     * ```
     * @example
     * ```ts
     * const intervalId = timeManager.setInterval({
     *     callback: () => console.log("Will be called immediately and indefinitely!"),
     *     delay: 1000,
     *     executeImmediately: true,
     * });
     * ```
     */
    public setInterval({
        callback,
        delay,
        times,
        executeImmediately,
        entityRef,
        componentRef,
        useTimeScale = true,
    }: IntervalOptions): number {
        const intervalId = ++this.lastIntervalId;
        this.intervals.set(intervalId, {
            callback,
            delay,
            times,
            executeImmediately,
            entityRef,
            componentRef,
            timer: 0,
            useTimeScale,
        });
        return intervalId;
    }

    /**
     * Clears the interval with the given id.
     * @param intervalId
     */
    public clearInterval(intervalId: number): void {
        this.intervals.delete(intervalId);
    }

    /**
     * Clears all intervals.
     */
    public clearAllIntervals(): void {
        this.intervals.clear();
    }
}
