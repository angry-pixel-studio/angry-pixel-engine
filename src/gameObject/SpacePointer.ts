import { GameObject } from "../core/GameObject";
import { Vector2 } from "angry-pixel-math";
import { GameCamera } from "./GameCamera";

export class SpacePointer extends GameObject {
    private camera: GameCamera;
    private mousePressed: boolean = false;
    private position: Vector2 = new Vector2();

    protected start(): void {
        this.camera = this.getCurrentScene().gameCamera;
    }

    protected update(): void {
        if (this.inputManager.mouse.leftButtonPressed && this.mousePressed === false) {
            Vector2.round(
                this.position,
                Vector2.add(
                    this.position,
                    this.camera.transform.position,
                    Vector2.scale(this.position, this.inputManager.mouse.positionInViewport, 1 / this.camera.zoom)
                )
            );

            console.log(`Space position: {x: ${this.position.x}, y: ${this.position.y}}`);
        }

        this.mousePressed = this.inputManager.mouse.leftButtonPressed;
    }
}
