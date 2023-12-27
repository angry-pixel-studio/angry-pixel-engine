import { clamp, Rectangle } from "@angry-pixel/math";
import { IBroadPhaseResolver } from "./IBroadPhaseResolver";

const MAX_SUBDIVISIONS = 20;
const MIN_SUBDIVISIONS = 1;

const cell = (value: number, min: number, width: number, subdivisions: number): number =>
    Math.min(((value - min) / width) | 0, subdivisions - 1);

export class SpartialGrid implements IBroadPhaseResolver {
    private itemsInCells: unknown[][][];
    private area: Rectangle;
    private cellWidth: number;
    private cellHeight: number;
    private coordinates: { x0: number; x1: number; y0: number; y1: number } = {
        x0: 0,
        x1: 0,
        y0: 0,
        y1: 0,
    };

    private _subdivisions: number = 1;

    public get subdivisions(): number {
        return this._subdivisions;
    }

    public set subdivisions(value: number) {
        this._subdivisions = clamp(value, MIN_SUBDIVISIONS, MAX_SUBDIVISIONS);
    }

    constructor(area: Rectangle) {
        this.resize(area);
    }

    public resize(area: Rectangle): void {
        this.area = area;
        this.cellWidth = Math.ceil(area.width / this._subdivisions);
        this.cellHeight = Math.ceil(area.height / this._subdivisions);

        this.itemsInCells = [];

        for (let x = 0; x < this._subdivisions; x++) {
            this.itemsInCells[x] = [];

            for (let y = 0; y < this._subdivisions; y++) {
                this.itemsInCells[x][y] = [];
            }
        }
    }

    public clear(): void {
        for (let x = 0; x < this._subdivisions; x++) {
            for (let y = 0; y < this._subdivisions; y++) {
                this.itemsInCells[x][y] = [];
            }
        }
    }

    public insert(item: unknown, area: Rectangle): void {
        this.updateCoordinates(area);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                this.itemsInCells[x][y].push(item);
            }
        }
    }

    public retrieve<T>(area: Rectangle): T[] {
        const items: unknown[] = [];
        this.updateCoordinates(area);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                this.itemsInCells[x][y].forEach((item) => (!items.includes(item) ? items.push(item) : null));
            }
        }

        return items as T[];
    }

    private updateCoordinates(area: Rectangle): void {
        this.coordinates.x0 = cell(area.x, this.area.x, this.cellWidth, this._subdivisions);
        this.coordinates.x1 = cell(area.x1, this.area.x, this.cellWidth, this._subdivisions);
        this.coordinates.y0 = cell(area.y, this.area.y, this.cellHeight, this._subdivisions);
        this.coordinates.y1 = cell(area.y1, this.area.y, this.cellHeight, this._subdivisions);
    }
}
