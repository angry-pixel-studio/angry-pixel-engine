import { SceneManager, SceneClass } from "../core/managers/SceneManager";
import { loadDependencies } from "./ioc/Config";
import { Container } from "../utils/Container";
import { DEFAULT_PHYSICS_FRAMERATE } from "../core/managers/TimeManager";
import { DEFAULT_MAX_LEVELS, DEFAULT_MAX_ITEMS } from "../physics/collision/QuadTree";
import { Rectangle } from "../math/Rectangle";
import { Vector2 } from "../math/Vector2";
import { CollisionMatrix } from "../physics/collision/CollisionManager";
import { IIterationManager } from "./managers/IterationManager";
import { InitOptions } from "./GameActor";

export const container: Container = new Container();

export interface GameConfig {
    containerNode?: HTMLElement | null;
    gameWidth?: number;
    gameHeight?: number;
    debugEnabled?: boolean;
    canvasColor?: string;
    physicsFramerate?: number;
    spriteDefaultScale?: Vector2 | null;
    headless?: boolean;
    collisions?: {
        method?: CollisionMethodConfig;
        quadTreeBounds?: Rectangle | null; // TODO: implement different bounds per scene
        quadMaxLevel?: number;
        collidersPerQuad?: number;
        collisionMatrix?: CollisionMatrix;
    };
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
    spriteDefaultScale: null,
    physicsFramerate: DEFAULT_PHYSICS_FRAMERATE,
    headless: false,
    collisions: {
        method: CollisionMethodConfig.AABB,
        quadMaxLevel: DEFAULT_MAX_LEVELS,
        collidersPerQuad: DEFAULT_MAX_ITEMS,
    },
};

export class Game {
    // managers
    private sceneManager: SceneManager;
    private iterationManager: IIterationManager;

    // state
    private _config: GameConfig;

    constructor(config: GameConfig) {
        this._config = {
            ...defaultConfig,
            ...config,
        };
        this._config.collisions = {
            ...defaultConfig.collisions,
            ...config.collisions,
        };

        container.addConstant("Game", this);
        this.setupManagers();
    }

    private setupManagers(): void {
        loadDependencies(container, this._config);

        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
        this.iterationManager = container.getSingleton<IIterationManager>("IterationManager");
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
        return this.iterationManager.running;
    }

    /**
     * Add a scene to the game
     *
     * @param sceneClass the class of the scene
     * @param name The name of the scene
     * @param options [optional] This options will be passed to the init method
     * @param openingScene [default FALSE] If this is the opening scene, set TRUE, FALSE instead
     */
    public addScene(sceneClass: SceneClass, name: string, options?: InitOptions, openingScene: boolean = false): void {
        this.sceneManager.addScene(sceneClass, name, options, openingScene);
    }

    /**
     * Run the game
     */
    public run(): void {
        this.iterationManager.start();
    }

    /**
     * Stop the game
     */
    public stop(): void {
        this.iterationManager.stop();
    }

    /**
     * Pauses the game
     */
    public pause(): void {
        this.iterationManager.pause();
    }

    /**
     * Resumes the paused game
     */
    public resume(): void {
        this.iterationManager.resume();
    }
}
