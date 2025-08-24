import { Game } from "angry-pixel";
import { MainScene } from "./mainScene";

export const createGame = (containerNode: HTMLElement): Game => {
    const game = new Game({
        containerNode,
        width: 1920,
        height: 1080,
        canvasColor: "#334155",
    });

    game.addScene(MainScene, "MainScene", true);

    return game;
};
