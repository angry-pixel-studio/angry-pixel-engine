import { Camera, gamePreRenderSystem, GameSystem, Transform, Vector2 } from "angry-pixel";

@gamePreRenderSystem()
export class CameraMovementSystem extends GameSystem {
    private lastPosition: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();
    private hasMoved: boolean = false;

    onUpdate(): void {
        if (this.inputManager.mouse.leftButtonPressed) {
            this.hasMoved = this.inputManager.mouse.hasMoved;

            this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
                const transform = this.entityManager.getComponent(entity, Transform);
                if (!this.hasMoved && document.body.style.cursor !== "grab") document.body.style.cursor = "grab";

                if (this.hasMoved) {
                    if (document.body.style.cursor !== "grabbing") document.body.style.cursor = "grabbing";
                    Vector2.subtract(this.distance, this.lastPosition, this.inputManager.mouse.positionInViewport);
                    Vector2.unit(this.direction, this.distance);

                    transform.position.x += this.direction.x * (this.distance.magnitude / camera.zoom);
                    transform.position.y += this.direction.y * (this.distance.magnitude / camera.zoom);
                }
            });
        } else {
            if (document.body.style.cursor !== "default") document.body.style.cursor = "default";
        }

        this.lastPosition.copy(this.inputManager.mouse.positionInViewport);
    }
}
