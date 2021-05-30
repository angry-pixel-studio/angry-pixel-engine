import { Rectangle } from "../../Math/Rectangle";
import { CameraData } from "./CameraData";
import { ColliderRenderData } from "./RenderData/ColliderRenderData";
import { GeometricRenderData } from "./RenderData/GeometricRenderData";
import { ImageRenderData } from "./RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "./RenderData/RenderData";
import { TilemapRenderData, TileRenderData } from "./RenderData/TilemapRenderData";

type CullingTarget = { x: number; x1: number; y: number; y1: number };

export class CullingService {
    public applyCulling(camera: CameraData, renderDataCollection: RenderData[]): RenderData[] {
        return renderDataCollection.filter((renderData: RenderData) => {
            if (camera.layers.includes(renderData.layer) === false) return false;

            switch (renderData.type) {
                case RenderDataType.Image:
                    return this.cullSprite(camera, renderData as ImageRenderData);
                case RenderDataType.Tilemap:
                    return this.cullTilemap(camera, renderData as TilemapRenderData);
                case RenderDataType.Collider:
                    return this.cullCollider(camera, renderData as ColliderRenderData);
                case RenderDataType.Geometric:
                    return this.cullGeometric(camera, renderData as GeometricRenderData);
                case RenderDataType.Text:
                    return true;
            }
        });
    }

    private cullSprite(camera: CameraData, renderData: ImageRenderData): boolean {
        return this.isTargetVisible(camera.worldSpaceRect, {
            x: renderData.position.x - renderData.width / 2,
            x1: renderData.position.x + renderData.width / 2,
            y: renderData.position.y - renderData.height / 2,
            y1: renderData.position.x + renderData.height / 2,
        });
    }

    private cullTilemap(camera: CameraData, renderData: TilemapRenderData): boolean {
        renderData.tilesToRender = renderData.tilesData.filter((tileData: TileRenderData) =>
            this.isTargetVisible(camera.worldSpaceRect, {
                x: tileData.position.x - renderData.tileWidth / 2,
                x1: tileData.position.x + renderData.tileWidth / 2,
                y: tileData.position.y - renderData.tileHeight / 2,
                y1: tileData.position.y + renderData.tileHeight / 2,
            })
        );

        return renderData.tilesData.length > 0;
    }

    private cullCollider(camera: CameraData, renderData: ColliderRenderData): boolean {
        return this.isTargetVisible(camera.worldSpaceRect, {
            x: renderData.position.x - renderData.shape.width / 2,
            x1: renderData.position.x + renderData.shape.width / 2,
            y: renderData.position.y - renderData.shape.height / 2,
            y1: renderData.position.x + renderData.shape.height / 2,
        });
    }

    private cullGeometric(camera: CameraData, renderData: GeometricRenderData): boolean {
        return this.isTargetVisible(camera.worldSpaceRect, {
            x: renderData.position.x - renderData.geometric.width / 2,
            x1: renderData.position.x + renderData.geometric.width / 2,
            y: renderData.position.y - renderData.geometric.height / 2,
            y1: renderData.position.x + renderData.geometric.height / 2,
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
