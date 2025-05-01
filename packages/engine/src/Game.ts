import { bootstrap, GameConfig } from "@config/bootstrap";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { Container, DependencyName, DependencyType } from "@ioc";
import { LoopManager } from "@manager/LoopManager";
import { SceneManager, SceneType } from "@manager/SceneManager";

/**
 * The Game class is the core entry point for creating and managing a game instance.\
 * It serves as a central hub that coordinates all game systems including scenes, entities,
 * components, and various managers (rendering, physics, input, etc.).\
 * The class provides methods to initialize the game with custom configuration, add scenes
 * and dependencies, and control the game loop execution.\
 * Through dependency injection, it ensures proper initialization and communication between all game systems.
 * @public
 * @category Core
 * @example
 * ```js
 * // Basic game setup with minimal configuration
 * const game = new Game({
 *   containerNode: document.getElementById("app"),
 *   width: 1920,
 *   height: 1080,
 * });
 * game.addScene(MainScene, "MainScene");
 * game.start();
 * ```
 * @example
 * ```js
 * // Advanced game setup with custom physics and collision settings
 * const game = new Game({
 *   containerNode: document.getElementById("app"),
 *   width: 1920,
 *   height: 1080,
 *   debugEnabled: false,
 *   canvasColor: "#000000",
 *   physicsFramerate: 180,
 *   collisions: {
 *     collisionMatrix: [
 *       ["layer1", "layer2"],
 *       ["layer1", "layer3"],
 *     ],
 *     collisionMethod: CollisionMethods.SAT,
 *     collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
 *   }
 * });
 * game.addScene(MainScene, "MainScene");
 * game.start();
 * ```
 */
export class Game {
    private readonly container: Container;

    constructor(gameConfig: GameConfig) {
        this.container = bootstrap(gameConfig);
    }

    /**
     * TRUE if the game is running
     */
    public get running(): boolean {
        return this.container.get<LoopManager>(DEPENDENCY_TYPES.LoopManager).running;
    }

    /**
     * Add a scene to the game
     *
     * @param sceneType The class of the scene
     * @param name The name for the scene
     * @param openingScene If this is the opening scene, set TRUE, FALSE instead (optional: default FALSE)
     */
    public addScene(sceneType: SceneType, name: string, openingScene: boolean = false): void {
        this.container.get<SceneManager>(DEPENDENCY_TYPES.SceneManager).addScene(sceneType, name, openingScene);
    }

    /**
     * Add a new class to be used as dependency
     *
     * @param dependencyType The class of the dependency
     * @param name The name for the dependecy (optional: if the class uses the "injectable" decorator, this parameter is unnecesary)
     */
    public addDependencyType(dependencyType: DependencyType, name?: DependencyName): void {
        this.container.add(dependencyType, name);
    }

    /**
     * Add a new instance to be used as dependency
     *
     * @param dependencyInstance The dependency instance
     * @param name The name for the dependecy
     */
    public addDependencyInstance(dependencyInstance: any, name: DependencyName): void {
        this.container.set(name, dependencyInstance);
    }

    /**
     * Start the game
     */
    public start(): void {
        this.container.get<LoopManager>(DEPENDENCY_TYPES.LoopManager).start();
    }

    /**
     * Stop the game
     */
    public stop(): void {
        this.container.get<LoopManager>(DEPENDENCY_TYPES.LoopManager).stop();
    }
}
