import Scene from "../../Engine/Scene/Scene";
import Player from "../GameObjects/Player";
import SpotPointer from "../GameObjects/SpotPointer";

export default class Sandbox extends Scene {
    constructor(id, game) {
        super(id, game);

        this.addGameObject(() => new Player())
            .addGameObject(() => new SpotPointer());
    }
}