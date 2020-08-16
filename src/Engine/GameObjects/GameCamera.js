import GameObject from "../GameObject";
import Camera from "../Components/Camera";

export default class GameCamera extends GameObject {
    constructor() {
        super();

        this.addComponent(() => new Camera(this));
    }
}
