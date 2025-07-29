import { Exception } from "../../utils/Exception";
export const MIN_GAME_FRAMERATE = 30;
export const DEFAULT_GAME_FRAMERATE = 60;
export const DEFAULT_PHYSICS_FRAMERATE = 180;
const allowedPhysicsFramerates = [60, 120, 180, 240];
/** @internal */
export class TimeManager {
    get deltaTime() {
        return this.unscaledDeltaTime * this.timeScale;
    }
    get physicsDeltaTime() {
        return this.unscaledPhysicsDeltaTime * this.timeScale;
    }
    constructor(physicsFramerate) {
        this.minGameDeltatime = 0;
        this.minPhysicsDeltaTime = 0;
        this.gameFramerate = DEFAULT_GAME_FRAMERATE;
        this.physicsFramerate = DEFAULT_PHYSICS_FRAMERATE;
        this.timeScale = 1;
        this.browserDeltaTime = 0;
        this.unscaledDeltaTime = 0;
        this.unscaledPhysicsDeltaTime = 0;
        this.maxDeltaTime = 1 / MIN_GAME_FRAMERATE;
        this.thenForGame = 0;
        this.thenForPhysics = 0;
        this.thenForBrowser = 0;
        if (!allowedPhysicsFramerates.includes(physicsFramerate)) {
            throw new Exception(`Invalid Physics frame rate. Allowed: [${allowedPhysicsFramerates.join(", ")}]`);
        }
        this.physicsFramerate = physicsFramerate;
        this.minGameDeltatime = parseFloat((1 / this.gameFramerate).toFixed(6));
        this.minPhysicsDeltaTime = parseFloat((1 / this.physicsFramerate).toFixed(6));
    }
    updateForGame(time) {
        this.unscaledDeltaTime = Math.min(Math.max(this.minGameDeltatime, time - this.thenForGame), this.maxDeltaTime);
        this.thenForGame = time;
    }
    updateForBrowser(time) {
        this.browserDeltaTime = Math.min(Math.max(0, time - this.thenForBrowser), this.maxDeltaTime);
        this.thenForBrowser = time;
    }
    updateForPhysics(time) {
        this.unscaledPhysicsDeltaTime = Math.min(Math.max(0, time - this.thenForPhysics), this.maxDeltaTime);
        this.thenForPhysics = time;
    }
}
//# sourceMappingURL=TimeManager.js.map