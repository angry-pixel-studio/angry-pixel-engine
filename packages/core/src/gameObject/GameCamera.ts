import { GameObject } from "../core/GameObject";
import { Camera } from "../component/Camera";
import { Rectangle } from "@angry-pixel/math";

/**
 * This GameCamera object is automatically added to all scenes, but it also allows
 * new instances of it to be created, for example, to generate parallax effects.
 * @public
 * @category Game Objects
 */
export class GameCamera extends GameObject {
    /** The Camera component instance */
    public camera: Camera;

    protected init(): void {
        this.transform.position.set(0, 0);
        this.camera = this.addComponent<Camera>(Camera);
    }

    /** Layers to be rendered by this camera */
    public set layers(layers: string[]) {
        this.camera.layers = layers;
    }

    /** Layers to be rendered by this camera */
    public get layers(): string[] {
        return this.camera.layers;
    }

    /** In case you have more than one camera, the depth value determines which camera is rendered first */
    public set depth(depth: number) {
        this.camera.depth = depth;
    }

    /** In case you have more than one camera, the depth value determines which camera is rendered first */
    public get depth(): number {
        return this.camera.depth;
    }

    /** Camera zoom. Default value is 1 */
    public set zoom(zoom: number) {
        this.camera.zoom = zoom;
    }

    /** Camera zoom. Default value is 1 */
    public get zoom(): number {
        return this.camera.zoom;
    }

    /**
     * Rectangle representing the field of view of the camera in the game world
     * @readonly
     */
    public get worldSpaceRect(): Rectangle {
        return this.camera.worldSpaceRect;
    }

    /**
     * Rectangle representing the field of view of the camera from the perspective of the screen
     * @readonly
     */
    public get viewportRect(): Rectangle {
        return this.camera.viewportRect;
    }

    /** Adds a new layer to the end of the stack */
    public addLayer(layer: string): void {
        this.camera.layers.push(layer);
    }
}
