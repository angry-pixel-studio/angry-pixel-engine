import GameObject from "../../Engine/GameObject";
import GameCamera from "../../Engine/GameObjects/GameCamera";

export default class SpotPointer extends GameObject {
    mousePressed = false;

    gameLoop(event) {
        let mouse = event.input.mouse;
        
        if (mouse.leftButtonPressed && this.mousePressed === false) {
            let camera = this.scene.getGameObject(GameCamera.name);
            
            let vpPos = mouse.viewportPosition;
        }
        
        this.mousePressed = mouse.leftButtonPressed;
    }
}