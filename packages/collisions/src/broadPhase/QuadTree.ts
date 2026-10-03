import { Rectangle } from "@angry-pixel/math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";

const MAX_OBJECTS = 10;
const MAX_LEVELS = 5;

@injectable(SYMBOLS.CollisionBroadphaseResolver)
export class QuadTree implements BroadPhaseResolver {
    private objects: number[] = [];
    private nodes: QuadTree[] = [];
    private rects: Rectangle[];

    constructor(
        private bounds: Rectangle = new Rectangle(),
        private level: number = 0,
        rects: Rectangle[] = [],
    ) {
        this.rects = rects;
    }

    public update(shapes: Shape[]): void {
        this.clear();
        this.rects.length = 0;

        if (shapes.length === 0) {
            return;
        }

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const { id, boundingBox } of shapes) {
            this.rects[id] = boundingBox;
            minX = Math.min(minX, boundingBox.x);
            minY = Math.min(minY, boundingBox.y);
            maxX = Math.max(maxX, boundingBox.x1);
            maxY = Math.max(maxY, boundingBox.y1);
        }

        this.bounds.set(minX, minY, maxX - minX, maxY - minY);

        for (const { id } of shapes) {
            this.insert(id);
        }
    }

    public retrieve(rect: Rectangle): number[] {
        const result: number[] = [];
        this.query(rect, result);
        return result;
    }

    private clear(): void {
        this.objects = [];

        for (const node of this.nodes) {
            node.clear();
        }

        this.nodes = [];
    }

    private split(): void {
        const subWidth = this.bounds.width / 2;
        const subHeight = this.bounds.height / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;

        this.nodes = [
            new QuadTree(new Rectangle(x + subWidth, y + subHeight, subWidth, subHeight), this.level + 1, this.rects),
            new QuadTree(new Rectangle(x, y + subHeight, subWidth, subHeight), this.level + 1, this.rects),
            new QuadTree(new Rectangle(x, y, subWidth, subHeight), this.level + 1, this.rects),
            new QuadTree(new Rectangle(x + subWidth, y, subWidth, subHeight), this.level + 1, this.rects),
        ];
    }

    // -1 when the rect crosses a midline and does not fit in a single quadrant
    private getIndex(rect: Rectangle): number {
        const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
        const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

        const bottom = rect.y1 < horizontalMidpoint;
        const top = rect.y > horizontalMidpoint;
        const left = rect.x1 < verticalMidpoint;
        const right = rect.x > verticalMidpoint;

        if (top && right) return 0;
        if (top && left) return 1;
        if (bottom && left) return 2;
        if (bottom && right) return 3;
        return -1;
    }

    private insert(id: number): void {
        if (this.nodes.length > 0) {
            const index = this.getIndex(this.rects[id]);

            if (index !== -1) {
                this.nodes[index].insert(id);
                return;
            }
        }

        this.objects.push(id);

        if (this.objects.length > MAX_OBJECTS && this.level < MAX_LEVELS) {
            if (this.nodes.length === 0) {
                this.split();
            }

            let i = 0;
            while (i < this.objects.length) {
                const index = this.getIndex(this.rects[this.objects[i]]);

                if (index !== -1) {
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                } else {
                    i++;
                }
            }
        }
    }

    private query(rect: Rectangle, result: number[]): void {
        for (const id of this.objects) {
            if (this.rects[id].intersects(rect)) {
                result.push(id);
            }
        }

        if (this.nodes.length === 0) {
            return;
        }

        // quadrants are chosen by the midpoints, as in insert, so rounding at the bounds cannot hide a rect
        const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
        const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

        const bottom = rect.y < horizontalMidpoint;
        const top = rect.y1 > horizontalMidpoint;
        const left = rect.x < verticalMidpoint;
        const right = rect.x1 > verticalMidpoint;

        if (top && right) this.nodes[0].query(rect, result);
        if (top && left) this.nodes[1].query(rect, result);
        if (bottom && left) this.nodes[2].query(rect, result);
        if (bottom && right) this.nodes[3].query(rect, result);
    }
}
