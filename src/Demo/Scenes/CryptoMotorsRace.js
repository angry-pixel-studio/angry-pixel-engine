import Scene from "../../Engine/Scene/Scene";
import Circuit from "../GameObjects/Circuit";
import Vehicle from "../GameObjects/Vehicle";
import SpotPointer from "../GameObjects/SpotPointer";

export default class CryptoMotorsRace extends Scene {
    constructor(id, game) {
        super(id, game);

        const spots = [
            { "x": 330, "y": 240 },
            { "x": 70,  "y": 220 },
            { "x": 330, "y": 200 },
            { "x": 160, "y": 180 },
            { "x": 240, "y": 135 },
            { "x": 390, "y": 170 },
            { "x": 450, "y": 120 },
            { "x": 610, "y": 120 },
            { "x": 500, "y": 240 }
        ];
        
        let circuit = new Circuit('image/sun-peak.png', spots);
        
        this.addGameObjects([
            circuit,
            // others
            new Vehicle('image/vehicle2.png', circuit, 2),
            new Vehicle('image/vehicle2.png', circuit, 1.8),
            new Vehicle('image/vehicle2.png', circuit, 1.7),
            
            // player
            new Vehicle('image/vehicle1.png', circuit, 1.9),
            
            // tool for finding circuit spots
            new SpotPointer()
        ]);

        this.addGameObject(new Vehicle('image/vehicle1.png', circuit, 1.9))
    }
}