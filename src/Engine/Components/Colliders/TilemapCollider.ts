import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { GeometricRenderData, GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData/GeometricRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { LAYER_DEFAULT } from "../../GameObject";
import { Vector2 } from "../../Helper/Vector2";
import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { TilemapRenderer } from "../Renderer/Tilemap/TilemapRenderer";
import { ColliderComponent } from "./ColliderComponent";

interface Config {
    tilemapRenderer: TilemapRenderer;
    debug?: boolean;
}

export const TYPE_TILEMAP_COLLIDER: string = "TilemapCollider";

export class TilemapCollider extends ColliderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private tilemapRenderer: TilemapRenderer = null;

    public debug: boolean = false;
    private renderData: GeometricRenderData[] = [];

    constructor(config: Config) {
        super();

        this.type = TYPE_TILEMAP_COLLIDER;
        this.tilemapRenderer = config.tilemapRenderer;
        this.debug = config.debug ?? this.debug;
    }

    protected start(): void {
        this.tilemapRenderer.tilesData.forEach((tileData) => {
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
        renderData.debug = true;
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
