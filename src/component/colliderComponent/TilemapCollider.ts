import { ICollider } from "../../physics/collision/collider/ICollider";
import { RectangleCollider } from "../../physics/collision/collider/RectangleCollider";
import { RenderManager } from "../../rendering/RenderManager";
import { container, GameConfig } from "../../core/Game";
import { TilemapRenderer } from "../renderingComponent/tilemap/TilemapRenderer";
import { AbstractColliderComponent } from "./AbstractColliderComponent";
import { TileData } from "../renderingComponent/tilemap/TileData";
import { ColliderRenderData } from "../../rendering/renderData/ColliderRenderData";
import { RenderComponent } from "../../core/Component";
import { Vector2 } from "../../math/Vector2";
import { ComponentTypes } from "../ComponentTypes";

export interface TilemapColliderConfig {
    tilemapRenderer: TilemapRenderer;
    debug?: boolean;
}

export class TilemapCollider extends AbstractColliderComponent {
    private tilemapRenderer: TilemapRenderer = null;
    private debug: boolean = false;
    private cacheVertex: Vector2[];

    constructor(config: TilemapColliderConfig) {
        super();

        this.type = ComponentTypes.TilemapCollider;
        this.tilemapRenderer = config.tilemapRenderer;
        this.debug = (config.debug ?? this.debug) && container.getConstant<GameConfig>("GameConfig").debugEnabled;
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
                    this.gameObject,
                    0,
                    false
                )
            );
        });

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(() => new TilemapColliderRenderer(this.colliders));
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
                    tileData2.position.equals(this.cacheVertex[i])
                ) === undefined
            ) {
                return true;
            }
        }

        return false;
    };

    protected updatePosition(): void {
        // Tilemap does not update colliders coordinates;
    }
}

class TilemapColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: ColliderRenderData[] = [];
    private colliders: ICollider[] = [];

    constructor(colliders: ICollider[]) {
        super();

        this.type = "TilemapColliderRenderer";
        this.colliders = colliders;

        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index] = new ColliderRenderData();
            this.renderData[index].debug = true;
            this.renderData[index].color = "#00FF00";
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].position = collider.position;
            this.renderData[index].shape = collider.shape;
            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
