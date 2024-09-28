import { TYPES } from "@config/types";
import { inject, injectable } from "@ioc";
import { TimeManager } from "./TimeManager";
import { SystemManager } from "@ecs";
import { SystemGroup } from "@system/SystemGroup";
import { SceneManager } from "./SceneManager";
import { systemTypes } from "@config/systemTypes";

/** @internal */
export const nowInSeconds = (): number => window.performance.now() * 0.001;

@injectable(TYPES.LoopManager)
export class LoopManager {
    public running: boolean = false;

    private gameLoopAccumulator: number = 0;
    private physicsIntervalId: number;

    constructor(
        @inject(TYPES.TimeManager) private readonly timeManager: TimeManager,
        @inject(TYPES.SystemManager) private readonly systemManager: SystemManager,
        @inject(TYPES.SceneManager) private readonly sceneManager: SceneManager,
    ) {}

    public start(): void {
        if (this.running) return;

        this.running = true;
        this.gameLoopAccumulator = 0;

        this.enableSystems();
        this.sceneManager.loadOpeningScene();
        this.requestAnimationLoop(window.performance.now());
        this.asyncPhysicsLoop();
    }

    private enableSystems(): void {
        systemTypes.forEach((systemTypes) => {
            systemTypes.forEach((systemType) => this.systemManager.enableSystem(systemType.type));
        });
    }

    public stop(): void {
        this.running = false;
    }

    private requestAnimationLoop(time: number): void {
        if (!this.running) return;

        this.timeManager.updateForRender(time * 0.001);
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
