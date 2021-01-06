import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { LAYER_DEFAULT } from "../../GameObject";
import { TilemapRenderer } from "../Renderer/TilemapRenderer";
import { ColliderComponent } from "./ColliderComponent";
import { TileData } from "../../Core/Tilemap/TileData";
import { ColliderRenderData } from "../../Core/Rendering/RenderData/ColliderRenderData";
import { RenderComponent } from "../../Component";
import { Vector2 } from "../../Math/Vector2";

interface Config {
    tilemapRenderer: TilemapRenderer;
    debug?: boolean;
}

export const TYPE_TILEMAP_COLLIDER: string = "TilemapCollider";

export class TilemapCollider extends ColliderComponent {
    private tilemapRenderer: TilemapRenderer = null;
    private debug: boolean = false;
    private cacheVertex: Vector2[];

    constructor(config: Config) {
        super();

        this.type = TYPE_TILEMAP_COLLIDER;
        this.tilemapRenderer = config.tilemapRenderer;
        this.debug = config.debug ?? this.debug;
        this._physics = true; // todo: fix this shit

        this.cacheVertex = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
    }

    protected start(): void {
        this.tilemapRenderer.tilesData.filter(this.needsCollider).forEach((tileData: TileData) => {
            this.addCollider(
                new RectangleCollider(
                    tileData.position,
                    tileData.width,
                    tileData.height,
                    this._physics,
                    this.gameObject
                )
            );
        });

        if (this.debug) {
            this.gameObject.addComponent(() => new TilemapColliderRenderer(this.colliders));
        }
    }

    private needsCollider = (tileData: TileData): boolean => {
        this.cacheVertex[0].set(tileData.position.x, tileData.position.y + tileData.height);
        this.cacheVertex[1].set(tileData.position.x + tileData.width, tileData.position.y);
        this.cacheVertex[2].set(tileData.position.x, tileData.position.y - tileData.height);
        this.cacheVertex[3].set(tileData.position.x - tileData.width, tileData.position.y);

        for (let i = 0; i < this.cacheVertex.length; i++) {
            if (
                this.tilemapRenderer.tilesData.find((tileData2: TileData) =>
                    tileData2.position.sameAs(this.cacheVertex[i])
                ) === undefined
            ) {
                return true;
            }
        }

        return false;
    };

    protected updatePosition(): void {
        // Tilemap does not update cooliders coordinates;
    }
}

const TYPE_TILEMAP_COLLIDER_RENDERER: string = "TilemapColliderRenderer";

class TilemapColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: ColliderRenderData[] = [];
    private colliders: ICollider[] = [];

    constructor(colliders: ICollider[]) {
        super();

        this.type = TYPE_TILEMAP_COLLIDER_RENDERER;
        this.colliders = colliders;

        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index] = new ColliderRenderData();
            this.renderData[index].debug = true;
            this.renderData[index].layer = LAYER_DEFAULT;
            this.renderData[index].color = "#00FF00";
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index].position = collider.position;
            this.renderData[index].shape = collider.shape;
            this.renderManager.addToRenderStack(this.renderData[index]);
        });
    }
}
