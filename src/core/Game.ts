import { ISceneManager } from "../core/managers/SceneManager";
import { loadDependencies } from "./ioc/Config";
import { Container } from "../utils/Container";
import { DEFAULT_PHYSICS_FRAMERATE } from "../core/managers/TimeManager";
import { IIterationManager } from "./managers/IterationManager";
import { InitOptions } from "./GameActor";
import { GameConfig } from "./GameConfig";
import { SceneClass } from "./Scene";
import { Vector2 } from "angry-pixel-math";
import { BroadPhaseMethods, CollisionMethods } from "angry-pixel-2d-physics";

const defaultConfig: GameConfig = {
    containerNode: undefined,
    gameWidth: 320,
    gameHeight: 180,
    debugEnabled: false,
    canvasColor: "#000000",
    physicsFramerate: DEFAULT_PHYSICS_FRAMERATE,
    headless: false,
    spriteDefaultScale: new Vector2(1, 1),
    collisions: {
        collisionMethod: CollisionMethods.SAT,
        collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
    },
};

/**
 * Game is the main class that contains all the managers, scenes, objects and components. It allows to start and stop the execution of the game.
 * @public
 * @example
 * ```js
 * const game = new Game({
 *   containerNode: document.getElementById("app"),
 *   gameWidth: 1920,
 *   gameHeight: 1080,
 * });
 * game.addScene(GameScene, "GameScene");
 * game.run();
 * ```
 * @example
 * ```js
 * const game = new Game({
 *   containerNode: document.getElementById("app"),
 *   gameWidth: 1920,
 *   gameHeight: 1080,
 *   debugEnabled: false,
 *   canvasColor: "#000000",
 *   physicsFramerate: 180,
 *   headless: false,
 *   spriteDefaultScale: new Vector2(1, 1),
 *   collisions: {
 *     collisionMatrix: [
 *       ["layer1", "layer2"],
 *       ["layer1", "layer3"],
 *     ],
 *     collisionMethod: CollisionMethods.SAT,
 *     collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
 *     collisionArea: new Rectangle(-960, -540, 1920, 1080),
 *   }
 * });
 * game.addScene(GameScene, "GameScene");
 * game.run();
 * ```
 */
export class Game {
    /** @private */
    private readonly container: Container;
    /** @private */
    private sceneManager: ISceneManager;
    /** @private */
    private iterationManager: IIterationManager;
    /** @private */
    private _config: GameConfig;

    /** @private */
    constructor(config: GameConfig) {
        this._config = {
            ...defaultConfig,
            ...config,
        };
        this._config.collisions = {
            ...defaultConfig.collisions,
            ...config.collisions,
        };

        this.container = new Container();

        this.container.addConstant("Game", this);
        this.setupManagers();
    }

    /** @private */
    private setupManagers(): void {
        loadDependencies(this.container, this._config);

        this.sceneManager = this.container.getSingleton<ISceneManager>("SceneManager");
        this.iterationManager = this.container.getSingleton<IIterationManager>("IterationManager");
    }

    /**
     * The game configuration
     */
    public get config(): GameConfig {
        return this._config;
    }

    /**
     * TRUE if the game is running
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
