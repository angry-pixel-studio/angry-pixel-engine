import { GameObject } from "../GameObject";
import { Camera } from "../Components/Camera";

export const CAMERA_COMPONENT = "Camera";

export class GameCamera extends GameObject {
    constructor() {
        super();

        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.addComponent(() => new Camera(), CAMERA_COMPONENT);
    }

    get camera(): Camera {
        return this.getComponent<Camera>(CAMERA_COMPONENT);
    }
}
