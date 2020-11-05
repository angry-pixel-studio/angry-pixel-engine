import { GameObject } from "../GameObject";
import { Camera, TYPE_CAMERA } from "../Components/Camera";

export class GameCamera extends GameObject {
    public readonly camera: Camera;

    constructor() {
        super();

        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.camera = this.addComponent(() => new Camera());
    }
}
