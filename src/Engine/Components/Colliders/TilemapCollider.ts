import Component from "./../../Component";
import TrapezoidCollider from "./TrapezoidCollider";

interface Config {
    tilemapData: string;
    tileWidth: number;
    tileHeight: number;
    tileScale: number;
}

export default class TilemapCollider extends Component {
    private tilemapData: string;
    private tileWidth: number;
    private tileHeight: number;
    private colliders: Array<TrapezoidCollider> = [];

    constructor({ tilemapData, tileWidth, tileHeight, tileScale }: Config) {
        super();

        this.tilemapData = tilemapData;
        this.tileWidth = tileWidth * tileScale;
        this.tileHeight = tileHeight * tileScale;
    }

    // TODO: Change this to get the tilemap data from the tilemap renderer
    protected start() {
        const data = this.tilemapData.trim().split("\n");

        const totalRows = data.length;
        const totalColumns = data[0].length / 5;

        const offsetX = (totalColumns * this.tileWidth) / 2;
        const offsetY = (totalRows * this.tileHeight) / 2;

        data.forEach((rowData: string, row: number) => {
            const parsedRow = rowData.match(/.{1,5}/g);
            if (parsedRow) {
                parsedRow.forEach((colData: string, col: number) => {
                    const stringId = colData.trim().replace("[", "").replace("]", "");
                    if (stringId) {
                        const posX = col * this.tileWidth;
                        const posY = row * this.tileHeight;

                        const trapezoidCollider = new TrapezoidCollider({
                            x: posX - offsetX,
                            y: posY - offsetY,
                            width: this.tileWidth,
                            height: this.tileHeight,
                            offsetX: 0,
                            offsetY: 0,
                            layer: this.gameObject.layer,
                        });
                        //if (posX - offsetX === 64 && posY - offsetY === 64) {
                        trapezoidCollider.enableDebug();
                        //}

                        this.colliders.push(trapezoidCollider);
                    }
                });
            }
        });
    }
}
