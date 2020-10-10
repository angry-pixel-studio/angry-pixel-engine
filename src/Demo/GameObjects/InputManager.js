import { container } from "../../Engine/Game";
import GameObject from "../../Engine/GameObject";
import Vector2 from "../../Engine/Helper/Vector2";

export default class InputManager extends GameObject {
    axis = new Vector2(0, 0);
    mousePosition = new Vector2(0, 0);
    fire = false;

    keyboard = null;
    mouse = null;
    camera = null;

    start() {
        this.keyboard = container.getSingleton("InputManager").keyboard;
        this.mouse = container.getSingleton("InputManager").mouse;
        this.camera = this.findGameObjectByName("GameCamera").getComponent("Camera");

        this.update();
    }

    update() {
        this.updateAxis();
        this.updateMousePosition();
        this.updateFire();
    }

    updateAxis() {
        this.axis.x =
            this.keyboard.isPressed("a") || this.keyboard.isPressed("A")
                ? -1
                : this.keyboard.isPressed("d") || this.keyboard.isPressed("D")
                ? 1
                : 0;

        this.axis.y =
            this.keyboard.isPressed("s") || this.keyboard.isPressed("S")
                ? -1
                : this.keyboard.isPressed("w") || this.keyboard.isPressed("W")
                ? 1
                : 0;
    }

    updateMousePosition() {
        this.mousePosition.x = Math.floor(this.mouse.viewportPosition.x + this.camera.worldSpaceRect.x);
        this.mousePosition.y = Math.floor(this.camera.worldSpaceRect.y - this.mouse.viewportPosition.y);
    }

    updateFire() {
        this.fire = this.mouse.leftButtonPressed;
    }
}
