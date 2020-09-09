import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';

export default class TilemapRenderer extends Component {
    tileset = null;
    tilemapData = null;
    tileScale = 1
    showTileset = false;
    
    tilemapProcessd = false;
    processedData = [];

    width = 0;
    height = 0;

    realWidth = 0;
    realHeight = 0;

    constructor(config) {
        super();

        this.tileset = config.tileset;
        this.tilemapData = config.tilemapData;

        this.tileScale = config.tileScale !== undefined ? config.tileScale : this.tileScale;
    }

    start (event) {
        this.update(event);
    }

    update (event) {
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

    processTileset() {
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

    processTilemap() {
        const data = this.tilemapData
            .trim()
            .split('\n');

        data.forEach((rowData, row)  => {
            rowData = rowData.match(/.{1,5}/g);
            if (rowData) {
                rowData.forEach(
                    (colData, col) => {
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

    updateSizeInfo(col, row) {
        if (this.width < col) {
            this.width = col;
            this.realWidth = this.width * this.tileset.tileWidth * this.tileScale;
        }

        if (this.height < row) {
            this.height = row;
            this.realHeight = this.height * this.tileset.tileHeight * this.tileScale;
        }
    }

    processTile(tile, col, row) {
        const renderData = new RenderData();
        
        renderData.position.x = (col * this.tileset.tileWidth * this.tileScale);
        
        renderData.position.y = -(row * this.tileset.tileHeight * this.tileScale);

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = tile.width * this.tileScale;
        renderData.height = tile.height * this.tileScale;
        renderData.slice = tile;

        this.processedData.push(renderData);
    }

    updateTilesPosition() {
        this.processedData.forEach(renderData => {
            renderData.position.x -= (Math.floor(this.realWidth / 2));
            renderData.position.y += (Math.floor(this.realHeight / 2));
        });
    }
}