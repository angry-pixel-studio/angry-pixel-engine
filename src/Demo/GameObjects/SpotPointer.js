import GameObject from "../../Engine/GameObject";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import Camera from "../../Engine/Components/Camera";

export default class SpotPointer extends GameObject {
    mousePressed = false;
    camera = null;
    vpPos = null;

    update(event) {
        const mouse = event.input.mouse;

        if (mouse.leftButtonPressed && this.mousePressed === false) {
            this.camera =
                this.camera === null
                    ? this.scene.getGameObject("GameCamera").camera
                    : this.camera;
            this.vpPos = mouse.viewportPosition;

            console.log({
                x: Math.floor(this.vpPos.x + this.camera.worldSpaceRect.x),
                y: Math.floor(this.camera.worldSpaceRect.y - this.vpPos.y),
            });
        }

        this.mousePressed = mouse.leftButtonPressed;
    }
}
