import GameObject from "../../Engine/GameObject";
import { container } from "../../Engine/Game";

export default class SpotPointer extends GameObject {
    inputManager = container.getSingleton("InputManager");

    mousePressed = false;
    camera = null;
    vpPos = null;

    update() {
        const mouse = this.inputManager.mouse;

        if (mouse.leftButtonPressed && this.mousePressed === false) {
            this.camera = this.camera === null ? this.getCurrentScene().gameCamera.camera : this.camera;
            this.vpPos = mouse.viewportPosition;

            /*console.log({
                x: Math.floor(this.vpPos.x + this.camera.worldSpaceRect.x),
                y: Math.floor(this.camera.worldSpaceRect.y - this.vpPos.y),
            });*/
        }

        this.mousePressed = mouse.leftButtonPressed;
    }
}
