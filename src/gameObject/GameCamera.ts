import { GameObject } from "../core/GameObject";
import { Camera } from "../component/Camera";
import { Rectangle } from "../math/Rectangle";

export class GameCamera extends GameObject {
    public readonly camera: Camera;

    constructor() {
        super();

        this.transform.position.set(0, 0);

        this.camera = this.addComponent(() => new Camera());
    }

    public set layers(layers: string[]) {
        this.camera.layers = layers;
    }

    public get layers(): string[] {
        return this.camera.layers;
    }

    public set depth(depth: number) {
        this.camera.depth = depth;
    }

    public get depth(): number {
        return this.camera.depth;
    }

    public set zoom(zoom: number) {
        this.camera.zoom = zoom;
    }

    public get zoom(): number {
        return this.camera.zoom;
    }

    public get originalViewporRect(): Rectangle {
        return this.camera.originalViewportRect;
    }

    public get worldSpaceRect(): Rectangle {
        return this.camera.worldSpaceRect;
    }

    public get viewportRect(): Rectangle {
        return this.camera.viewportRect;
    }

    public addLayer(layer: string): void {
        this.camera.layers.push(layer);
    }
}
