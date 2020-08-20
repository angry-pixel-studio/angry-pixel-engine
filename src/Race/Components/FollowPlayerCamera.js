import Component from "../../Engine/Component";
import Camera from "../../Engine/Components/Camera";
import Vehicle from "../GameObjects/Vehicle";
import Circuit from "../GameObjects/Circuit";

export default class FollowPlayerCamera extends Component {
    camera = null;
    
    constructor(gameObject) {
        super(gameObject);

        this.camera = gameObject.getComponent(Camera.name);
    }

    gameLoop(event)  {
        const vehicle = this.gameObject.scene.getGameObjectByTag('player');
        const circuit = this.gameObject.scene.getGameObject(Circuit.name);
        
        // TODO: calcular los boundaries en base al tamaño del circuit y la mitad del viewport
        this.gameObject.transform.position.x = this.clamp(vehicle.transform.position.x, -400, 400);
        this.gameObject.transform.position.y = this.clamp(vehicle.transform.position.y, -200, 200);
    }

    clamp (number, min, max) {
        return Math.max(min, Math.min(number, max));
    }
}