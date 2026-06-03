import { BroadPhaseMethods, CollisionMethods, Game } from "angry-pixel";
import { MainScene } from "@scene/MainScene";

const params = new URLSearchParams(window.location.search);
const debug = Boolean(Number(params.get("debug")));

export const createAndStart = () => {
    const game = new Game({
        containerNode: document.querySelector("#app"),
        width: 1920,
        height: 1080,
        canvasColor: "#000000",
        physicsFramerate: 180,
        collisions: {
            collisionMatrix: [],
            collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
            collisionMethod: CollisionMethods.SAT,
        },
        debug: {
            mousePosition: debug,
            textPosition: "top-left",
            colliders: debug,
            textRendererBoundingBoxes: debug,
        },
    });

    game.addScene(MainScene, "MainScene", true);

    game.start();
};

createAndStart();
