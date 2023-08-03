import { GameCamera } from "../gameObject/GameCamera";
import { Container } from "../utils/Container";
import { Game } from "./Game";
import { GameActor } from "./GameActor";

export type SceneClass = new (container: Container, name: string, game: Game) => Scene;

export class Scene extends GameActor {
    constructor(container: Container, public readonly name: string, public readonly game: Game) {
        super(container);

        if (!this.game.config.headless) {
            this.addGameObject(GameCamera);
        }
    }

    public get gameCamera(): GameCamera {
        return this.findGameObject(GameCamera);
    }

    protected _destroy(): void {
        this.gameObjectManager.destroyAllGameObjects(false);

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }

    protected _stopGame(): void {
        this.gameObjectManager.destroyAllGameObjects(true);

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
