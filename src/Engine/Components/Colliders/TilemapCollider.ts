import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { LAYER_DEFAULT } from "../../GameObject";
import { TilemapRenderer } from "../Renderer/Tilemap/TilemapRenderer";
import { ColliderComponent } from "./ColliderComponent";
import { TileData } from "../Renderer/Tilemap/TileData";
import { ColliderRenderData } from "../../Core/Rendering/RenderData/ColliderRenderData";

interface Config {
    tilemapRenderer: TilemapRenderer;
    debug?: boolean;
}

export const TYPE_TILEMAP_COLLIDER: string = "TilemapCollider";

export class TilemapCollider extends ColliderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private tilemapRenderer: TilemapRenderer = null;

    public debug: boolean = false;
    private renderData: ColliderRenderData[] = [];

    constructor(config: Config) {
        super();

        this.type = TYPE_TILEMAP_COLLIDER;
        this.tilemapRenderer = config.tilemapRenderer;
        this.debug = config.debug ?? this.debug;
        this._physics = true; // todo: fix this shit
    }

    protected start(): void {
        this.tilemapRenderer.tilesData.forEach((tileData: TileData) => {
            this.addCollider(
                new RectangleCollider(
                    tileData.position,
                    tileData.width,
                    tileData.height,
                    this._physics,
                    this.gameObject
                )
            );
            this.renderData.push(new ColliderRenderData());
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

    private updateRenderData(renderData: ColliderRenderData, collider: ICollider): void {
        renderData.debug = true;
        renderData.position = collider.position;
        renderData.layer = LAYER_DEFAULT;
        renderData.shape = collider.shape;
        renderData.color = "#00FF00";
    }

    protected updatePosition(): void {
        // Tilemap does not update cooliders coordinates;
    }
}
