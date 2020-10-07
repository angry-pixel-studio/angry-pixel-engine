import Mouse from "./Mouse";
import Keyboard from "./Keyboard";

export default class InputManager {
    public mouse: Mouse = null;
    public keyboard: Keyboard = null;
    // public gamepad: any = null;

    constructor(canvas: HTMLCanvasElement) {
        this.mouse = new Mouse(canvas);
        this.keyboard = new Keyboard();
    }
}
