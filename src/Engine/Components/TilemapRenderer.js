import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';
import { PIVOT_CENTER } from '../Core/Rendering/RenderPivots';

export default class TilemapRenderer extends Component {
    tileset = null;
    tilemapData = null;
    renderData = new RenderData();
    tileScale = 1
    showTileset = false;

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
        if (this.tileset.loaded) {
            if (this.showTileset) {
                this.renderTileset(event);
            } else {
                this.processTiled(event);
            }
        }
    }

    processTiled(event) {
        this.tilemapData.layers.forEach(
            layer => layer.chunks.forEach(
                chunk => this.processTiledChunk(event, chunk)
            )
        );
    }

    processTiledChunk(event, chunk) {
        let dataIndex = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile = this.tileset.getTile(chunk.data[dataIndex] - 1);
                if (tile !== null) {
                    this.processTiledTile(event, tile, chunk, col, row);
                }
                
                dataIndex++;
            }    
        }
    }

    renderTileset(event) {
        let index = 0;
        
        for (let row = 0; row < this.tileset.gridHeight; row++) {
            for (let col = 0; col < this.tileset.gridWidth; col++) {
                const tile = this.tileset.getTile(index);
                
                if (tile !== null) {
                    this.processTiledTile(event, tile, {x: 0, y: 0}, col, row);
                }
                
                index++;
            }    
        }
    }

    processTiledTile(event, tile, chunk, col, row) {
        
        const renderData = new RenderData();
        this.setPosition(renderData, chunk, col, row);

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = tile.width * this.tileScale;
        renderData.height = tile.height * this.tileScale;
        renderData.slice = tile;

        event.renderManager.addToRenderStack(renderData);
    }

    setPosition(renderData, chunk, col, row) {
        const basePosition = this.gameObject.transform.position;

        renderData.position.x = basePosition.x
            + (col * this.tileset.tileWidth * this.tileScale)
            + (chunk.x * this.tileset.tileWidth * this.tileScale);
        
        renderData.position.y = basePosition.y
            - (row * this.tileset.tileHeight * this.tileScale)
            - (chunk.y * this.tileset.tileHeight * this.tileScale)
        ;
    }
}