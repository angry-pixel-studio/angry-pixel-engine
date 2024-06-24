import { Rectangle, Vector2 } from "../../../math";
import { ICollider } from "../../component/Collider";
import { IBroadPhaseResolver } from "./IBroadPhaseResolver";

const MAX_COLLIDERS_PER_CELL = 10;

const cell = (value: number, min: number, width: number, subdivisions: number): number =>
    Math.min(((value - min) / width) | 0, subdivisions - 1);

type Coordinates = { x0: number; x1: number; y0: number; y1: number };

export class SpartialGrid implements IBroadPhaseResolver {
    private area: Rectangle = new Rectangle();
    private colliders: number[][][] = [];
    private cellWidth: number;
    private cellHeight: number;
    private subdivisions: number = 0;
    private coordinates: Coordinates = { x0: 0, x1: 0, y0: 0, y1: 0 };

    // cache
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();

    public clear(): void {
        for (let x = 0; x < this.subdivisions; x++) {
            for (let y = 0; y < this.subdivisions; y++) {
                this.colliders[x][y] = [];
            }
        }
    }

    public update(colliders: ICollider[]): void {
        this.resizeArea(colliders);
        this.updateSubdivisions(colliders);
        colliders.forEach(({ id, shape: { boundingBox } }) => this.insert(id, boundingBox));
    }

    private resizeArea(colliders: ICollider[]): void {
        this.minArea.set(0, 0);
        this.maxArea.set(0, 0);

        colliders.forEach(({ shape: { boundingBox: box } }) => {
            this.minArea.set(Math.min(box.x, this.minArea.x), Math.min(box.y, this.minArea.y));
            this.maxArea.set(Math.max(box.x1, this.maxArea.x), Math.max(box.y1, this.maxArea.y));
        });

        this.area.set(this.minArea.x, this.minArea.y, this.maxArea.x - this.minArea.x, this.maxArea.y - this.minArea.y);
    }

    private updateSubdivisions(colliders: ICollider[]): void {
        this.subdivisions = ((colliders.length / MAX_COLLIDERS_PER_CELL) | 0) + 1;

        this.cellWidth = Math.ceil(this.area.width / this.subdivisions);
        this.cellHeight = Math.ceil(this.area.height / this.subdivisions);

        this.colliders = [];

        for (let x = 0; x < this.subdivisions; x++) {
            this.colliders[x] = [];

            for (let y = 0; y < this.subdivisions; y++) {
                this.colliders[x][y] = [];
            }
        }
    }

    public insert(id: number, box: Rectangle): void {
        this.updateCoordinates(box);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                this.colliders[x][y].push(id);
            }
        }
    }

    public retrieve(box: Rectangle): number[] {
        const colliders: number[] = [];
        this.updateCoordinates(box);

        for (let x = this.coordinates.x0; x <= this.coordinates.x1; x++) {
            for (let y = this.coordinates.y0; y <= this.coordinates.y1; y++) {
                this.colliders[x][y].forEach((id) => (!colliders.includes(id) ? colliders.push(id) : undefined));
            }
        }

        return colliders;
    }

    private updateCoordinates(area: Rectangle): void {
        this.coordinates.x0 = cell(area.x, this.area.x, this.cellWidth, this.subdivisions);
        this.coordinates.x1 = cell(area.x1, this.area.x, this.cellWidth, this.subdivisions);
        this.coordinates.y0 = cell(area.y, this.area.y, this.cellHeight, this.subdivisions);
        this.coordinates.y1 = cell(area.y1, this.area.y, this.cellHeight, this.subdivisions);
    }
}
