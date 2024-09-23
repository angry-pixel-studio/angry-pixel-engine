import { SystemManager } from "../../ecs/SystemManager";
import { inject, injectable } from "../../ioc/container";
import { TYPES } from "../../config/types";
import { SystemGroup } from "../system/GameSystem";
import { ISceneManager } from "./SceneManager";
import { ITimeManager } from "./TimeManager";

/** @internal */
export const nowInSeconds = (): number => window.performance.now() * 0.001;

/** @internal */
export interface ILoopManager {
    start(): void;
    stop(): void;
    running: boolean;
}

/** @internal */
@injectable(TYPES.LoopManager)
export class LoopManager implements ILoopManager {
    public running: boolean = false;

    private gameLoopAccumulator: number = 0;
    private physicsIntervalId: number;

    constructor(
        @inject(TYPES.TimeManager) private readonly timeManager: ITimeManager,
        @inject(TYPES.SceneManager) private readonly sceneManager: ISceneManager,
        @inject(TYPES.SystemManager) private readonly systemManager: SystemManager,
    ) {}

    public start(): void {
        this.startLoop();
    }

    public stop(): void {
        this.running = false;
    }

    private startLoop(): void {
        if (this.running) return;

        this.running = true;

        this.sceneManager.loadOpeningScene();

        this.requestAnimationLoop(window.performance.now());

        this.asyncPhysicsLoop();
    }

    private requestAnimationLoop(time: number): void {
        if (!this.running) return;

        this.timeManager.updateForBrowser(time * 0.001);
        this.sceneManager.update();

        this.gameLoopAccumulator += this.timeManager.browserDeltaTime;

        if (this.gameLoopAccumulator >= this.timeManager.fixedGameDeltaTime) {
            this.gameLogicIteration(time * 0.001);
            this.gameLoopAccumulator -= this.timeManager.fixedGameDeltaTime;
        }

        this.renderIteration();

        window.requestAnimationFrame((time) => this.requestAnimationLoop(time));
    }

    private gameLogicIteration(time: number): void {
        this.timeManager.updateForGame(time);

        this.systemManager.update(SystemGroup.PreGameLogic);
        this.systemManager.update(SystemGroup.GameLogic);
        this.systemManager.update(SystemGroup.PostGameLogic);
    }

    private renderIteration(): void {
        this.systemManager.update(SystemGroup.GamePreRender);
        this.systemManager.update(SystemGroup.Render);
    }

    private asyncPhysicsLoop(): void {
        this.physicsIntervalId = window.setInterval(() => {
            if (!this.running) return window.clearInterval(this.physicsIntervalId);
            this.timeManager.updateForPhysics(nowInSeconds());
            if (!document.hidden) this.physicsIteration();
        }, 1000 / this.timeManager.fixedPhysicsFramerate);
    }

    private physicsIteration(): void {
        if (this.timeManager.timeScale <= 0) return;

        this.systemManager.update(SystemGroup.GamePhysics);
        this.systemManager.update(SystemGroup.Physics);
    }
}
