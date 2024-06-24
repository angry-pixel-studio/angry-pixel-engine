import { IRenderData } from "./RenderData";

/**
 * Mask shape: Rectangle or Circumference.
 * @category Components
 * @public
 */
export enum MaskShape {
    Rectangle,
    Circumference,
}

export interface IMaskRenderData extends IRenderData {
    color: string;
    shape: MaskShape;
    width?: number;
    height?: number;
    radius?: number;
    rotation?: number;
    alpha?: number;
}
