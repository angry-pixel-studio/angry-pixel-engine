import GameObject from "../../Engine/GameObject";

export default class SpotPointer extends GameObject {
    mousePressed = false;

    constructor() {
        super();
    }

    gameLoop(event) {
        let mouse = event.input.mouse;
        
        if (mouse.leftButtonPressed && this.mousePressed === false) {
            console.log(mouse.position);
        }
        
        this.mousePressed = mouse.leftButtonPressed;
    }
}