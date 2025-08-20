import "./style.css";
import { Game } from "angry-pixel";
import { MainScene } from "@scene/MainScene";
import { sceneData } from "./testData/sceneData";

const createAndStart = () => {
    // create the game
    const game = new Game({
        containerNode: document.querySelector("#app"),
        width: 1920,
        height: 1080,
        canvasColor: "#D9D9D9",
        debug: {
            colliders: true,
            mousePosition: true,
        },
        dependencies: [["SceneData", sceneData]],
    });
    //  add scenes
    game.addScene(MainScene, "MainScene", true);
    // start game
    game.start();
};

createAndStart();
