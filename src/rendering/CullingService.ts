import { Rectangle } from "../math/Rectangle";
import { CameraData } from "./CameraData";
import { ColliderRenderData } from "./renderData/ColliderRenderData";
import { ImageRenderData } from "./renderData/ImageRenderData";
import { MaskRenderData } from "./renderData/MaskRenderData";
import { RenderData, RenderDataType } from "./renderData/RenderData";
import { TextRenderData } from "./renderData/TextRenderData";
import { TilemapRenderData, TileRenderData } from "./renderData/TilemapRenderData";

type CullingTarget = { x: number; x1: number; y: number; y1: number };

export class CullingService {
    public applyCulling(camera: CameraData, renderDataCollection: RenderData[]): RenderData[] {
        return renderDataCollection.filter((renderData: RenderData) => {
            if (camera.layers.includes(renderData.layer) === false) return false;
            const viewportRect = renderData.ui ? camera.viewportRect : camera.worldSpaceRect;

            switch (renderData.type) {
                case RenderDataType.Image:
                    return this.cullSprite(viewportRect, renderData as ImageRenderData);
                case RenderDataType.Tilemap:
                    return this.cullTilemap(viewportRect, renderData as TilemapRenderData);
                case RenderDataType.Collider:
                    return this.cullCollider(viewportRect, renderData as ColliderRenderData);
                case RenderDataType.Text:
                    return this.cullText(viewportRect, renderData as TextRenderData);
                case RenderDataType.Mask:
                    return this.cullSprite(viewportRect, renderData as MaskRenderData);
            }
        });
    }

    private cullSprite(viewportRect: Rectangle, renderData: ImageRenderData | MaskRenderData): boolean {
        return this.isTargetVisible(viewportRect, {
            x: renderData.position.x - renderData.width / 2,
            x1: renderData.position.x + renderData.width / 2,
            y: renderData.position.y - renderData.height / 2,
            y1: renderData.position.y + renderData.height / 2,
        });
    }

    private cullTilemap(viewportRect: Rectangle, renderData: TilemapRenderData): boolean {
        renderData.tilesToRender = renderData.tilesData.filter((tileData: TileRenderData) =>
            this.isTargetVisible(viewportRect, {
                x: tileData.position.x - renderData.tileWidth / 2,
                x1: tileData.position.x + renderData.tileWidth / 2,
                y: tileData.position.y - renderData.tileHeight / 2,
                y1: tileData.position.y + renderData.tileHeight / 2,
            })
        );

        return renderData.tilesData.length > 0;
    }

    private cullCollider(viewportRect: Rectangle, renderData: ColliderRenderData): boolean {
        return this.isTargetVisible(viewportRect, renderData.shape.boundingBox);
    }

    private cullText(viewportRect: Rectangle, renderData: TextRenderData): boolean {
        return this.isTargetVisible(viewportRect, {
            x: renderData.position.x - renderData.width / 2,
            x1: renderData.position.x + renderData.width / 2,
            y: renderData.position.y - renderData.height / 2,
            y1: renderData.position.y + renderData.height / 2,
        });
    }

    private isTargetVisible(viewportRect: Rectangle, target: CullingTarget): boolean {
        return (
            viewportRect.x1 >= target.x &&
            viewportRect.x <= target.x1 &&
            viewportRect.y1 >= target.y &&
            viewportRect.y <= target.y1
        );
    }
}
