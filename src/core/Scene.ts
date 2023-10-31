import { GameCamera } from "../gameObject/GameCamera";
import { Container } from "../utils/Container";
import { Game } from "./Game";
import { GameActor } from "./GameActor";

export type SceneClass = new (container: Container, name: string, game: Game) => Scene;

/**
 * Base class for all game scenes
 * @public
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
    /** @private */
    constructor(container: Container, public readonly name: string, public readonly game: Game) {
        super(container);

        if (!this.game.config.headless) {
            this.addGameObject(GameCamera);
        }
    }

    /**
     * The main active camera
     */
    public get gameCamera(): GameCamera {
        return this.findGameObject(GameCamera);
    }

    /** @private */
    protected _destroy(): void {
        this.gameObjectManager.destroyAllGameObjects(false);

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }

    /** @private */
    protected _stopGame(): void {
        this.gameObjectManager.destroyAllGameObjects(true);

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
