import { Vector2 } from "@angry-pixel/math";
import { IProcessedTilemapData, ITilemapRenderData, TilemapOrientation } from "./renderData/TilemapRenderData";

export const processTilemapRenderData = (renderData: ITilemapRenderData): IProcessedTilemapData => {
    const processed: IProcessedTilemapData = {
        ...renderData,
        culledTiles: [],
        tilemap: {
            ...renderData.tilemap,
            height: Math.ceil(renderData.tiles.length / renderData.tilemap.width),
            realWidth: renderData.tilemap.width * renderData.tilemap.tileWidth,
            realHeight: 0,
        },
        renderPosition: new Vector2(),
    };

    processed.tilemap.realHeight = processed.tilemap.height * processed.tilemap.tileHeight;
    setRenderPosition(processed);

    return processed;
};

const setRenderPosition = (renderData: IProcessedTilemapData) => {
    renderData.renderPosition.set(
        renderData.position.x +
            (renderData.orientation !== TilemapOrientation.Center ? renderData.tilemap.realWidth / 2 : 0),
        renderData.position.y +
            (renderData.orientation === TilemapOrientation.RightDown
                ? -renderData.tilemap.realHeight / 2
                : renderData.orientation === TilemapOrientation.RightUp
                ? renderData.tilemap.realHeight / 2
                : 0)
    );
};
