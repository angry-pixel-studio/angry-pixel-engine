import Scene from "../../Engine/Scene";
import Player, { LAYER_PLAYER } from "../GameObjects/Player";
import SpotPointer from "../GameObjects/SpotPointer";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import Camera from "../../Engine/Components/Camera";
import Foreground, { LAYER_FOREGROUND } from "../GameObjects/Foreground";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";
import PlayerTop from "../GameObjects/PlayerTop";

export default class Sandbox extends Scene {

    constructor() {
        super();

        this.addGameObject(() => new Foreground(), 'Foreground')
            //.addGameObject(() => new Player(), 'Player')
            .addGameObject(() => new PlayerTop(), 'Player')
            .addGameObject(() => new SpotPointer());

        this.gameCamera.camera.addLayerToRender(LAYER_PLAYER);
        this.gameCamera.camera.addLayerToRender(LAYER_FOREGROUND);
        this.gameCamera.addComponent(() => new FollowPlayerCamera());
    }

    start(event) {
        event.game.canvasBGColor = '#080500';
    }
}