import { Game, GameConfig } from "angry-pixel";
import { MainScene } from "./scene/MainScene";

export const createGame = (gameConfig: GameConfig): Game => {
    const game = new Game(gameConfig);

    game.addScene(MainScene, "MainScene", true);

    return game;
};
