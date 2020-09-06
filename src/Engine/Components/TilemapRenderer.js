import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';

export default class TilemapRenderer extends Component {
    tileset = null;
    tilemapData = null;
    renderData = new RenderData();

    constructor(config) {
        super();

        this.tileset = config.tileset;
        this.tilemapData = config.tilemapData;
    }

    start (event) {
        this.update(event);
    }

    update (event) {
        if (this.tileset.loaded) {
            this.processTiled(event);
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
        const basePosition = this.gameObject.transform.position;

        chunk.data.forEach((tileIndex, key) => {
            const tile = this.tileset.getTile(tileIndex);
            
            if (tile !== null) {
                const renderData = new RenderData();

                renderData.ui = false;
                renderData.image = this.tileset.image;
                renderData.layer = this.gameObject.layer;
                renderData.position.x = basePosition.x + (key * this.tileset.tileWidth);
                renderData.position.y = basePosition.y + (0 * this.tileset.tileHeight);
                renderData.width = 16;
                renderData.height = 16;
                renderData.slice = tile;

                event.renderManager.addToRenderStack(renderData);
            }
        });
    }
}