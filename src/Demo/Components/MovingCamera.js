import Component from "../../Engine/Component";
import Camera from "../../Engine/Components/Camera";

export default class MovingCamera extends Component {
    camera = null;
    speed = 2;
    
    constructor(gameObject) {
        super(gameObject);

        this.camera = gameObject.getComponent(Camera.name);
    }

    gameLoop(event)  {
        const keyboard = event.input.keyboard;
        let deltaX = 0;
        let deltaY = 0;
        
        if (keyboard.isPressed('ArrowUp')) {
            deltaY = this.speed;
        } else if (keyboard.isPressed('ArrowDown')) {
            deltaY = -this.speed;
        }

        if (keyboard.isPressed('ArrowLeft')) {
            deltaX = -this.speed;
        } else if (keyboard.isPressed('ArrowRight')) {
            deltaX = +this.speed;
        }
        
        this.gameObject.transform.position.x += deltaX;
        this.gameObject.transform.position.y += deltaY;
    }
}