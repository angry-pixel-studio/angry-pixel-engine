import { Rectangle, Vector2 } from "@math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@ioc";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";

const MAX_DEPTH = 8;
const MAX_RECTS = 16;

@injectable(DEPENDENCY_TYPES.CollisionBroadphaseResolver)
export class QuadTree implements BroadPhaseResolver {
    private bounds: Rectangle;
    private depth: number;
    private rects: Map<number, Rectangle> = new Map();
    private children: QuadTree[] = null;

    // cache
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();

    constructor(bounds: Rectangle = new Rectangle(), depth: number = 0) {
        this.bounds = bounds;
        this.depth = depth;
    }

    public update(shapes: Shape[]): void {
        this.clear();
        if (shapes.length === 0) return;
        this.resize(shapes);
        shapes.forEach(({ id, boundingBox }) => this.insert(id, boundingBox));
    }

    private clear(): void {
        this.rects.clear();

        if (this.children) {
            this.children.forEach((child) => child.clear());
            this.children = null;
        }
    }

    private resize(shapes: Shape[]): void {
        this.minArea.set(Infinity, Infinity);
        this.maxArea.set(-Infinity, -Infinity);

        shapes.forEach(({ boundingBox: box }) => {
            this.minArea.set(Math.min(box.x, this.minArea.x), Math.min(box.y, this.minArea.y));
            this.maxArea.set(Math.max(box.x1, this.maxArea.x), Math.max(box.y1, this.maxArea.y));
        });

        this.bounds.set(
            this.minArea.x,
            this.minArea.y,
            this.maxArea.x - this.minArea.x,
            this.maxArea.y - this.minArea.y,
        );
    }

    private insert(id: number, rect: Rectangle): void {
        if (!this.children && this.rects.size >= MAX_RECTS && this.depth < MAX_DEPTH) {
            this.subdivide();
            this.rects.forEach((value, key) =>
                this.children.forEach((child) => {
                    if (child.bounds.intersects(value)) {
                        child.insert(key, value);
                    }
                }),
            );
            this.rects.clear();
        }

        if (this.children) {
            this.children.forEach((child) => {
                if (child.bounds.intersects(rect)) {
                    child.insert(id, rect);
                }
            });
        } else {
            this.rects.set(id, rect);
        }
    }

    private subdivide(): void {
        const x = this.bounds.x;
        const y = this.bounds.y;
        const width = this.bounds.width;
        const height = this.bounds.height;

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.children = [
            new QuadTree(new Rectangle(x, y, halfWidth, halfHeight), this.depth + 1),
            new QuadTree(new Rectangle(x + halfWidth, y, halfWidth, halfHeight), this.depth + 1),
            new QuadTree(new Rectangle(x, y + halfHeight, halfWidth, halfHeight), this.depth + 1),
            new QuadTree(new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight), this.depth + 1),
        ];
    }

    public retrieve(rect: Rectangle): number[] {
        const neighbors: number[] = [];
        this.retrieveFromNode(rect, neighbors);
        return neighbors;
    }

    private retrieveFromNode(rect: Rectangle, result: number[]): void {
        if (this.children) {
            this.children.forEach((child) => {
                if (child.bounds.intersects(rect)) {
                    child.retrieveFromNode(rect, result);
                }
            });
        } else {
            this.rects.forEach((value, key) => {
                if (value.intersects(rect) && result.indexOf(key) === -1) {
                    result.push(key);
                }
            });
        }
    }
}
