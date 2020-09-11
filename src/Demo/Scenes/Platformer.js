import Scene from "../../Engine/Scene";
import Player, { LAYER_PLAYER } from "../GameObjects/Player";
import SpotPointer from "../GameObjects/SpotPointer";
import ForegroundPlatformer, { LAYER_FOREGROUND } from "../GameObjects/ForegroundPlatformer";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";

export default class Platformer extends Scene {

    constructor() {
        super();

        this.addGameObject(() => new ForegroundPlatformer(), 'Foreground')
            .addGameObject(() => new Player(), 'Player')
            .addGameObject(() => new SpotPointer());

        this.gameCamera.camera.addLayerToRender(LAYER_PLAYER);
        this.gameCamera.camera.addLayerToRender(LAYER_FOREGROUND);
        this.gameCamera.addComponent(() => new FollowPlayerCamera());
    }
}