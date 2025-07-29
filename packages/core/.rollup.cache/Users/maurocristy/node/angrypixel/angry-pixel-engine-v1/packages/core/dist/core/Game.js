import { loadDependencies } from "./ioc/Config";
import { Container } from "../utils/Container";
import { DEFAULT_PHYSICS_FRAMERATE } from "../core/managers/TimeManager";
import { Vector2 } from "@angry-pixel/math";
import { BroadPhaseMethods, CollisionMethods } from "@angry-pixel/2d-physics";
const defaultConfig = {
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
 * @category Core
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
    /** @internal */
    constructor(config) {
        this._config = Object.assign(Object.assign({}, defaultConfig), config);
        this._config.collisions = Object.assign(Object.assign({}, defaultConfig.collisions), config.collisions);
        this.container = new Container();
        this.container.addConstant("Game", this);
        this.setupManagers();
    }
    /** @internal */
    setupManagers() {
        loadDependencies(this.container, this._config);
        this.sceneManager = this.container.getSingleton("SceneManager");
        this.iterationManager = this.container.getSingleton("IterationManager");
    }
    /**
     * The game configuration
     */
    get config() {
        return this._config;
    }
    /**
     * TRUE if the game is running
     */
    get running() {
        return this.iterationManager.running;
    }
    /**
     * @internal
     */
    addScene(sceneClass, name, arg1, arg2) {
        this.sceneManager.addScene(sceneClass, name, typeof arg1 === "object" ? arg1 : undefined, typeof arg1 === "boolean" ? arg1 : arg2 !== null && arg2 !== void 0 ? arg2 : false);
    }
    /**
     * Run the game
     */
    run() {
        this.iterationManager.start();
    }
    /**
     * Stop the game
     */
    stop() {
        this.iterationManager.stop();
    }
    /**
     * Pauses the game
     */
    pause() {
        this.iterationManager.pause();
    }
    /**
     * Resumes the paused game
     */
    resume() {
        this.iterationManager.resume();
    }
}
//# sourceMappingURL=Game.js.map