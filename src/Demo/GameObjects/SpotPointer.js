import GameObject from "../../Engine/GameObject";
import GameCamera from "../../Engine/GameObjects/GameCamera";
import Camera from "../../Engine/Components/Camera";

export default class SpotPointer extends GameObject {
    mousePressed = false;
    camera = null;
    vpPos = null;

    gameLoop(event) {
        const mouse = event.input.mouse;
        
        if (mouse.leftButtonPressed && this.mousePressed === false) {
            this.camera = this.camera === null 
                ? this.scene.getGameObject(GameCamera.name).getComponent(Camera.name)
                : this.camera;
            this.vpPos = mouse.viewportPosition;

            console.log( {
                x: Math.floor(this.vpPos.x + this.camera.worldCameraRect.x1),
                y: Math.floor(this.camera.worldCameraRect.y1 - this.vpPos.y)
            })
        }
        
        this.mousePressed = mouse.leftButtonPressed;
    }
}