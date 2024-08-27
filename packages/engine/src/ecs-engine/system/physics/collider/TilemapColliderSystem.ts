import { ICollider, IPhysicsManager, Polygon } from "../../../../2d-physics";
import { Vector2 } from "../../../../math";
import { TilemapCollider } from "../../../component/collider/TilemapCollider";
import { TilemapRenderer } from "../../../component/renderer/TilemapRenderer";
import { Entity, EntityManager } from "../../../../ecs/EntityManager";
import { System } from "../../../../ecs/SystemManager";

export class TilemapColliderSystem implements System {
    private colliders: Map<Entity, ICollider<Polygon>[]> = new Map();

    constructor(
        private readonly entityManager: EntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {}

    public onEnable(): void {
        this.colliders.clear();
    }

    public onUpdate(): void {
        this.entityManager.search(TilemapCollider).forEach(({ entity, component: tilemapCollider }) => {
            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);

            if (!tilemapRenderer || tilemapRenderer.data.length === 0) return;

            if (!this.colliders.has(entity)) {
                if (tilemapCollider.composite) this.useLineColliders(entity, tilemapCollider, tilemapRenderer);
                else this.useBoxColliders(entity, tilemapCollider, tilemapRenderer);
            }

            this.colliders.get(entity).forEach((collider) => this.physicsManager.addCollider(entity, collider));
        });
    }

    private useBoxColliders(entity: Entity, { layer }: TilemapCollider, tilemapRenderer: TilemapRenderer): void {
        this.colliders.set(entity, []);

        tilemapRenderer.data.forEach((tile, index) => {
            if (!this.needsCollider(tile, index, tilemapRenderer)) return;

            this.colliders.get(entity).push({
                entity: undefined,
                id: undefined,
                layer,
                shape: new Polygon(this.generateRectangleVertices(index, tilemapRenderer)),
                updateCollisions: false,
                physics: false,
                offset: new Vector2(),
                ignoreCollisionsWithLayers: undefined,
            });
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

    private useLineColliders(entity: Entity, { layer }: TilemapCollider, tilemapRenderer: TilemapRenderer): void {
        this.colliders.set(entity, []);

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
                    this.addLineCollider(start, end, entity, layer, tilemapRenderer);
                    start = undefined;
                    end = undefined;
                }

                if (hVertices[y][x]) {
                    if (!start) start = new Vector2(x, y);
                    end = new Vector2(x + 1, y);
                }
            }
        }

        if (start && end) this.addLineCollider(start, end, entity, layer, tilemapRenderer);

        start = undefined;
        end = undefined;

        for (let x = 0; x <= tilemapRenderer.width; x++) {
            for (let y = 0; y < vVertices.length; y++) {
                if (!vVertices[y]) continue;

                if (start && end && (x !== end.x || !vVertices[y][x])) {
                    this.addLineCollider(start, end, entity, layer, tilemapRenderer);
                    start = undefined;
                    end = undefined;
                }

                if (vVertices[y][x]) {
                    if (!start) start = new Vector2(x, y);
                    end = new Vector2(x, y + 1);
                }
            }
        }

        if (start && end) this.addLineCollider(start, end, entity, layer, tilemapRenderer);
    }

    private hasTile(index: number, { data }: TilemapRenderer): boolean {
        return index !== undefined && data[index] && data[index] > 0;
    }

    private addLineCollider(
        start: Vector2,
        end: Vector2,
        entity: Entity,
        layer: string,
        { width, height, tileWidth, tileHeight }: TilemapRenderer,
    ): void {
        start.x = -(width * tileWidth) / 2 + start.x * tileWidth;
        start.y = (height * tileHeight) / 2 - start.y * tileHeight;

        end.x = -(width * tileWidth) / 2 + end.x * tileWidth;
        end.y = (height * tileHeight) / 2 - end.y * tileHeight;

        this.colliders.get(entity).push({
            entity: undefined,
            id: undefined,
            layer,
            shape: new Polygon([new Vector2(start.x, start.y), new Vector2(end.x, end.y)]),
            updateCollisions: false,
            physics: true, // TODO: let change this
            offset: new Vector2(),
            ignoreCollisionsWithLayers: undefined,
        });
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
