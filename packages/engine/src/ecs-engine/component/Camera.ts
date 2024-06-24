export const defaultRenderLayer = "Default";

export class Camera {
    /** Layers to be rendered by this camera. Layers are rendered in ascending order */
    layers: string[] = [defaultRenderLayer];
    /** Camera zoom. Default value is 1 */
    zoom: number = 1;
    /** In case you have more than one camera, the depth value determines which camera is rendered first. The lesser value, the first to render */
    depth: number = 0;
}
