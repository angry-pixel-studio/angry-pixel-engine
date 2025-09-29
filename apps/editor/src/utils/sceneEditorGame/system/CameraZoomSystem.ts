import { Camera, gamePreRenderSystem, GameSystem } from "angry-pixel";

@gamePreRenderSystem()
export class CameraZoomSystem extends GameSystem {
    private zoom: number = 1;

    onUpdate(): void {
        this.zoom = Math.max(0, this.zoom - this.inputManager.mouse.wheelScroll.y * (0.001 * this.zoom));

        this.entityManager.search(Camera).forEach(({ component: camera }) => {
            camera.zoom = this.zoom;
        });
    }
}
