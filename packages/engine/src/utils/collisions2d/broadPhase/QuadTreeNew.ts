import { Rectangle, Vector2 } from "@math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@ioc";
import { TYPES } from "@config/types";

@injectable(TYPES.CollisionBroadphaseResolver)
export class QuadTree implements BroadPhaseResolver {
    static readonly MAX_DEPTH: number = 8;
    static readonly MAX_RECTS: number = 16;

    private bounds: Rectangle;
    private depth: number;
    private rects: Map<number, Rectangle>;
    private children: QuadTree[];

    // cache
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();

    constructor(bounds: Rectangle = new Rectangle(), depth: number = 0) {
        this.bounds = bounds;
        this.depth = depth;
        this.rects = new Map<number, Rectangle>();
        this.children = null;
    }

    public update(shapes: Shape[]): void {
        this.clear();
        this.resize(shapes);
        shapes.forEach(({ id, boundingBox }) => this.insert(id, boundingBox));
    }

    public insert(id: number, rect: Rectangle): void {
        if (this.children) {
            for (let i = 0; i < 4; i++) {
                if (this.children[i].bounds.intersects(rect)) {
                    this.children[i].insert(id, rect);
                }
            }
            return;
        }

        this.rects.set(id, rect);

        if (this.rects.size > QuadTree.MAX_RECTS && this.depth < QuadTree.MAX_DEPTH) {
            this.subdivide();

            for (const entrie of this.rects.entries()) {
                const value = entrie[1];
                for (let j = 0; j < 4; j++) {
                    if (this.children![j].bounds.intersects(value)) {
                        this.children![j].insert(entrie[0], value);
                    }
                }
            }
            this.rects.clear();
        }
    }

    public retrieve(rect: Rectangle): number[] {
        const neighbors: number[] = [];
        this.retrieveFromNode(rect, neighbors);
        return neighbors;
    }

    public clear(): void {
        this.rects.clear();

        if (this.children) {
            for (let i = 0; i < 4; i++) {
                this.children[i].clear();
            }
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

    private retrieveFromNode(rect: Rectangle, result: number[]): void {
        for (const entrie of this.rects.entries()) {
            const id = entrie[0];
            if (entrie[1].intersects(rect) && result.indexOf(id) === -1) {
                result.push(id);
            }
        }

        if (this.children) {
            for (let i = 0; i < 4; i++) {
                if (this.children[i].bounds.intersects(rect)) {
                    this.children[i].retrieveFromNode(rect, result);
                }
            }
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
}
