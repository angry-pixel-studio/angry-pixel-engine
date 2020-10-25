import RectangleCollider from "../../Core/Collision/Collider/RectangleCollider";
import CollisionManager from "../../Core/Collision/CollisionManager";
import GeometricRenderData, { GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData/GeometricRenderData";
import RenderManager from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { LAYER_DEFAULT } from "../../GameObject";
import Vector2 from "../../Helper/Vector2";
import Rectangle from "../../Libs/Geometric/Shapes/Rectangle";
import Component from "./../../Component";

interface Config {
    tilesData: Rectangle[];
    debug: boolean;
}

export default class TilemapCollider extends Component {
    private collisionManager: CollisionManager = container.getSingleton<CollisionManager>("CollisionManager");
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    public debug: boolean = false;
    private tilesData: Rectangle[] = [];
    private colliders: Array<RectangleCollider> = [];
    private renderData: GeometricRenderData[] = [];

    constructor({ tilesData, debug = false }: Config) {
        super();

        this.tilesData = tilesData;
        this.debug = debug;
    }

    protected start(): void {
        this.tilesData.forEach((tileData) => {
            const collider: RectangleCollider = new RectangleCollider(
                new Vector2(tileData.x, tileData.y),
                tileData.width,
                tileData.height,
                this.gameObject.layer
            );
            this.colliders.push(collider);
            this.collisionManager.addCollider(collider);
            this.renderData.push(new GeometricRenderData());
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: RectangleCollider, index: number) => {
            if (this.debug) {
                this.updateRenderData(this.renderData[index], collider);
                this.renderManager.addToRenderStack(this.renderData[index]);
            }
        });
    }

    private updateRenderData(renderData: GeometricRenderData, collider: RectangleCollider): void {
        renderData.position = collider.coordinates;
        renderData.layer = LAYER_DEFAULT;
        renderData.geometric = collider;
        renderData.geometricType = GEOMETRIC_RECTANGLE;
        renderData.color = "#00FF00";
    }
}
