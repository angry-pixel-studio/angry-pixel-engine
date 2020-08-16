import Scene from "../../Engine/Scene/Scene";
import Circuit from "../GameObjects/Circuit";
import Vehicle from "../GameObjects/Vehicle";

export default class Sandbox extends Scene {
    constructor(id, game) {
        super(id, game);

        let circuit = new Circuit('image/sun-peak.png', [{ "x": 330, "y": 240 }]);
        this.addGameObject(circuit);

        this.addGameObject(new Vehicle('image/vehicle1.png', circuit, 1.9))
    }
}