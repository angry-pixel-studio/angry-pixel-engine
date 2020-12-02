import { GameObject } from "../GameObject";
import { Camera, TYPE_CAMERA } from "../Components/Camera";

export class GameCamera extends GameObject {
    public readonly camera: Camera;

    constructor() {
        super();

        this.transform.position.set(0, 0);

        this.camera = this.addComponent(() => new Camera());
    }
}
