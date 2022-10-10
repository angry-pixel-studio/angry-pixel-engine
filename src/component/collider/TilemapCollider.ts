import { container, GameConfig } from "../../core/Game";
import { ITilemapRenderer } from "../rendering/TilemapRenderer";
import { Collider } from "./Collider";
import { RigidBody } from "../RigidBody";
import { RenderComponent } from "../../core/Component";
import { ColliderData } from "../../physics/collision/ColliderData";
import { Rectangle } from "../../physics/collision/shape/Rectangle";
import { InitOptions } from "../../core/GameActor";
import {
    IRenderManager,
    IGeometricRenderData,
    GeometricShape,
    RenderDataType,
    RenderLocation,
    TilemapOrientation,
} from "angry-pixel-2d-renderer";
import { Vector2 } from "angry-pixel-math";
import { Line } from "../../physics/collision/shape/Line";

export interface TilemapColliderOptions extends InitOptions {
    tilemapRenderer: ITilemapRenderer;
    composite?: boolean;
    layer?: string;
    debug?: boolean;
}

export class TilemapCollider extends Collider {
    private tilemapRenderer: ITilemapRenderer;
    private debug: boolean = false;
    private composite: boolean;

    // cache
    private scaledWidth: number;
    private scaledHeight: number;
    private scaledTileWidth: number;
    private scaledTileHeight: number;
    private position: Vector2 = new Vector2();

    protected init(config: TilemapColliderOptions): void {
        this.tilemapRenderer = config.tilemapRenderer;
        this.layer = config.layer;
        this.debug = (config.debug ?? this.debug) && container.getConstant<GameConfig>("GameConfig").debugEnabled;
        this.physics = true; // todo: fix this shit
        this.composite = config.composite ?? false;
    }

    protected start(): void {
        this.layer = this.layer ?? this.gameObject.layer;

        this.scaledTileWidth = this.tilemapRenderer.tileWidth * this.gameObject.transform.scale.x;
        this.scaledTileHeight = this.tilemapRenderer.tileHeight * this.gameObject.transform.scale.y;
        this.scaledWidth = this.tilemapRenderer.width * this.scaledTileWidth;
        this.scaledHeight = this.tilemapRenderer.height * this.scaledTileHeight;

        this.position.set(
            this.gameObject.transform.position.x +
                (this.tilemapRenderer.orientation === TilemapOrientation.Center ? -this.scaledWidth / 2 : 0),
            this.gameObject.transform.position.y +
                ([TilemapOrientation.Center, TilemapOrientation.RightCenter].includes(this.tilemapRenderer.orientation)
                    ? this.scaledHeight / 2
                    : this.tilemapRenderer.orientation == TilemapOrientation.RightUp
                    ? this.scaledHeight
                    : 0)
        );

        this.composite ? this.useLineColliders() : this.useBoxColliders();

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(TilemapColliderRenderer, { colliders: this.colliders });
        }
    }

    private useBoxColliders(): void {
        this.tilemapRenderer.tiles.forEach((tile, index) => {
            if (!this.needsCollider(tile, index)) return;

            this.colliders.push(
                new ColliderData(
                    new Rectangle(
                        this.scaledTileWidth,
                        this.scaledTileHeight,
                        new Vector2(
                            this.position.x + ((index % this.tilemapRenderer.width) + 0.5) * this.scaledTileWidth,
                            this.position.y -
                                (Math.floor(index / this.tilemapRenderer.width) + 0.5) * this.scaledTileHeight
                        )
                    ),
                    this.layer,
                    this.gameObject.id,
                    false,
                    this.physics,
                    this.hasComponent(RigidBody)
                )
            );
        });
    }

    private useLineColliders(): void {
        const hVertices: boolean[][] = [];
        const vVertices: boolean[][] = [];

        this.tilemapRenderer.tiles.forEach((tile, index) => {
            if (tile === 0) return;

            const x = index % this.tilemapRenderer.width;
            const y = Math.floor(index / this.tilemapRenderer.width);

            if (!hVertices[y]) hVertices[y] = [];
            if (!hVertices[y + 1]) hVertices[y + 1] = [];
            if (!vVertices[y]) vVertices[y] = [];
            if (!vVertices[y + 1]) vVertices[y + 1] = [];

            const neighbors = this.getNeighbors(index);

            if (!this.hasTile(neighbors[0])) {
                hVertices[y][x] = true;
                hVertices[y][x + 1] = true;
            }

            if (!this.hasTile(neighbors[2])) {
                hVertices[y + 1][x] = true;
                hVertices[y + 1][x + 1] = true;
            }

            if (!this.hasTile(neighbors[1])) {
                vVertices[y][x] = true;
                vVertices[y + 1][x] = true;
            }

            if (!this.hasTile(neighbors[3])) {
                vVertices[y][x + 1] = true;
                vVertices[y + 1][x + 1] = true;
            }
        });

        let start: Vector2;
        let end: Vector2;

        for (let y = 0; y < hVertices.length; y++) {
            for (let x = 0; x < hVertices[y].length; x++) {
                if (start && end && (y * -this.scaledTileHeight !== end.y || !hVertices[y][x])) {
                    this.addLineCollider(start, end);
                    start = undefined;
                    end = undefined;
                }

                if (hVertices[y][x]) {
                    !start
                        ? (start = new Vector2(x * this.scaledTileWidth, y * -this.scaledTileHeight))
                        : (end = new Vector2(x * this.scaledTileWidth, y * -this.scaledTileHeight));
                }
            }
        }

        if (start && end) {
            this.addLineCollider(start, end);
        }

        start = undefined;
        end = undefined;

        for (let x = 0; x <= this.tilemapRenderer.width; x++) {
            for (let y = 0; y < vVertices.length; y++) {
                if (start && end && (x * this.scaledTileWidth !== end.x || !vVertices[y][x])) {
                    this.addLineCollider(start, end);
                    start = undefined;
                    end = undefined;
                }

                if (vVertices[y][x]) {
                    !start
                        ? (start = new Vector2(x * this.scaledTileWidth, y * -this.scaledTileHeight))
                        : (end = new Vector2(x * this.scaledTileWidth, y * -this.scaledTileHeight));
                }
            }
        }

        if (start && end) {
            this.addLineCollider(start, end);
        }
    }

    private hasTile(index: number): boolean {
        return index !== undefined && this.tilemapRenderer.tiles[index] && this.tilemapRenderer.tiles[index] > 0;
    }

    private addLineCollider(start: Vector2, end: Vector2): void {
        const collider = new ColliderData(
            new Line([start.clone(), end.clone()]),
            this.layer,
            this.gameObject.id,
            false,
            this.physics,
            this.hasComponent(RigidBody)
        );
        collider.shape.position = this.position;
        collider.shape.update();

        this.colliders.push(collider);
    }

    private needsCollider(tile: number, index: number): boolean {
        return (
            tile !== 0 &&
            this.getNeighbors(index).some(
                (neighbor) =>
                    !neighbor || !this.tilemapRenderer.tiles[neighbor] || this.tilemapRenderer.tiles[neighbor] === 0
            )
        );
    }

    private getNeighbors(index: number): number[] {
        // up - left - down - right
        return [
            index - this.tilemapRenderer.width >= 0 ? index - this.tilemapRenderer.width : undefined,
            index % this.tilemapRenderer.width > 0 ? index - 1 : undefined,
            index + this.tilemapRenderer.width <= this.tilemapRenderer.width * this.tilemapRenderer.height
                ? index + this.tilemapRenderer.width
                : undefined,
            index % this.tilemapRenderer.width < this.tilemapRenderer.width - 1 ? index + 1 : undefined,
        ];
    }

    protected update(): void {
        this.colliders.forEach((collider) => (collider.layer = this.layer));
        super.update();
    }
}

class TilemapColliderRenderer extends RenderComponent {
    private renderManager: IRenderManager = container.getSingleton<IRenderManager>("RenderManager");

    private renderData: IGeometricRenderData[] = [];
    private colliders: ColliderData[] = [];

    protected init({ colliders }: { colliders: ColliderData[] }): void {
        this.colliders = colliders;

        this.colliders.forEach((collider: ColliderData, index: number) => {
            this.renderData[index] = {
                type: RenderDataType.Geometric,
                layer: this.gameObject.layer,
                location: RenderLocation.WorldSpace,
                position: new Vector2(),
                shape: GeometricShape.Polygon,
                color: "#00FF00",
            };
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ColliderData, index: number) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].position.copy(collider.shape.position);
            this.renderData[index].rotation = collider.shape.angle;
            this.renderData[index].vertexModel = collider.shape.vertexModel;

            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
