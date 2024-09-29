import { Vector2 } from "angry-pixel";

export class InputController {
    public axes: Vector2 = new Vector2(0, 0);
    public jump: boolean = false;
    public pause: boolean = false;
}
