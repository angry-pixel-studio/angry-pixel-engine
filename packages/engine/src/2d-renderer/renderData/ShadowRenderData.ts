import { Vector2 } from "../../math";
import { IRenderData } from "./RenderData";

export interface IShadowRenderData extends IRenderData {
    color: string;
    height: number;
    opacity: number;
    rotation: number;
    width: number;
    lights: Light[];
}

export interface Light {
    position: Vector2;
    radius: number;
    smooth: boolean;
    intensity: number;
}
