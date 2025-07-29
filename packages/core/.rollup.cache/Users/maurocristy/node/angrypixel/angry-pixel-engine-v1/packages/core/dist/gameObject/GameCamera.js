import { GameObject } from "../core/GameObject";
import { Camera } from "../component/Camera";
/**
 * This GameCamera object is automatically added to all scenes, but it also allows
 * new instances of it to be created, for example, to generate parallax effects.
 * @public
 * @category Game Objects
 */
export class GameCamera extends GameObject {
    init() {
        this.transform.position.set(0, 0);
        this.camera = this.addComponent(Camera);
    }
    /** Layers to be rendered by this camera */
    set layers(layers) {
        this.camera.layers = layers;
    }
    /** Layers to be rendered by this camera */
    get layers() {
        return this.camera.layers;
    }
    /** In case you have more than one camera, the depth value determines which camera is rendered first */
    set depth(depth) {
        this.camera.depth = depth;
    }
    /** In case you have more than one camera, the depth value determines which camera is rendered first */
    get depth() {
        return this.camera.depth;
    }
    /** Camera zoom. Default value is 1 */
    set zoom(zoom) {
        this.camera.zoom = zoom;
    }
    /** Camera zoom. Default value is 1 */
    get zoom() {
        return this.camera.zoom;
    }
    /**
     * Rectangle representing the field of view of the camera in the game world
     * @readonly
     */
    get worldSpaceRect() {
        return this.camera.worldSpaceRect;
    }
    /**
     * Rectangle representing the field of view of the camera from the perspective of the screen
     * @readonly
     */
    get viewportRect() {
        return this.camera.viewportRect;
    }
    /** Adds a new layer to the end of the stack */
    addLayer(layer) {
        this.camera.layers.push(layer);
    }
}
//# sourceMappingURL=GameCamera.js.map