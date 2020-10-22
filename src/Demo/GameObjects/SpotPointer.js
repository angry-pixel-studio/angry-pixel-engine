import GameObject from "../../Engine/GameObject";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import Camera from "../../Engine/Components/Camera";
import Game from "../../Engine/Game";

export default class SpotPointer extends GameObject {
    mousePressed = false;
    camera = null;
    vpPos = null;

    update() {
        const mouse = Game.inputManager.mouse;

        if (mouse.leftButtonPressed && this.mousePressed === false) {
            this.camera = this.camera === null ? this.scene.gameCamera.camera : this.camera;
            this.vpPos = mouse.viewportPosition;

            /*console.log({
                x: Math.floor(this.vpPos.x + this.camera.worldSpaceRect.x),
                y: Math.floor(this.camera.worldSpaceRect.y - this.vpPos.y),
            });*/
        }

        this.mousePressed = mouse.leftButtonPressed;
    }
}
