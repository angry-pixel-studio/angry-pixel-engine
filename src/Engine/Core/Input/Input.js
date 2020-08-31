import Mouse from "./Mouse";
import Keyboard from "./Keyboard";

export default class Input {
    mouse = null;
    keyboard = null;
    gamepad = null;

    constructor(game) {
        this.mouse = new Mouse(game);
        this.keyboard = new Keyboard(game);
    }
}