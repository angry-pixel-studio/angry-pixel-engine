import Mouse from "./Mouse";
import Keyboard from "./Keyboard";
import Game from "../../Game";

export default class Input {
    public mouse: Mouse = null;
    public keyboard: Keyboard = null;
    public gamepad: any = null;

    constructor(game: Game) {
        this.mouse = new Mouse(game);
        this.keyboard = new Keyboard();
    }
}
