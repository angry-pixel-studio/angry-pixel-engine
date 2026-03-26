import { Rectangle, Vector2 } from "@angry-pixel/math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";

const MAX_COLLIDERS_PER_CELL = 16;

const cell = (value: number, min: number, width: number, subdivisions: number): number =>
    Math.min(((value - min) / width) | 0, subdivisions - 1);

type Coordinates = { x0: number; x1: number; y0: number; y1: number };

@injectable(SYMBOLS.CollisionBroadphaseResolver)
export class SpartialGrid implements BroadPhaseResolver {
    private area: Rectangle = new Rectangle();
    private grid: number[][][] = [];
    private rects: Map<number, Rectangle> = new Map();
    private cellWidth: number;
    private cellHeight: number;
    private subdivisions: number = 0;

    private lastAreaX = NaN;
    private lastAreaY = NaN;
    private lastAreaW = NaN;
    private lastAreaH = NaN;
    private lastSubdivisions = -1;

    /** Dedupe in retrieve: generation stamp per id index */
    private seenGen: number[] = [];
    private retrieveSerial = 0;
    private readonly retrieveResult: number[] = [];

    // cache
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();
    private coordinates: Coordinates = { x0: 0, x1: 0, y0: 0, y1: 0 };

    public update(shapes: Shape[]): void {
        if (shapes.length === 0) {
            this.rects.clear();
            if (this.grid.length > 0) {
                this.clearGridCells();
            }
            return;
        }

        this.resize(shapes);
        this.ensureSeenCapacity(shapes.length);

        shapes.forEach(({ id, boundingBox }) => this.insert(id, boundingBox));
    }

    private ensureSeenCapacity(shapeCount: number): void {
        if (this.seenGen.length < shapeCount) {
            const start = this.seenGen.length;
            this.seenGen.length = shapeCount;
            this.seenGen.fill(0, start, shapeCount);
        }
    }

    private clearGridCells(): void {
        for (let x = 0; x < this.subdivisions; x++) {
            for (let y = 0; y < this.subdivisions; y++) {
                this.grid[x][y].length = 0;
            }
        }
    }

    private resize(shapes: Shape[]): void {
        this.minArea.set(Infinity, Infinity);
        this.maxArea.set(-Infinity, -Infinity);

        shapes.forEach(({ boundingBox: box }) => {
            this.minArea.set(Math.min(box.x, this.minArea.x), Math.min(box.y, this.minArea.y));
            this.maxArea.set(Math.max(box.x1, this.maxArea.x), Math.max(box.y1, this.maxArea.y));
        });

        const ax = this.minArea.x;
        const ay = this.minArea.y;
        const aw = this.maxArea.x - this.minArea.x;
        const ah = this.maxArea.y - this.minArea.y;

        this.area.set(ax, ay, aw, ah);

        const newSubdivisions = ((shapes.length / MAX_COLLIDERS_PER_CELL) | 0) + 1;

        this.cellWidth = Math.ceil(this.area.width / newSubdivisions);
        this.cellHeight = Math.ceil(this.area.height / newSubdivisions);

        const reuse =
            this.grid.length > 0 &&
            newSubdivisions === this.lastSubdivisions &&
            ax === this.lastAreaX &&
            ay === this.lastAreaY &&
            aw === this.lastAreaW &&
            ah === this.lastAreaH;

        if (reuse) {
            this.clearGridCells();
        } else {
            this.subdivisions = newSubdivisions;
            this.buildGrid();
            this.lastSubdivisions = newSubdivisions;
            this.lastAreaX = ax;
            this.lastAreaY = ay;
            this.lastAreaW = aw;
            this.lastAreaH = ah;
        }

        this.subdivisions = newSubdivisions;
        this.rects.clear();
    }

    private buildGrid(): void {
        this.grid = [];
        for (let x = 0; x < this.subdivisions; x++) {
            this.grid[x] = [];

            for (let y = 0; y < this.subdivisions; y++) {
                this.grid[x][y] = [];
            }
        }
    }

    private insert(id: number, box: Rectangle): void {
        this.updateCoordinates(box);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                this.grid[x][y].push(id);
            }
        }

        this.rects.set(id, box);
    }

    public retrieve(box: Rectangle): number[] {
        this.retrieveResult.length = 0;
        if (++this.retrieveSerial === 0x7fffffff) {
            this.retrieveSerial = 1;
            this.seenGen.fill(0);
        }

        this.updateCoordinates(box);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                const cellIds = this.grid[x][y];
                for (let i = 0, len = cellIds.length; i < len; i++) {
                    const id = cellIds[i];
                    if (this.rects.get(id)!.intersects(box)) {
                        if (this.seenGen[id] !== this.retrieveSerial) {
                            this.seenGen[id] = this.retrieveSerial;
                            this.retrieveResult.push(id);
                        }
                    }
                }
            }
        }

        return this.retrieveResult;
    }

    private updateCoordinates(area: Rectangle): void {
        this.coordinates.x0 = cell(area.x, this.area.x, this.cellWidth, this.subdivisions);
        this.coordinates.x1 = cell(area.x1, this.area.x, this.cellWidth, this.subdivisions);
        this.coordinates.y0 = cell(area.y, this.area.y, this.cellHeight, this.subdivisions);
        this.coordinates.y1 = cell(area.y1, this.area.y, this.cellHeight, this.subdivisions);
    }
}
