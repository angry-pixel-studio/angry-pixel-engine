import { SceneManager, SceneConstructor as SceneFactory } from "../core/managers/SceneManager";
import { RenderManager } from "../rendering/RenderManager";
import { loadDependencies } from "./ioc/Config";
import { Container } from "../utils/Container";
import { DEFAULT_PHYSICS_FRAMERATE } from "../core/managers/TimeManager";
import { DEFAULT_MAX_LEVELS, DEFAULT_MAX_ITEMS } from "../physics/collision/QuadTree";
import { Rectangle } from "../math/Rectangle";
import { Vector2 } from "../math/Vector2";
import { IterationManager } from "../core/managers/IterationManager";
import { exceptionName } from "../utils/Exception";

export const container: Container = new Container();

export interface GameConfig {
    containerNode: HTMLElement | null;
    gameWidth?: number;
    gameHeight?: number;
    debugEnabled?: boolean;
    canvasColor?: string;
    context2d?: Context2DConfig;
    physicsFramerate?: number;
    spriteDefaultScale?: Vector2 | null;
    collisions?: {
        method?: CollisionMethodConfig;
        quadTreeBounds?: Rectangle | null; // TODO: implement different bounds per scene
        quadMaxLevel?: number;
        collidersPerQuad?: number;
    };
}

export enum Context2DConfig {
    Default = "default",
    Disabled = "disabled",
    Fallback = "fallback",
}

export enum CollisionMethodConfig {
    AABB = "aabb",
    SAT = "sat",
}

const defaultConfig: GameConfig = {
    containerNode: null,
    gameWidth: 320,
    gameHeight: 180,
    debugEnabled: false,
    canvasColor: "#000000",
    context2d: Context2DConfig.Fallback,
    spriteDefaultScale: null,
    physicsFramerate: DEFAULT_PHYSICS_FRAMERATE,
    collisions: {
        method: CollisionMethodConfig.AABB,
        quadTreeBounds: null,
        quadMaxLevel: DEFAULT_MAX_LEVELS,
        collidersPerQuad: DEFAULT_MAX_ITEMS,
    },
};

export class Game {
    // managers
    private sceneManager: SceneManager;
    private renderManager: RenderManager;
    private iterationManager: IterationManager;

    // state
    private _config: GameConfig;
    private _running: boolean = false;
    private _stop: boolean = false;
    private frameRequestId: number | null = null;

    constructor(config: GameConfig) {
        this._config = {
            ...defaultConfig,
            ...config,
        };
        this._config.collisions = {
            ...defaultConfig.collisions,
            ...config.collisions,
        };

        window.addEventListener("error", this.errorEventHandler);

        container.addConstant("Game", this);
        this.setupManagers();
    }

    private errorEventHandler = (event: ErrorEvent): void => {
        if (event.error.name === exceptionName) {
            this.stop();

            event.stopPropagation();
            event.preventDefault();

            console.error(`${event.error.message}\n${event.filename}:${event.lineno}`);
        }
    };

    private setupManagers(): void {
        loadDependencies(container, this._config);

        this.renderManager = container.getSingleton<RenderManager>("RenderManager");
        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
        this.iterationManager = container.getSingleton<IterationManager>("IterationManager");
    }

    /**
     * @returns GameConfig
     */
    public get config(): GameConfig {
        return this._config;
    }

    /**
     * @returns running
     */
    public get running(): boolean {
        return this._running;
    }

    /**
     * Add a scene to the game
     *
     * @param name The name of the scene
     * @param sceneFactory The factory funciton for the escene
     * @param openingScene If this is the opening scene, set TRUE, FALSE instead
     */
    public addScene(name: string, sceneFactory: SceneFactory, openingScene: boolean = false): void {
        this.sceneManager.addScene(name, sceneFactory, openingScene);
    }

    /**
     * Run the game
     */
    public run(): void {
        this.sceneManager.loadOpeningScene();
        this.requestAnimationFrame();
    }

    /**
     * Stop the game
     */
    public stop(): void {
        this.pauseLoop();
        this.sceneManager.unloadCurrentScene();
        this.renderManager.clearCanvas();
    }

    private gameLoop(time: number): void {
        if (this._stop === true) return;

        this._running = true;
        this.iterationManager.update(time);
        this.requestAnimationFrame();
    }

    /**
     * Pauses the game loop
     */
    public pauseLoop(): void {
        this._stop = true;
        this._running = false;

        if (this.frameRequestId !== null) {
            window.cancelAnimationFrame(this.frameRequestId);
            this.frameRequestId = null;
        }
    }

    /**
     * Resumes the paused game loop
     */
    public resumeLoop(): void {
        if (this._running == false && this.frameRequestId === null) {
            this._stop = false;
            this.requestAnimationFrame();
        }
    }

    private requestAnimationFrame(): void {
        this.frameRequestId = window.requestAnimationFrame((time) => this.gameLoop(time));
    }
}
