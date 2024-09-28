import { TYPES } from "@config/types";
import { System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { CameraData, RenderData, RenderDataType } from "../../utils/webgl/renderer/Renderer";
import { GeometricRenderData, GeometricShape, TextRenderData, TilemapRenderData } from "@webgl";
import { SYSTEMS } from "@config/systems";

type BoundingBox = { x: number; x1: number; y: number; y1: number };

interface ResizeableRenderData extends RenderData {
    width: number;
    height: number;
    rotation: number;
}

@injectable(SYSTEMS.CullingSystem)
export class CullingSystem implements System {
    // auxiliars
    private readonly viewport: BoundingBox = { x: 0, x1: 0, y: 0, y1: 0 };
    private readonly object: BoundingBox = { x: 0, x1: 0, y: 0, y1: 0 };
    private culledRenderData: RenderData[] = [];

    constructor(
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
        @inject(TYPES.CanvasElement) private readonly canvas: HTMLCanvasElement,
    ) {}

    public onUpdate(): void {
        this.culledRenderData = [];

        this.renderManager.getCameraData().forEach((cameraData) => {
            this.setViewport(cameraData);

            this.renderManager
                .getRenderData()
                .filter((renderData) => cameraData.layers.includes(renderData.layer))
                .forEach((renderData) => {
                    if (this.isInViewPort(renderData)) {
                        if (renderData.type === RenderDataType.Tilemap) {
                            this.applyCullingInTiles(renderData as TilemapRenderData);
                        }
                        this.culledRenderData.push(renderData);
                    }
                });
        });

        this.renderManager.setRenderData(this.culledRenderData);
    }

    private isInViewPort(renderData: RenderData): boolean {
        switch (renderData.type) {
            case RenderDataType.Video:
            case RenderDataType.Mask:
            case RenderDataType.Shadow:
            case RenderDataType.Sprite:
                this.setObjectForResizeable(renderData as ResizeableRenderData);
                break;
            case RenderDataType.Geometric:
                this.setObjectForGeometric(renderData as GeometricRenderData);
                break;
            case RenderDataType.Text:
                this.setObjectForText(renderData as TextRenderData);
                break;
            case RenderDataType.Tilemap:
                this.setObjectForTilemap(renderData as TilemapRenderData);
                break;
        }

        return (
            this.viewport.x1 >= this.object.x &&
            this.viewport.x <= this.object.x1 &&
            this.viewport.y1 >= this.object.y &&
            this.viewport.y <= this.object.y1
        );
    }

    private setViewport({ position, zoom }: CameraData): void {
        this.viewport.x = position.x - this.canvas.width / zoom / 2;
        this.viewport.x1 = position.x + this.canvas.width / zoom / 2;
        this.viewport.y = position.y - this.canvas.height / zoom / 2;
        this.viewport.y1 = position.y + this.canvas.height / zoom / 2;
    }

    private setObjectForResizeable({ position, width, height, rotation = 0 }: ResizeableRenderData): void {
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
    }: TextRenderData): void {
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
        } as ResizeableRenderData);
    }

    private setObjectForGeometric({ position, vertexModel, shape, radius }: GeometricRenderData): void {
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

    private setObjectForTilemap(renderData: TilemapRenderData): void {
        renderData.tilemap.height = Math.ceil(renderData.tiles.length / renderData.tilemap.width);

        this.setObjectForResizeable({
            position: renderData.position,
            width: renderData.tilemap.width * renderData.tilemap.tileWidth,
            height: renderData.tilemap.height * renderData.tilemap.tileHeight,
            rotation: renderData.rotation,
        } as ResizeableRenderData);
    }

    private applyCullingInTiles(renderData: TilemapRenderData): void {
        const {
            tiles,
            tilemap: { width, tileWidth, tileHeight },
        } = renderData;

        renderData.tiles = tiles.map((data, tile) =>
            this.viewport.x1 >= this.object.x + (tile % width) * tileWidth &&
            this.viewport.x <= this.object.x + (tile % width) * tileWidth + tileWidth &&
            this.viewport.y1 >= this.object.y1 - (((tile / width) | 0) * tileHeight + tileHeight) &&
            this.viewport.y <= this.object.y1 - ((tile / width) | 0) * tileHeight
                ? data
                : 0,
        );
    }
}
