import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { GeometricRenderData, GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData/GeometricRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { LAYER_DEFAULT } from "../../GameObject";
import { Vector2 } from "../../Helper/Vector2";
import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { ColliderComponent } from "./ColliderComponent";

interface Config {
    tilesData: Rectangle[];
    debug: boolean;
}

export class TilemapCollider extends ColliderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    public debug: boolean = false;
    private tilesData: Rectangle[] = [];
    private renderData: GeometricRenderData[] = [];

    constructor({ tilesData, debug = false }: Config) {
        super();

        this.tilesData = tilesData;
        this.debug = debug;
    }

    protected start(): void {
        this.tilesData.forEach((tileData) => {
            this.addCollider(
                new RectangleCollider(
                    new Vector2(tileData.x, tileData.y),
                    tileData.width,
                    tileData.height,
                    this.gameObject
                )
            );
            this.renderData.push(new GeometricRenderData());
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ICollider, index: number) => {
            if (this.debug) {
                this.updateRenderData(this.renderData[index], collider);
                this.renderManager.addToRenderStack(this.renderData[index]);
            }
        });
    }

    private updateRenderData(renderData: GeometricRenderData, collider: ICollider): void {
        renderData.position = collider.coordinates;
        renderData.layer = LAYER_DEFAULT;
        renderData.geometric = collider;
        renderData.geometricType = GEOMETRIC_RECTANGLE;
        renderData.color = "#00FF00";
    }

    protected updateCoordinates(): void {
        // Tilemap does not update cooliders coordinates;
    }
}
