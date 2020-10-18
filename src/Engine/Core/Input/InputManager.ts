import Mouse from "./Mouse";
import Keyboard from "./Keyboard";

export default class InputManager {
    public mouse: Mouse;
    public keyboard: Keyboard;

    constructor(mouse: Mouse, keyboard: Keyboard) {
        this.mouse = mouse;
        this.keyboard = keyboard;
    }
}
