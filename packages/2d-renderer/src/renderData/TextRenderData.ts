import { Vector2 } from "@angry-pixel/math";
import { IRenderData } from "./RenderData";

/**
 * Direction in which the text will be rendered.
 * @category Components
 * @public
 */
export enum TextOrientation {
    Center,
    RightUp,
    RightDown,
    RightCenter,
}

export interface ITextRenderData extends IRenderData {
    font: FontFace | string;
    text: string;
    fontSize: number;
    color?: string;
    lineSeparation?: number;
    letterSpacing?: number;
    orientation?: TextOrientation;
    rotation?: number;
    alpha?: number;
    smooth?: boolean;
    bitmap?: {
        charRanges?: number[];
        fontSize?: number;
        margin?: Vector2;
        spacing?: Vector2;
    };
}
