import Mouse from "./Mouse";
import Keyboard from "./Keyboard";

export default class InputManager {
    public mouse: Mouse = null;
    public keyboard: Keyboard = null;
    public gamepad: any = null;

    constructor() {
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
    }
}
