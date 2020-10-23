import Rectangle from "../../Libs/Geometric/Shapes/Rectangle";
import Component from "./../../Component";
import TrapezoidCollider from "./TrapezoidCollider";

interface Config {
    tilesData: Rectangle[];
}

export default class TilemapCollider extends Component {
    private tilesData: Rectangle[] = [];
    private colliders: Array<TrapezoidCollider> = [];

    constructor({ tilesData }: Config) {
        super();

        this.tilesData = tilesData;
    }

    protected start(): void {
        this.tilesData.forEach((tileData) => {
            const trapezoidCollider = new TrapezoidCollider({
                x: tileData.x,
                y: tileData.y,
                width: tileData.width,
                height: tileData.height,
                offsetX: 0,
                offsetY: 0,
                layer: this.gameObject.layer,
            });
            //if (posX - offsetX === 64 && posY - offsetY === 64) {
            trapezoidCollider.enableDebug();
            //}

            this.colliders.push(trapezoidCollider);
        });
    }
}
