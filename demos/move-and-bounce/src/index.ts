import { Game } from "angry-pixel";
import { MainScene } from "@scene/MainScene";

const game = new Game({
    containerNode: document.getElementById("app")!,
    width: 1920,
    height: 1080,
});
game.addScene(MainScene, "MainScene", true);
game.start();
