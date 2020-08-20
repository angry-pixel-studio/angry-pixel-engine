import Component from "../../Engine/Component";
import Camera from "../../Engine/Components/Camera";
import Vehicle from "../GameObjects/Vehicle";
import Circuit from "../GameObjects/Circuit";

export default class FollowPlayerCamera extends Component {
    camera = null;
    vehicle = null;
    circuit = null;

    constructor(gameObject) {
        super(gameObject);

        this.camera = gameObject.getComponent(Camera.name);
    }

    start() {
        this.vehicle = this.gameObject.scene.getGameObjectByTag('player');
        this.circuit = this.gameObject.scene.getGameObject(Circuit.name);
    }

    update(event)  {
        let x = (this.circuit.width - event.canvas.width) / 2
        let y = (this.circuit.height - event.canvas.height) / 2

        x = x < 0 ? event.canvas.width / 2 : x;
        y = x < 0 ? event.canvas.height / 2 : x;
        
        this.gameObject.transform.position.x = this.clamp(this.vehicle.transform.position.x, -x, x);
        this.gameObject.transform.position.y = this.clamp(this.vehicle.transform.position.y, -y, y);
    }

    clamp (number, min, max) {
        return Math.max(min, Math.min(number, max));
    }
}