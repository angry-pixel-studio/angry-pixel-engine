import { ICameraData } from "./CameraData";
import { GeometricShape, IGeometricRenderData } from "./renderData/GeometricRenderData";
import { IRenderData, RenderDataType, RenderLocation } from "./renderData/RenderData";
import { ITextRenderData } from "./renderData/TextRenderData";
import { IProcessedTilemapData } from "./renderData/TilemapRenderData";

interface BoundingBox {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

interface IResizeableRenderData extends IRenderData {
    width: number;
    height: number;
    rotation: number;
}

export interface ICullingManager {
    applyCulling(cameraData: ICameraData, renderData: IRenderData[]): IRenderData[];
}

export class CullingManager implements ICullingManager {
    private readonly viewport: BoundingBox = { x: 0, x1: 0, y: 0, y1: 0 };
    private readonly object: BoundingBox = { x: 0, x1: 0, y: 0, y1: 0 };

    constructor(private readonly gl: WebGL2RenderingContext) {}

    private setViewport({ position, zoom }: ICameraData, renderLocation: RenderLocation): void {
        if (renderLocation === RenderLocation.WorldSpace) {
            this.viewport.x = position.x - this.gl.canvas.width / zoom / 2;
            this.viewport.x1 = position.x + this.gl.canvas.width / zoom / 2;
            this.viewport.y = position.y - this.gl.canvas.height / zoom / 2;
            this.viewport.y1 = position.y + this.gl.canvas.height / zoom / 2;
        } else {
            this.viewport.x = -this.gl.canvas.width / 2;
            this.viewport.x1 = this.gl.canvas.width / 2;
            this.viewport.y = -this.gl.canvas.height / 2;
            this.viewport.y1 = this.gl.canvas.height / 2;
        }
    }

    private setObjectForResizeable({ position, width, height, rotation = 0 }: IResizeableRenderData): void {
        const sin = Math.abs(Math.sin(rotation));
        const cos = Math.abs(Math.cos(rotation));

        const rotatedWidth = sin * height + cos * width;
        const rotatedHeight = sin * width + cos * height;

        this.object.x = position.x - rotatedWidth / 2;
        this.object.x1 = position.x + rotatedWidth / 2;
        this.object.y = position.y - rotatedHeight / 2;
        this.object.y1 = position.y + rotatedHeight / 2;
    }

    private setObjectForText({
        position,
        text,
        fontSize,
        lineSeparation,
        letterSpacing,
        rotation,
    }: ITextRenderData): void {
        const width =
            text.split("\n").reduce((max, line) => Math.max(max, line.length), 0) *
            (fontSize + (letterSpacing ?? 0)) *
            2;
        const height = text.split("\n").length * (fontSize + (lineSeparation ?? 0));

        this.setObjectForResizeable({
            position,
            width,
            height,
            rotation,
        } as IResizeableRenderData);
    }

    private setObjectForGeometric({ position, vertexModel, shape, radius }: IGeometricRenderData): void {
        if (shape === GeometricShape.Circumference) {
            this.object.x = position.x - radius;
            this.object.y = position.y - radius;
            this.object.x1 = position.x + radius;
            this.object.y1 = position.y + radius;
        } else {
            this.object.x = Number.MAX_SAFE_INTEGER;
            this.object.y = Number.MAX_SAFE_INTEGER;
            this.object.x1 = Number.MIN_SAFE_INTEGER;
            this.object.y1 = Number.MIN_SAFE_INTEGER;

            vertexModel.forEach((vertex) => {
                this.object.x = Math.min(vertex.x + position.x, this.object.x);
                this.object.y = Math.min(vertex.y + position.y, this.object.y);
                this.object.x1 = Math.max(vertex.x + position.x, this.object.x1);
                this.object.y1 = Math.max(vertex.y + position.y, this.object.y1);
            });
        }
    }

    private setObjectForTilemap(renderData: IProcessedTilemapData): void {
        renderData.tilemap.height = Math.ceil(renderData.tiles.length / renderData.tilemap.width);

        this.setObjectForResizeable({
            position: renderData.renderPosition,
            width: renderData.tilemap.width * renderData.tilemap.tileWidth,
            height: renderData.tilemap.height * renderData.tilemap.tileHeight,
            rotation: renderData.rotation,
        } as IResizeableRenderData);
    }

    private applyCullingInTiles(renderData: IProcessedTilemapData): void {
        const {
            tiles,
            tilemap: { width, tileWidth, tileHeight },
        } = renderData;

        renderData.culledTiles = tiles.map((data, tile) =>
            this.viewport.x1 >= this.object.x + (tile % width) * tileWidth &&
            this.viewport.x <= this.object.x + (tile % width) * tileWidth + tileWidth &&
            this.viewport.y1 >= this.object.y1 - (((tile / width) | 0) * tileHeight + tileHeight) &&
            this.viewport.y <= this.object.y1 - ((tile / width) | 0) * tileHeight
                ? data
                : 0,
        );
    }

    public isInViewPort(renderData: IRenderData, cameraData: ICameraData): boolean {
        this.setViewport(cameraData, renderData.location);

        switch (renderData.type) {
            case RenderDataType.Video:
            case RenderDataType.Mask:
            case RenderDataType.Sprite:
                this.setObjectForResizeable(renderData as IResizeableRenderData);
                break;
            case RenderDataType.Geometric:
                this.setObjectForGeometric(renderData as IGeometricRenderData);
                break;
            case RenderDataType.Text:
                this.setObjectForText(renderData as ITextRenderData);
                break;
            case RenderDataType.Tilemap:
                this.setObjectForTilemap(renderData as IProcessedTilemapData);
                break;
        }

        return (
            this.viewport.x1 >= this.object.x &&
            this.viewport.x <= this.object.x1 &&
            this.viewport.y1 >= this.object.y &&
            this.viewport.y <= this.object.y1
        );
    }

    public applyCulling(cameraData: ICameraData, renderData: IRenderData[]): IRenderData[] {
        return renderData.filter((data) => {
            if (this.isInViewPort(data, cameraData)) {
                if (data.type === RenderDataType.Tilemap) {
                    this.applyCullingInTiles(data as IProcessedTilemapData);
                }

                return true;
            }

            return false;
        });
    }
}
