import { IRenderData } from "./RenderData";

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
