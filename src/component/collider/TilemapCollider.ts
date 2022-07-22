import { RenderManager } from "../../rendering/RenderManager";
import { container, GameConfig } from "../../core/Game";
import { TilemapRenderer } from "../rendering/tilemap/TilemapRenderer";
import { Collider } from "./Collider";
import { TileData } from "../rendering/tilemap/TileData";
import { GeometricRenderData, GeometricShape } from "../../rendering/renderData/GeometricRenderData";
import { RenderComponent } from "../../core/Component";
import { Vector2 } from "../../math/Vector2";
import { ColliderData } from "../../physics/collision/ColliderData";
import { Rectangle } from "../../physics/collision/shape/Rectangle";
import { InitOptions } from "../../core/GameActor";
import { RigidBody } from "../RigidBody";

export interface TilemapColliderOptions extends InitOptions {
    tilemapRenderer: TilemapRenderer;
    layer?: string;
    debug?: boolean;
}

export class TilemapCollider extends Collider {
    private tilemapRenderer: TilemapRenderer;
    private debug: boolean = false;
    private cacheVertex: Vector2[];

    protected init(config: TilemapColliderOptions): void {
        this.tilemapRenderer = config.tilemapRenderer;
        this.layer = config.layer;
        this.debug = (config.debug ?? this.debug) && container.getConstant<GameConfig>("GameConfig").debugEnabled;
        this.physics = true; // todo: fix this shit

        this.cacheVertex = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
    }

    protected start(): void {
        this.layer = this.layer ?? this.gameObject.layer;

        this.tilemapRenderer.tilesData
            .filter(this.needsCollider)
            .forEach((tileData: TileData) =>
                this.colliders.push(
                    new ColliderData(
                        new Rectangle(tileData.width, tileData.height, tileData.position),
                        this.layer,
                        this.gameObject.id,
                        false,
                        this.physics,
                        this.hasComponent(RigidBody)
                    )
                )
            );

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(TilemapColliderRenderer, { colliders: this.colliders });
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

    protected update(): void {
        this.colliders.forEach((collider) => (collider.layer = this.layer));
        super.update();
    }
}

class TilemapColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: GeometricRenderData[] = [];
    private colliders: ColliderData[] = [];

    protected config({ colliders }: { colliders: ColliderData[] }): void {
        this.colliders = colliders;

        this.colliders.forEach((collider: ColliderData, index: number) => {
            this.renderData[index] = new GeometricRenderData();
            this.renderData[index].debug = true;
            this.renderData[index].color = "#00FF00";
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ColliderData, index: number) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].shape = GeometricShape.Polygon;
            this.renderData[index].position = collider.shape.position;
            this.renderData[index].angle = collider.shape.angle;
            this.renderData[index].boundingBox = collider.shape.boundingBox;
            this.renderData[index].vertexModel = collider.shape.vertexModel;

            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
