import { Camera, GameSystem } from "angry-pixel";

export class CameraZoomSystem extends GameSystem {
    private zoom: number = 1;

    onUpdate(): void {
        this.zoom = Math.max(0, this.zoom - this.inputManager.mouse.wheelScroll.y * 0.0005);

        this.entityManager.search(Camera).forEach(({ component: camera }) => {
            camera.zoom = this.zoom;
        });
    }
}
