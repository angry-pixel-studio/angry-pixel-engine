import { GameEngineException } from "../Exception/GameEngineException";

export const MIN_GAME_FRAMERATE = 15;
export const DEFAULT_GAME_FRAMERATE = 60;
export const MIN_PHYSICS_FRAMERATE = 60;
export const DEFAULT_PHYSICS_FRAMERATE = 240;

export class TimeManager {
    public readonly maxGameDeltatime: number = 0;
    public readonly maxPhysicsDeltaTime: number = 0;

    public timeScale: number = 1;
    public browserDeltaTime: number = 0;
    public unscaledGameDeltaTime: number = 0;
    public unscaledPhysicsDeltaTime: number = 0;

    private readonly max: number = 1 / MIN_GAME_FRAMERATE;
    private then: number = 0;

    constructor(gameFramerate: number, physicsFramerate: number) {
        if (gameFramerate < MIN_GAME_FRAMERATE) {
            throw new GameEngineException(`Game framerate cannot be less than ${MIN_GAME_FRAMERATE}`);
        }

        if (physicsFramerate < MIN_PHYSICS_FRAMERATE) {
            throw new GameEngineException(`Physics framerate cannot be less than ${MIN_PHYSICS_FRAMERATE}`);
        }

        if (physicsFramerate < gameFramerate) {
            throw new GameEngineException(`Physics framerate cannot be less than game framerate`);
        }

        this.maxGameDeltatime = parseFloat((1 / gameFramerate).toFixed(6));
        this.maxPhysicsDeltaTime = parseFloat((1 / physicsFramerate).toFixed(6));
    }

    public update(time: number): void {
        const now: number = time * 0.001;
        this.browserDeltaTime = Math.min(Math.max(0, now - this.then), this.max);
        this.then = now;
    }

    public get deltaTime(): number {
        return this.unscaledGameDeltaTime * this.timeScale;
    }

    public get physicsDeltaTime(): number {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }
}
