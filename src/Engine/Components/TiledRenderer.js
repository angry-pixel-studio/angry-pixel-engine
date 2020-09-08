import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';

export default class TiledRenderer extends Component {
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
                    this.updateSizeInfo({x: 0, y: 0}, col, row);
                    this.processTile(tile, {x: 0, y: 0}, col, row);
                }
                
                index++;
            }    
        }

        this.tilemapProcessd = true;
    }

    processTilemap() {
        this.tilemapData.layers.forEach(
            layer => layer.chunks.forEach(
                chunk => this.processChunk(chunk)
            )
        );

        this.tilemapProcessd = true;
    }

    processChunk(chunk) {
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

    updateSizeInfo(chunk, col, row) {
        col += 1 + chunk.x;
        row += 1 + chunk.y;

        if (this.width < col) {
            this.width = col;
            this.realWidth = this.width * this.tileset.tileWidth * this.tileScale;
        }

        if (this.height < row) {
            this.height = row;
            this.realHeight = this.height * this.tileset.tileHeight * this.tileScale;
        }
    }

    processTile(tile, chunk, col, row) {
        const renderData = new RenderData();
        
        renderData.position.x = (col * this.tileset.tileWidth * this.tileScale)
            + (chunk.x * this.tileset.tileWidth * this.tileScale);
        
        renderData.position.y = -(row * this.tileset.tileHeight * this.tileScale)
            - (chunk.y * this.tileset.tileHeight * this.tileScale);

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