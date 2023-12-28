import { IRenderData } from "./RenderData";

export interface IMaskRenderData extends IRenderData {
    width: number;
    height: number;
    color: string;
    rotation?: number;
    alpha?: number;
}
