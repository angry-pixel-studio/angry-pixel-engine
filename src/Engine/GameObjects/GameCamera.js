import GameObject from "../GameObject";
import Camera from "../Components/Camera";
import { CAMERA } from "../Component";

export default class GameCamera extends GameObject {
    constructor() {
        this.addComponent(CAMERA, new Camera(this));
    }
}
