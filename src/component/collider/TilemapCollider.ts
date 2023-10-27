import { ITilemapRenderer } from "../rendering/TilemapRenderer";
import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { InitOptions } from "../../core/GameActor";
import {
    IGeometricRenderData,
    GeometricShape,
    RenderDataType,
    RenderLocation,
    TilemapOrientation,
} from "angry-pixel-2d-renderer";
import { Vector2 } from "angry-pixel-math";
import { ICollider, Line, Polygon, Rectangle } from "angry-pixel-2d-physics";

export interface TilemapColliderOptions extends InitOptions {
    tilemapRenderer: ITilemapRenderer;
    composite?: boolean;
    layer?: string;
    debug?: boolean;
}

export class TilemapCollider extends BaseCollider {
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
        this.debug = (config.debug ?? this.debug) && this.gameConfig.debugEnabled;
        this.physics = true; // todo: fix this shit
        this.composite = config.composite ?? false;

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
                this.physicsManager.addCollider({
                    layer: this.layer ?? this.gameObject.layer,
                    position: new Vector2(
                        this.position.x + ((index % this.tilemapRenderer.width) + 0.5) * this.scaledTileWidth,
                        this.position.y - (Math.floor(index / this.tilemapRenderer.width) + 0.5) * this.scaledTileHeight
                    ),
                    shape: new Rectangle(this.scaledTileWidth, this.scaledTileHeight),
                    updateCollisions: false,
                    physics: this.physics,
                    group: this.gameObject.id.toString(),
                })
            );
        });
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
            // up
            if (!this.hasTile(neighbors[0])) {
                hVertices[y][x] = true;
            }
            // down
            if (!this.hasTile(neighbors[2])) {
                hVertices[y + 1][x] = true;
            }
            // left
            if (!this.hasTile(neighbors[1])) {
                vVertices[y][x] = true;
            }
            // right
            if (!this.hasTile(neighbors[3])) {
                vVertices[y][x + 1] = true;
            }
        });

        let start: Vector2;
        let end: Vector2;

        for (let y = 0; y < hVertices.length; y++) {
            if (!hVertices[y]) continue;

            for (let x = 0; x < hVertices[y].length; x++) {
                if (start && end && (y !== end.y || !hVertices[y][x])) {
                    this.addLineCollider(start, end);
                    start = undefined;
                    end = undefined;
                }

                if (hVertices[y][x]) {
                    if (!start) start = new Vector2(x, y);
                    end = new Vector2(x + 1, y);
                }
            }
        }

        if (start && end) this.addLineCollider(start, end);

        start = undefined;
        end = undefined;

        for (let x = 0; x <= this.tilemapRenderer.width; x++) {
            for (let y = 0; y < vVertices.length; y++) {
                if (!vVertices[y]) continue;

                if (start && end && (x !== end.x || !vVertices[y][x])) {
                    this.addLineCollider(start, end);
                    start = undefined;
                    end = undefined;
                }

                if (vVertices[y][x]) {
                    if (!start) start = new Vector2(x, y);
                    end = new Vector2(x, y + 1);
                }
            }
        }

        if (start && end) this.addLineCollider(start, end);
    }

    private hasTile(index: number): boolean {
        return index !== undefined && this.tilemapRenderer.tiles[index] && this.tilemapRenderer.tiles[index] > 0;
    }

    private addLineCollider(start: Vector2, end: Vector2): void {
        const collider = this.physicsManager.addCollider({
            layer: this.layer ?? this.gameObject.layer,
            position: this.position.clone(),
            shape: new Line([
                new Vector2(start.x * this.scaledTileWidth, start.y * -this.scaledTileHeight),
                new Vector2(end.x * this.scaledTileWidth, end.y * -this.scaledTileHeight),
            ]),
            updateCollisions: false,
            physics: this.physics,
            group: this.gameObject.id.toString(),
        });

        this.colliders.push(collider);
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

    protected updateRealSize(): void {
        // do nothing
    }

    protected updatePosition(): void {
        // do nothing
    }

    protected updateColliders(): void {
        this.colliders.forEach((collider) => (collider.layer = this.layer ?? this.gameObject.layer));
    }
}

class TilemapColliderRenderer extends RenderComponent {
    private renderData: IGeometricRenderData[] = [];
    private colliders: ICollider[] = [];

    protected init({ colliders }: { colliders: ICollider[] }): void {
        this.colliders = colliders;

        this.colliders.forEach((collider: ICollider, index: number) => {
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
        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].position.copy(collider.shape.position);
            this.renderData[index].rotation = collider.rotation;
            this.renderData[index].vertexModel = (collider.shape as Polygon).vertexModel;

            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
