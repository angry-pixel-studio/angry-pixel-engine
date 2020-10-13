import Mouse from "./Mouse";
import Keyboard from "./Keyboard";

export default class InputManager {
    public mouse: Mouse = null;
    public keyboard: Keyboard = null;

    constructor(gameNode: HTMLElement) {
        this.mouse = new Mouse(gameNode);
        this.keyboard = new Keyboard();
    }
}
