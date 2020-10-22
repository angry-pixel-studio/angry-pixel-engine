import { container } from "../../Engine/Game";
import GameObject from "../../Engine/GameObject";
import Vector2 from "../../Engine/Helper/Vector2";

export default class InputManager extends GameObject {
    axis = new Vector2(0, 0);
    gunPointer = new Vector2(0, 0);
    fire = false;

    inputManager = container.getSingleton("InputManager");
    inputKeyboard = null;
    inputMouse = null;
    inputGamepad = null;
    camera = null;

    gamepad = null;

    start() {
        this.inputKeyboard = this.inputManager.keyboard;
        this.inputMouse = this.inputManager.mouse;
        this.inputGamepad = this.inputManager.gamepad;
        this.camera = this.findGameObjectByName("GameCamera").getComponent("Camera");
        this.gamepad = this.inputGamepad.getGamepad(0);

        this.update();
    }

    update() {
        this.updateAxis();
        this.updatePointerPosition();
        this.updateFire();
    }

    updateAxis() {
        let axp = this.inputKeyboard.isPressed("d") || this.inputKeyboard.isPressed("D") || this.gamepad.dpadRight;
        let axn = this.inputKeyboard.isPressed("a") || this.inputKeyboard.isPressed("A") || this.gamepad.dpadLeft;
        let ayp = this.inputKeyboard.isPressed("w") || this.inputKeyboard.isPressed("W") || this.gamepad.dpadUp;
        let ayn = this.inputKeyboard.isPressed("s") || this.inputKeyboard.isPressed("S") || this.gamepad.dpadDown;

        this.axis.x = axn ? -1 : axp ? 1 : 0;
        this.axis.y = ayn ? -1 : ayp ? 1 : 0;
    }

    updatePointerPosition() {
        this.gunPointer.x = Math.floor(this.inputMouse.viewportPosition.x + this.camera.worldSpaceRect.x);
        this.gunPointer.y = Math.floor(this.camera.worldSpaceRect.y - this.inputMouse.viewportPosition.y);
    }

    updateFire() {
        this.fire = this.inputMouse.leftButtonPressed || this.gamepad.leftFace || this.gamepad.rightTrigger;
    }
}
