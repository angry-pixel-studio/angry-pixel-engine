import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { inject, injectable } from "@ioc";
import { TimeManager } from "./TimeManager";
import { SystemManager } from "@ecs";
import { SystemGroup } from "@system/SystemGroup";
import { SceneManager } from "./SceneManager";
import { systemsByGroup } from "@config/systemsByGroup";

/** @internal */
export const nowInSeconds = (): number => window.performance.now() * 0.001;

@injectable(DEPENDENCY_TYPES.LoopManager)
export class LoopManager {
    public running: boolean = false;

    private gameLoopAccumulator: number = 0;
    private physicsIntervalId: number;

    constructor(
        @inject(DEPENDENCY_TYPES.TimeManager) private readonly timeManager: TimeManager,
        @inject(DEPENDENCY_TYPES.SystemManager) private readonly systemManager: SystemManager,
        @inject(DEPENDENCY_TYPES.SceneManager) private readonly sceneManager: SceneManager,
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
        systemsByGroup.forEach((systems) => {
            systems.forEach(({ type }) => this.systemManager.enableSystem(type));
        });
    }

    public stop(): void {
        if (!this.running) return;

        this.systemManager.disableAllSystems();
        this.running = false;
    }

    private requestAnimationLoop(time: number): void {
        if (!this.running) return;

        this.timeManager.updateForRender(time * 0.001);
        this.sceneManager.update();

        if (!this.sceneManager.loadingScene) {
            this.gameLoopAccumulator += this.timeManager.browserDeltaTime;

            // if the current scene is loaded this frame, we force to execute first the game logic iteration
            if (this.sceneManager.sceneLoadedThisFrame) this.gameLoopAccumulator = this.timeManager.fixedGameDeltaTime;

            if (this.gameLoopAccumulator >= this.timeManager.fixedGameDeltaTime) {
                this.gameLogicIteration(time * 0.001);
                this.gameLoopAccumulator -= this.timeManager.fixedGameDeltaTime;
            }

            this.renderIteration();
        }

        window.requestAnimationFrame((time) => this.requestAnimationLoop(time));
    }

    private gameLogicIteration(time: number): void {
        this.timeManager.updateForGame(time);

        this.systemManager.update(SystemGroup.PreGameLogic);
        this.systemManager.update(SystemGroup.GameLogic);
        this.timeManager.updateIntervals();
        this.systemManager.update(SystemGroup.Transform);
    }

    private renderIteration(): void {
        if (this.systemManager.groupHasSystems(SystemGroup.GamePreRender)) {
            this.systemManager.update(SystemGroup.GamePreRender);
            this.systemManager.update(SystemGroup.Transform);
        }
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

        if (this.systemManager.groupHasSystems(SystemGroup.GamePhysics)) {
            this.systemManager.update(SystemGroup.GamePhysics);
            this.systemManager.update(SystemGroup.Transform);
        }
        this.systemManager.update(SystemGroup.Physics);
    }
}
