import Scene from "../../Engine/Scene";
import Player, { LAYER_PLAYER } from "../GameObjects/Player";
import SpotPointer from "../GameObjects/SpotPointer";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import Camera from "../../Engine/Components/Camera";
import Foreground from "../GameObjects/Foreground";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";

export default class Sandbox extends Scene {

    constructor() {
        super();

        this.addGameObject(() => new Foreground())
            .addGameObject(() => new Player(), 'Player')
            .addGameObject(() => new SpotPointer());

        this.gameCamera.camera.addLayerToRender(LAYER_PLAYER);
        this.gameCamera.addComponent(() => new FollowPlayerCamera());
    }
}