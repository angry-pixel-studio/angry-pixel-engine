import Scene from "../../Engine/Scene";
import Player, { LAYER_PLAYER } from "../GameObjects/Player";
import SpotPointer from "../GameObjects/SpotPointer";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import Camera from "../../Engine/Components/Camera";

export default class Sandbox extends Scene {
    mousePressed = false;

    constructor(id, game) {
        super(id, game);

        this.addGameObject(() => new Player())
            .addGameObject(() => new SpotPointer());

        this.getGameObject(GameCamera.name)
            .getComponent(Camera.name)
            .addLayerToRender(LAYER_PLAYER);
    }
}