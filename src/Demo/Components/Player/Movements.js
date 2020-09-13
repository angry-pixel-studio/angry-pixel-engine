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
        let deltaY = this.keyboard.isPressed('w')
            ? this.walkSpeed
            : this.keyboard.isPressed('s')
                ? -this.walkSpeed
                : 0;

        let deltaX = this.keyboard.isPressed('d')
            ? this.walkSpeed
            : this.keyboard.isPressed('a')
                ? -this.walkSpeed
                : 0;

        this.transform.position.x += deltaY ? deltaX / 1.4 : deltaX;
        this.gameObject.updateCollidersPosition();
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaX ? deltaY / 1.4 : deltaY;
        this.gameObject.updateCollidersPosition();
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }
        
        if ((deltaX || deltaY) && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.animator.playAnimation('PlayerWalking');
        } else if (!deltaX && !deltaY && this.walkingAnimation === true) {
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
        return this.tilemap.isTouchingRect(this.gameObject.collider);
    }
    
}