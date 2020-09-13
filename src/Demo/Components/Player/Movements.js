import Component from "../../../Engine/Component";
import Rectangle from "../../../Engine/Helper/Rectangle";
import Vector2 from "../../../Engine/Helper/Vector2";

export default class Movements extends Component {
    // cache
    camera = null;
    mouse = null;
    keyboard = null;
    transform = null;
    tilemap = null;
    animator = null;

    // status
    mousePosition = new Vector2(0, 0);
    walkSpeed = 4;
    rotationSpeed = 3;
    angle = 0; // in radians
    rect = new Rectangle(0, 0, 32, 32);
    walkingAnimation = false;

    start(event) {
        this.mouse = event.input.mouse;
        this.keyboard = event.input.keyboard;
        this.tilemap = this.findGameObject('Foreground').getComponent('TilemapRenderer');
        this.camera = this.findGameObject('GameCamera').getComponent('Camera');
        this.transform = this.getComponent('Transform');
        this.animator = this.getComponent('Animator');
    }

    update() {
        this.calculateMousePosition();
        this.rotate();
        this.walk();
    }

    calculateMousePosition() {
        this.mousePosition.x = Math.floor(this.mouse.viewportPosition.x + this.camera.worldSpaceRect.x);
        this.mousePosition.y = Math.floor(this.camera.worldSpaceRect.y - this.mouse.viewportPosition.y);
    }

    walk() {
        let deltaV = this.keyboard.isPressed('w') 
            ? this.walkSpeed
            : this.keyboard.isPressed('s')
                ? -this.walkSpeed / 2 
                : 0;

        let deltaX = Math.cos(this.angle) * deltaV;
        let deltaY = Math.sin(this.angle) * deltaV;
        
        this.transform.position.x += deltaX;
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaY;
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }
        
        this.animator.setAnimationSpeed('PlayerWalking', (deltaV > 0 ? 0.4 : 0.2));

        if (deltaV && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.animator.playAnimation('PlayerWalking');
        } else if (!deltaV && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.animator.stopAnimation();
        }
    }

    rotate () {
        this.angle = Math.atan2(
            this.mousePosition.y - this.transform.position.y,
            this.mousePosition.x - this.transform.position.x
        );
        this.transform.rotation = -this.angle * 180 / Math.PI;
    }

    isTouchingForeground() {
        this.rect.x = this.transform.position.x - this.rect.width / 2;
        this.rect.y = this.transform.position.y + this.rect.height / 2;

        return this.tilemap.isTouchingRect(this.rect);
    }
    
}