import GameObject from "../GameObject";
import Camera from "../Components/Camera";

export default class GameCamera extends GameObject {
    constructor() {
        super();

        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.addComponent(() => new Camera(this));
    }
}
