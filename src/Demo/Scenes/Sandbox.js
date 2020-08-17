import Scene from "../../Engine/Scene/Scene";
import Circuit from "../GameObjects/Circuit";
import Vehicle from "../GameObjects/Vehicle";
import SpotPointer from "../GameObjects/SpotPointer";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import MovingCamera from "../Components/MovingCamera";

export default class Sandbox extends Scene {
    constructor(id, game) {
        super(id, game);

        this.addGameObject(() => new Circuit('image/sun-peak.png'))
            .addGameObject(() => new Vehicle('image/vehicle1.png', 1.9))
            .addGameObject(() => new SpotPointer());

        let camera = this.getGameObject(GameCamera.name);
        camera.addComponent(() => new MovingCamera(camera));
    }
}