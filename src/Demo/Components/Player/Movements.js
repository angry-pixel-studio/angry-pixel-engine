import Component from "../../../Engine/Component";
import { container } from "../../../Engine/Game";
import Vector2 from "../../../Engine/Helper/Vector2";

export default class Movements extends Component {
    // cache
    timeManager = container.getSingleton("TimeManager");
    inputManager = null;
    transform = null;
    tilemap = null;
    animator = null;

    // status
    mousePosition = new Vector2(0, 0);
    walkSpeed = 250;
    rotationSpeed = 3;
    angle = 0; // in radians
    walkingAnimation = false;

    start() {
        this.tilemap = this.findGameObjectByName("Foreground").getComponent("TilemapRenderer");
        this.transform = this.getComponent("Transform");
        this.animator = this.getComponent("Animator");
        this.inputManager = this.findGameObjectByName("InputManager");
    }

    update() {
        this.rotate();
        this.walk();
    }

    walk() {
        let deltaY = this.inputManager.axis.y * Math.floor(this.walkSpeed * this.timeManager.deltaTime);
        let deltaX = this.inputManager.axis.x * Math.floor(this.walkSpeed * this.timeManager.deltaTime);

        deltaX = deltaY ? deltaX / 1.4 : deltaX;
        deltaY = deltaX ? deltaY / 1.4 : deltaY;

        this.transform.position.x += deltaX;
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaY;
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }

        if ((deltaX || deltaY) && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.animator.playAnimation("PlayerWalking");
        } else if (!deltaX && !deltaY && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.animator.stopAnimation();
        }
    }

    rotate() {
        this.angle = Math.atan2(
            this.inputManager.mousePosition.y - this.transform.position.y,
            this.inputManager.mousePosition.x - this.transform.position.x
        );
        this.transform.rotation = (this.angle * 180) / Math.PI;
    }

    isTouchingForeground() {
        return this.gameObject.getComponent("RectangleCollider").collidesWithLayer("Foreground");
    }
}
