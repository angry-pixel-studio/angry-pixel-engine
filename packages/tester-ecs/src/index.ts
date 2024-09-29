import { BroadPhaseMethods, CollisionMethods, Game } from "angry-pixel";
import { MainScene } from "@scene/MainScene";
import { collisionMatrix } from "@config/collisionMatrix";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop.toString()),
});

export const createAndStart = () => {
    // create game
    const game = new Game({
        containerNode: document.querySelector("#app"),
        width: 1920,
        height: 1080,
        canvasColor: "#030060",
        physicsFramerate: 180,
        collisions: {
            collisionMatrix,
            collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
            collisionMethod: CollisionMethods.SAT,
        },
        // @ts-ignore
        debugEnabled: Boolean(Number(params.debug)),
    });

    //  add scenes
    game.addScene(MainScene, "MainScene", true);

    // start game
    game.start();
};

createAndStart();
