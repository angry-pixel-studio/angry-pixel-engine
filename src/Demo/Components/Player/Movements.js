import Component from "../../../Engine/Component";
import { container } from "../../../Engine/Game";
import Vector2 from "../../../Engine/Helper/Vector2";

export default class Movements extends Component {
    // cache
    timeManager = container.getSingleton("TimeManager");
    assetManager = container.getSingleton("AssetManager");
    inputManager = null;

    transform = null;
    tilemap = null;
    animator = null;
    audioPlayer = null;
    collider = null;

    // status
    mousePosition = new Vector2(0, 0);
    walkSpeed = 250;
    rotationSpeed = 3;
    angle = 0; // in radians
    walkingAnimation = false;
    walkingSFX = false;

    start() {
        this.tilemap = this.findGameObjectByName("Foreground").getComponent("TilemapRenderer");
        this.transform = this.getComponent("Transform");
        this.animator = this.getComponent("Animator");
        this.collider = this.getComponent("RectangleCollider");
        this.inputManager = this.findGameObjectByName("InputManager");

        this.audioPlayer = this.getComponent("AudioPlayer");
        this.audioPlayer.audio = this.assetManager.getAudio("audio/footsteps.wav");
        this.audioPlayer.loop = true;
        this.audioPlayer.volume = 0.5;
    }

    update() {
        this.rotate();
        this.walk();
    }

    walk() {
        let deltaY = this.inputManager.axis.y * this.walkSpeed * this.timeManager.deltaTime;
        let deltaX = this.inputManager.axis.x * this.walkSpeed * this.timeManager.deltaTime;

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
            this.audioPlayer.play();
        } else if (!deltaX && !deltaY && this.walkingAnimation === true) {
            this.walkingAnimation = false;
            this.animator.stopAnimation();
            this.audioPlayer.stop();
        }
    }

    rotate() {
        this.angle = Math.atan2(
            this.inputManager.gunPointer.y - this.transform.position.y,
            this.inputManager.gunPointer.x - this.transform.position.x
        );
        this.transform.rotation = (this.angle * 180) / Math.PI;
    }

    isTouchingForeground() {
        return this.collider.collidesWithLayer("Foreground") || this.collider.collidesWithLayer("Bot");
    }
}
