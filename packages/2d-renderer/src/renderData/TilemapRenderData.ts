import { Vector2 } from "@angry-pixel/math";
import { IRenderData } from "./RenderData";

/**
 * Direction in which the tilemap will be rendered.
 * @category Components
 * @public
 */
export enum TilemapOrientation {
    Center,
    RightUp,
    RightDown,
    RightCenter,
}

export interface ITilemapRenderData extends IRenderData {
    tiles: number[];
    tilemap: {
        width: number;
        tileWidth: number;
        tileHeight: number;
    };
    tileset: {
        image: HTMLImageElement;
        width: number;
        tileWidth: number;
        tileHeight: number;
        margin?: Vector2;
        spacing?: Vector2;
        correction?: Vector2;
    };
    smooth?: boolean;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    rotation?: number;
    alpha?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
    orientation?: TilemapOrientation;
}

export interface IProcessedTilemapData extends ITilemapRenderData {
    culledTiles: number[];
    tilemap: {
        height: number;
        width: number;
        tileWidth: number;
        tileHeight: number;
        realWidth: number;
        realHeight: number;
    };
    renderPosition: Vector2;
}
