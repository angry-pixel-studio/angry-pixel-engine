import Component from '../../Component';
import RenderData from '../../Core/Rendering/RenderData';
import Rectangle from '../../Helper/Rectangle';
import Tileset from '../../Tileset';

export default class TilemapRenderer extends Component {
    public tileset: Tileset = null;
    public tilemapData: string = null;
    public tileScale: number = 1;
    public showTileset: boolean = false;
    
    private tilemapProcessd:boolean = false;
    private processedData: RenderData[] = [];

    private _width: number = 0;
    private _height: number = 0;

    private _realTiles: Rectangle[] = [];
    private _realWidth: number = 0;
    private _realHeight: number = 0;

    constructor(config: {[key: string]: any}) {
        super();

        this.tileset = config.tileset;
        this.tilemapData = config.tilemapData;

        this.tileScale = config.tileScale !== undefined ? config.tileScale : this.tileScale;
    }

    start (event: Record<string, unknown>): void {
        this.update(event);
    }

    update (event: {[key: string]: any}): void {
        if (this.tileset.loaded && this.showTileset === true && this.tilemapProcessd === false) {
            this.processTileset();
            this.updateTilesPosition();
        } else if (this.tileset.loaded && this.tilemapProcessd === false) {
            this.processTilemap();
            this.updateTilesPosition();
        }
        
        if (this.tileset.loaded && this.tilemapProcessd === true) {
            this.processedData.forEach(renderData => event.renderManager.addToRenderStack(renderData));
        }
    }

    private processTileset(): void {
        let index = 0;
        
        for (let row = 0; row < this.tileset.gridHeight; row++) {
            for (let col = 0; col < this.tileset.gridWidth; col++) {
                const tile = this.tileset.getTile(index);
                
                if (tile !== null) {
                    this.updateSizeInfo(col, row);
                    this.processTile(tile, col, row);
                }
                
                index++;
            }    
        }

        this.tilemapProcessd = true;
    }

    private processTilemap(): void {
        const data = this.tilemapData
            .trim()
            .split('\n');

        data.forEach((rowData: string, row: number)  => {
            const parsedRow = rowData.match(/.{1,5}/g);
            if (parsedRow) {
                parsedRow.forEach(
                    (colData: string, col: number) => {
                        const stringId = colData.trim().replace('[', '').replace(']', '');
                        const tile = this.tileset.getTile(parseInt(stringId));
                        
                        if (tile !== null) {
                            this.updateSizeInfo(col + 1, row + 1);
                            this.processTile(tile, col, row);
                        }
                    }
                )
            }
        });
        this.tilemapProcessd = true;
    }

    private updateSizeInfo(col: number, row: number): void {
        if (this._width < col) {
            this._width = col;
            this._realWidth = this._width * this.tileset.tileWidth * this.tileScale;
        }

        if (this._height < row) {
            this._height = row;
            this._realHeight = this._height * this.tileset.tileHeight * this.tileScale;
        }
    }

    private processTile(tile: Rectangle, col: number, row: number): void {
        const renderData = new RenderData();
        
        renderData.position.x = this.gameObject.transform.position.x + (col * this.tileset.tileWidth * this.tileScale);
        renderData.position.y = this.gameObject.transform.position.y - (row * this.tileset.tileHeight * this.tileScale);

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = tile.width * this.tileScale;
        renderData.height = tile.height * this.tileScale;
        renderData.slice = tile;

        this.processedData.push(renderData);
    }

    private processRealTile(renderData: RenderData): void {
        this._realTiles.push(new Rectangle(
            renderData.position.x,
            renderData.position.y,
            renderData.width,
            renderData.height
        ));
    }

    private updateTilesPosition(): void {
        this.processedData.forEach(renderData => {
            renderData.position.x -= (Math.floor(this._realWidth / 2));
            renderData.position.y += (Math.floor(this._realHeight / 2));
            this.processRealTile(renderData);
        });
    }

    public isTouchingRect(rect: Rectangle): boolean {
        let touching = false;
        this._realTiles.every(tile => {
            if (tile.overlappingRectangle(rect)) {
                touching = true;
                return false;
            }
            return true;
        });

        return touching;
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
