import Component from "../../Component";
import Tileset from "../../Tileset";
import Rectangle from "../../Helper/Rectangle";
import { container } from "../../Game";
import ImageRenderData from "../../Core/Rendering/RenderData/ImageRenderData";
import RenderManager from "../../Core/Rendering/RenderManager";

type Config = {
    tileset: Tileset;
    tilemapData: TilemapData;
    tileScale: number;
};

type TilemapData = { layers: Layer[] };
type Layer = { chunks: Chunk[] };
type Chunk = {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
};

export default class TiledRenderer extends Component {
    public tileset: Tileset;
    public tilemapData: TilemapData;
    public tileScale: number = 1;
    public showTileset: boolean = false;

    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private tilemapProcessd: boolean = false;
    private processedData: ImageRenderData[] = [];

    private _width: number = 0;
    private _height: number = 0;

    private _realTiles: Rectangle[] = [];
    private _realWidth: number = 0;
    private _realHeight: number = 0;

    constructor(config: Config) {
        super();

        this.tileset = config.tileset;
        this.tilemapData = config.tilemapData;
        this.tileScale = config.tileScale ?? this.tileScale;
    }

    start(): void {
        this.update();
    }

    update(): void {
        if (this.tileset.loaded && this.showTileset === true && this.tilemapProcessd === false) {
            this.processTileset();
            this.updateTilesPosition();
        } else if (this.tileset.loaded && this.tilemapProcessd === false) {
            this.processTilemap();
            this.updateTilesPosition();
        }

        if (this.tileset.loaded && this.tilemapProcessd === true) {
            this.processedData.forEach((renderData) => this.renderManager.addToRenderStack(renderData));
        }
    }

    private processTileset(): void {
        let index = 0;

        for (let row = 0; row < this.tileset.gridHeight; row++) {
            for (let col = 0; col < this.tileset.gridWidth; col++) {
                const tile = this.tileset.getTile(index);

                if (tile !== null) {
                    this.updateSizeInfo({ x: 0, y: 0 }, col, row);
                    this.processTile(tile, { x: 0, y: 0 }, col, row);
                }

                index++;
            }
        }

        this.tilemapProcessd = true;
    }

    private processTilemap(): void {
        this.tilemapData.layers.forEach((layer: Layer) =>
            layer.chunks.forEach((chunk: Chunk) => this.processChunk(chunk))
        );

        this.tilemapProcessd = true;
    }

    private processChunk(chunk: Chunk): void {
        let dataIndex = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile = this.tileset.getTile(chunk.data[dataIndex] - 1);
                if (tile !== null) {
                    this.updateSizeInfo(chunk, col, row);
                    this.processTile(tile, chunk, col, row);
                }

                dataIndex++;
            }
        }
    }

    private updateSizeInfo(chunk: { x: number; y: number }, col: number, row: number): void {
        col += 1 + chunk.x;
        row += 1 + chunk.y;

        if (this._width < col) {
            this._width = col;
            this._realWidth = this._width * this.tileset.tileWidth * this.tileScale;
        }

        if (this._height < row) {
            this._height = row;
            this._realHeight = this._height * this.tileset.tileHeight * this.tileScale;
        }
    }

    private processTile(tile: Rectangle, chunk: { x: number; y: number }, col: number, row: number): void {
        const renderData = new ImageRenderData();

        renderData.position.x =
            this.gameObject.transform.position.x +
            col * this.tileset.tileWidth * this.tileScale +
            chunk.x * this.tileset.tileWidth * this.tileScale;

        renderData.position.y =
            this.gameObject.transform.position.y -
            row * this.tileset.tileHeight * this.tileScale -
            chunk.y * this.tileset.tileHeight * this.tileScale;

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = tile.width * this.tileScale;
        renderData.height = tile.height * this.tileScale;
        renderData.slice = tile;

        this.processedData.push(renderData);
    }

    private updateTilesPosition(): void {
        this.processedData.forEach((renderData) => {
            renderData.position.x -= Math.floor(this._realWidth / 2);
            renderData.position.y += Math.floor(this._realHeight / 2);
        });
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get realWidth(): number {
        return this._realWidth;
    }

    public get realHeight(): number {
        return this._realHeight;
    }
}
