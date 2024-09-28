import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { Vector2 } from "@math";
import { Polygon } from "@physics2d";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systems";
import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { TilemapCollider } from "@component/physics2d/TilemapCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";

@injectable(SYSTEMS.UpdateTilemapColliderShapeSystem)
export class UpdateTilemapColliderShapeSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        this.entityManager.search(TilemapCollider).forEach(({ component: tilemapCollider, entity }) => {
            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);

            if (!tilemapRenderer || tilemapRenderer.data.length === 0) return;

            if (tilemapCollider.shapes.length === 0) {
                if (tilemapCollider.composite) this.useEdges(tilemapCollider, tilemapRenderer);
                else this.useBoxes(tilemapCollider, tilemapRenderer);
            }

            for (const shape of tilemapCollider.shapes) {
                this.updatePositionAndVertices(
                    shape,
                    tilemapCollider.offset,
                    this.entityManager.getComponent(entity, Transform),
                );
                this.updateBoundingBox(shape);
                this.updateProjectionAxes(shape);
            }
        });
    }

    private useBoxes(tilemapCollider: TilemapCollider, tilemapRenderer: TilemapRenderer): void {
        tilemapCollider.shapes = [];

        tilemapRenderer.data.forEach((tile, index) => {
            if (!this.needsCollider(tile, index, tilemapRenderer)) return;

            const shape = new Polygon(this.generateRectangleVertices(index, tilemapRenderer));
            shape.updateCollisions = false;
            tilemapCollider.shapes.push(shape);
        });
    }

    private generateRectangleVertices(
        index: number,
        { width, height, tileWidth, tileHeight }: TilemapRenderer,
    ): Vector2[] {
        const x = -(width * tileWidth) / 2 + (index % width) * tileWidth;
        const y = (height * tileHeight) / 2 - Math.floor(index / width) * tileHeight;

        return [
            new Vector2(x, y - tileHeight),
            new Vector2(x, y),
            new Vector2(x + tileWidth, y),
            new Vector2(x + tileWidth, y - tileHeight),
        ];
    }

    private needsCollider(tile: number, index: number, { data, width, height }: TilemapRenderer): boolean {
        return (
            tile !== 0 &&
            this.getNeighbors(index, width, height).some(
                (neighbor) => !neighbor || !data[neighbor] || data[neighbor] === 0,
            )
        );
    }

    private useEdges(tilemapCollider: TilemapCollider, tilemapRenderer: TilemapRenderer): void {
        tilemapCollider.shapes = [];

        const hVertices: boolean[][] = [];
        const vVertices: boolean[][] = [];

        tilemapRenderer.data.forEach((tile, index) => {
            if (tile === 0) return;

            const x = index % tilemapRenderer.width;
            const y = Math.floor(index / tilemapRenderer.width);

            if (!hVertices[y]) hVertices[y] = [];
            if (!hVertices[y + 1]) hVertices[y + 1] = [];
            if (!vVertices[y]) vVertices[y] = [];
            if (!vVertices[y + 1]) vVertices[y + 1] = [];

            const neighbors = this.getNeighbors(index, tilemapRenderer.width, tilemapRenderer.height);
            // up
            if (!this.hasTile(neighbors[0], tilemapRenderer)) {
                hVertices[y][x] = true;
            }
            // down
            if (!this.hasTile(neighbors[2], tilemapRenderer)) {
                hVertices[y + 1][x] = true;
            }
            // left
            if (!this.hasTile(neighbors[1], tilemapRenderer)) {
                vVertices[y][x] = true;
            }
            // right
            if (!this.hasTile(neighbors[3], tilemapRenderer)) {
                vVertices[y][x + 1] = true;
            }
        });

        let start: Vector2;
        let end: Vector2;

        for (let y = 0; y < hVertices.length; y++) {
            if (!hVertices[y]) continue;

            for (let x = 0; x < hVertices[y].length; x++) {
                if (start && end && (y !== end.y || !hVertices[y][x])) {
                    tilemapCollider.shapes.push(this.createEdge(start, end, tilemapRenderer));
                    start = undefined;
                    end = undefined;
                }

                if (hVertices[y][x]) {
                    if (!start) start = new Vector2(x, y);
                    end = new Vector2(x + 1, y);
                }
            }
        }

        if (start && end) tilemapCollider.shapes.push(this.createEdge(start, end, tilemapRenderer));

        start = undefined;
        end = undefined;

        for (let x = 0; x <= tilemapRenderer.width; x++) {
            for (let y = 0; y < vVertices.length; y++) {
                if (!vVertices[y]) continue;

                if (start && end && (x !== end.x || !vVertices[y][x])) {
                    tilemapCollider.shapes.push(this.createEdge(start, end, tilemapRenderer));
                    start = undefined;
                    end = undefined;
                }

                if (vVertices[y][x]) {
                    if (!start) start = new Vector2(x, y);
                    end = new Vector2(x, y + 1);
                }
            }
        }

        if (start && end) tilemapCollider.shapes.push(this.createEdge(start, end, tilemapRenderer));
    }

    private hasTile(index: number, { data }: TilemapRenderer): boolean {
        return index !== undefined && data[index] && data[index] > 0;
    }

    private createEdge(
        start: Vector2,
        end: Vector2,
        { width, height, tileWidth, tileHeight }: TilemapRenderer,
    ): Polygon {
        start.x = -(width * tileWidth) / 2 + start.x * tileWidth;
        start.y = (height * tileHeight) / 2 - start.y * tileHeight;

        end.x = -(width * tileWidth) / 2 + end.x * tileWidth;
        end.y = (height * tileHeight) / 2 - end.y * tileHeight;

        const shape = new Polygon([new Vector2(start.x, start.y), new Vector2(end.x, end.y)]);
        shape.updateCollisions = false;

        return shape;
    }

    private getNeighbors(index: number, width: number, height: number): number[] {
        // up - left - down - right
        return [
            index - width >= 0 ? index - width : undefined,
            index % width > 0 ? index - 1 : undefined,
            index + width <= width * height ? index + width : undefined,
            index % width < width - 1 ? index + 1 : undefined,
        ];
    }
}
