import { Rectangle } from "@angry-pixel/math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";

const cell = (value: number, min: number, size: number, count: number): number => {
    const index = ((value - min) / size) | 0;
    return index < 0 ? 0 : index >= count ? count - 1 : index;
};

type Coordinates = { x0: number; x1: number; y0: number; y1: number };

@injectable(SYMBOLS.CollisionBroadphaseResolver)
export class SpatialGrid implements BroadPhaseResolver {
    private area: Rectangle = new Rectangle();
    private cells: number[][] = [[]];
    private usedCells: number[] = [];
    private boxes: Rectangle[] = [];
    private columns: number = 1;
    private rows: number = 1;
    private cellWidth: number = 0;
    private cellHeight: number = 0;

    /** Dedupe in retrieve: generation stamp per id index */
    private seenGen: number[] = [];
    private retrieveSerial = 0;
    private readonly retrieveResult: number[] = [];

    // cache
    private coordinates: Coordinates = { x0: 0, x1: 0, y0: 0, y1: 0 };

    public update(shapes: Shape[]): void {
        this.clearCells();
        this.boxes.length = 0;

        if (shapes.length === 0) {
            return;
        }

        this.resize(shapes);
        this.ensureSeenCapacity(shapes.length);

        for (let i = 0; i < shapes.length; i++) {
            this.insert(shapes[i].id, shapes[i].boundingBox);
        }
    }

    private ensureSeenCapacity(shapeCount: number): void {
        if (this.seenGen.length < shapeCount) {
            const start = this.seenGen.length;
            this.seenGen.length = shapeCount;
            this.seenGen.fill(0, start, shapeCount);
        }
    }

    private clearCells(): void {
        for (let i = 0; i < this.usedCells.length; i++) {
            this.cells[this.usedCells[i]].length = 0;
        }
        this.usedCells.length = 0;
    }

    private resize(shapes: Shape[]): void {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let extentSum = 0;

        for (let i = 0; i < shapes.length; i++) {
            const box = shapes[i].boundingBox;
            minX = Math.min(minX, box.x);
            minY = Math.min(minY, box.y);
            maxX = Math.max(maxX, box.x1);
            maxY = Math.max(maxY, box.y1);
            extentSum += Math.max(box.width, box.height);
        }

        const width = maxX - minX;
        const height = maxY - minY;
        const count = shapes.length;

        this.area.set(minX, minY, width, height);

        // at least the average shape size, and at most about one cell per shape
        const cellSize =
            Math.max(Math.sqrt((width * height) / count), Math.max(width, height) / count, extentSum / count) || 1;

        this.columns = Math.ceil(width / cellSize) || 1;
        this.rows = Math.ceil(height / cellSize) || 1;
        this.cellWidth = width / this.columns;
        this.cellHeight = height / this.rows;

        for (let i = this.cells.length, total = this.columns * this.rows; i < total; i++) {
            this.cells.push([]);
        }
    }

    private insert(id: number, box: Rectangle): void {
        this.updateCoordinates(box);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                const index = x * this.rows + y;
                if (this.cells[index].length === 0) {
                    this.usedCells.push(index);
                }
                this.cells[index].push(id);
            }
        }

        this.boxes[id] = box;
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
                const cellIds = this.cells[x * this.rows + y];
                for (let i = 0, len = cellIds.length; i < len; i++) {
                    const id = cellIds[i];
                    if (this.seenGen[id] === this.retrieveSerial) {
                        continue;
                    }
                    this.seenGen[id] = this.retrieveSerial;
                    if (this.boxes[id].intersects(box)) {
                        this.retrieveResult.push(id);
                    }
                }
            }
        }

        return this.retrieveResult;
    }

    private updateCoordinates(area: Rectangle): void {
        this.coordinates.x0 = cell(area.x, this.area.x, this.cellWidth, this.columns);
        this.coordinates.x1 = cell(area.x1, this.area.x, this.cellWidth, this.columns);
        this.coordinates.y0 = cell(area.y, this.area.y, this.cellHeight, this.rows);
        this.coordinates.y1 = cell(area.y1, this.area.y, this.cellHeight, this.rows);
    }
}
