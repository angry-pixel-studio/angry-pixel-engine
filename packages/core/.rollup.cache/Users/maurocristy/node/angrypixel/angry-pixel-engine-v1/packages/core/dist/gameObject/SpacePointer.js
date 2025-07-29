import { GameObject } from "../core/GameObject";
import { Vector2 } from "@angry-pixel/math";
/**
 * This object can be used to click anywhere in the game and get the coordinates relative to the game world.
 * The coordinates are expressed as an xy vector in the browser console.
 * It is a useful tool to know where to position objects.
 * @public
 * @category Game Objects
 */
export class SpacePointer extends GameObject {
    constructor() {
        super(...arguments);
        this.mousePressed = false;
        this.position = new Vector2();
    }
    start() {
        this.camera = this.getCurrentScene().gameCamera;
    }
    update() {
        if (this.inputManager.mouse.leftButtonPressed && this.mousePressed === false) {
            Vector2.round(this.position, Vector2.add(this.position, this.camera.transform.position, Vector2.scale(this.position, this.inputManager.mouse.positionInViewport, 1 / this.camera.zoom)));
            console.log(`Space position: {x: ${this.position.x}, y: ${this.position.y}}`);
        }
        this.mousePressed = this.inputManager.mouse.leftButtonPressed;
    }
}
//# sourceMappingURL=SpacePointer.js.map