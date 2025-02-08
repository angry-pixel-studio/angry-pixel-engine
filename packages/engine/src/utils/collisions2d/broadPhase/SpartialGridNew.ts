import { Rectangle } from "@math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@ioc";
import { TYPES } from "@config/types";

const RECTS_PER_CELL = 16;

@injectable(TYPES.CollisionBroadphaseResolver)
export class SpartialGrid implements BroadPhaseResolver {
    private grid: Map<number, { id: number; rect: Rectangle }[]> = new Map(); // Map to store cell IDs and their associated Rects
    private cellSize: number = 0; // Size of each cell
    private gridWidth: number = 0; // Width of the entire grid
    private gridHeight: number = 0; // Height of the entire grid
    private subdivisions: number = 0; // Number of subdivisions in each axis

    // Clears the grid
    clear(): void {
        this.grid.clear();
        this.cellSize = 0;
        this.gridWidth = 0;
        this.gridHeight = 0;
        this.subdivisions = 0;
    }

    // Updates the grid based on the provided shapes
    update(shapes: Shape[]): void {
        if (shapes.length === 0) {
            this.clear();
            return;
        }

        // Determine grid boundaries
        const minX = Math.min(...shapes.map((s) => s.boundingBox.x));
        const minY = Math.min(...shapes.map((s) => s.boundingBox.y));
        const maxX = Math.max(...shapes.map((s) => s.boundingBox.x + s.boundingBox.width));
        const maxY = Math.max(...shapes.map((s) => s.boundingBox.y + s.boundingBox.height));

        // Update grid dimensions
        this.gridWidth = maxX - minX;
        this.gridHeight = maxY - minY;

        // Calculate the number of subdivisions and cell size
        const totalRects = shapes.length;
        this.subdivisions = Math.ceil(Math.sqrt(totalRects / RECTS_PER_CELL));
        this.cellSize = Math.max(this.gridWidth, this.gridHeight) / this.subdivisions;

        // Clear the grid and reinsert shapes
        this.clear();
        for (const shape of shapes) {
            this.insert(shape.id, shape.boundingBox);
        }
    }

    // Converts grid coordinates to a unique cell ID
    private getCellId(x: number, y: number): number {
        return y * this.subdivisions + x;
    }

    // Inserts a rectangle into the grid
    insert(id: number, box: Rectangle): void {
        const startX = Math.floor(box.x / this.cellSize);
        const startY = Math.floor(box.y / this.cellSize);
        const endX = Math.floor((box.x + box.width) / this.cellSize);
        const endY = Math.floor((box.y + box.height) / this.cellSize);

        // Loop through all cells that the rectangle overlaps
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                const cellId = this.getCellId(x, y);
                if (!this.grid.has(cellId)) {
                    this.grid.set(cellId, []);
                }
                this.grid.get(cellId)!.push({ id, rect: box });
            }
        }
    }

    // Retrieves IDs of neighbors for a given rectangle, ensuring they intersect
    retrieve(box: Rectangle): number[] {
        const startX = Math.floor(box.x / this.cellSize);
        const startY = Math.floor(box.y / this.cellSize);
        const endX = Math.floor((box.x + box.width) / this.cellSize);
        const endY = Math.floor((box.y + box.height) / this.cellSize);

        const ids = new Set<number>();

        // Loop through all cells that the rectangle overlaps
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                const cellId = this.getCellId(x, y);
                if (this.grid.has(cellId)) {
                    for (const { id, rect } of this.grid.get(cellId)!) {
                        if (box.intersects(rect)) {
                            ids.add(id);
                        }
                    }
                }
            }
        }

        return Array.from(ids);
    }
}
