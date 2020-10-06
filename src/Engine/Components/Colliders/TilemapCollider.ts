import CollisionManager from "../../Core/Collision/CollisionManager";
import Game from "../../Game";
import Component from "./../../Component";
import RectangleCollider from "./../../Core/Collision/RectangleCollider";

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
    private colliders: Array<RectangleCollider> = [];

    private collisionManager: CollisionManager = Game.get<CollisionManager>("CollisionManager");

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

                        const rectangleCollider = new RectangleCollider({
                            x: posX - offsetX,
                            y: posY - offsetY,
                            width: this.tileWidth,
                            height: this.tileHeight,
                            layer: this.gameObject.layer,
                        });

                        this.colliders.push(rectangleCollider);
                        this.collisionManager.addCollider(rectangleCollider);
                    }
                });
            }
        });
    }
}
