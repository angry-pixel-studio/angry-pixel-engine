import Component from "../../../Engine/Component";
import Rectangle from "../../../Engine/Helper/Rectangle";

export default class MovementsArrows extends Component {
    // cache
    keyboard = null;
    transform = null;
    tilemap = null;
    animator = null;

    // status
    walkSpeed = 4;
    rotationSpeed = 3;
    angle = 0; // in degrees
    rect = new Rectangle(0, 0, 32, 32);
    walkingAnimation = false;

    start(event) {
        this.keyboard = event.input.keyboard;
        this.tilemap = this.findGameObject('Foreground').getComponent('TilemapRenderer');
        this.transform = this.getComponent('Transform');
        this.animator = this.getComponent('Animator');
    }

    update() {
        this.rotate();
        this.walk();
    }

    update() {
        this.rotate();
        this.walk();
    }

    rotate () {
        let delta = 0;

        if (this.keyboard.isPressed('ArrowLeft')) {
            delta -= this.rotationSpeed;
        } else if (this.keyboard.isPressed('ArrowRight')) {
            delta += this.rotationSpeed;
        }

        this.angle += delta;
        this.transform.rotation += delta;
    }
    
    walk() {
        let deltaV = this.keyboard.isPressed('ArrowUp') 
            ? this.walkSpeed
            : this.keyboard.isPressed('ArrowDown')
                ? -this.walkSpeed / 2
                : 0;

        let deltaX = Math.cos(this.angle * Math.PI / 180) * deltaV;
        let deltaY = -Math.sin(this.angle * Math.PI / 180) * deltaV;
        
        this.transform.position.x += deltaX;
        if (deltaX !== 0 && this.isTouchingForeground()) {
            this.transform.position.x -= deltaX;
        }

        this.transform.position.y += deltaY;
        if (deltaY !== 0 && this.isTouchingForeground()) {
            this.transform.position.y -= deltaY;
        }

        this.animator.setAnimationSpeed('PlayerWalking', this.deltaV < 0 ? 0.4 : 0.2);
        
        if (deltaV && this.walkingAnimation === false) {
            this.walkingAnimation = true;
            this.animator.playAnimation('PlayerWalking');
        } else if (!deltaV && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.animator.stopAnimation();
        }
    }

    isTouchingForeground() {
        this.rect.x = this.transform.position.x - this.rect.width / 2;
        this.rect.y = this.transform.position.y + this.rect.height / 2;

        return this.tilemap.isTouchingRect(this.rect);
    }
    
}