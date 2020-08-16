import Scene from "../../Engine/Scene/Scene";
import Circuit from "../GameObjects/Circuit";
import Vehicle from "../GameObjects/Vehicle";

export default class Sandbox extends Scene {
    constructor(id, game) {
        super(id, game);

        this.addGameObject(() => new Circuit('image/sun-peak.png'))
            .addGameObject(() => new Vehicle('image/vehicle1.png', 1.9));
    }
}