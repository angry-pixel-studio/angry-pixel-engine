import { GameCamera } from "../gameObject/GameCamera";
import { GameActor } from "./GameActor";
/**
 * Base class for all game scenes
 * @public
 * @category Core
 * @example
 * ```js
 * class GameScene extends Scene {
 *   init(options) {
 *     this.addGameObject(Player);
 *   }
 *   start() {}
 *   update() {}
 * }
 * ```
 * @example
 * ```ts
 * class GameScene extends Scene {
 *   protected init(options?: InitOptions): void {
 *     this.addGameObject(Player);
 *   }
 *   protected start(): void {}
 *   protected update(): void {}
 * }
 * ```
 */
export class Scene extends GameActor {
    /** @internal */
    constructor(container, name, game) {
        super(container);
        this.name = name;
        this.game = game;
        if (!this.game.config.headless) {
            this.addGameObject(GameCamera);
        }
    }
    /**
     * The main active camera
     */
    get gameCamera() {
        return this.findGameObject(GameCamera);
    }
    /** @internal */
    _destroy() {
        this.gameObjectManager.destroyAllGameObjects(false);
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
    /** @internal */
    _stopGame() {
        this.gameObjectManager.destroyAllGameObjects(true);
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
//# sourceMappingURL=Scene.js.map