import { Rectangle, Vector2 } from "@math";
import { BroadPhaseResolver } from "./IBroadPhaseResolver";
import { Shape } from "../Shape";
import { injectable } from "@ioc";
import { TYPES } from "@config/types";

const MAX_ITEMS = 16;
const MAX_DEPTH = 8;

@injectable(TYPES.CollisionBroadphaseResolver)
export class QuadTree implements BroadPhaseResolver {
    private area: Rectangle;
    private depth: number;
    private children: QuadTree[] = [];
    private shapes: [number, Rectangle][] = [];

    // cache
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();

    constructor(area: Rectangle = new Rectangle(), depth: number = 0) {
        this.area = area;
        this.depth = depth;
    }

    public clear(): void {
        this.shapes = [];
        this.children = [];
    }

    public update(shapes: Shape[]): void {
        this.clear();
        this.resizeArea(shapes);
        shapes.forEach(({ id, boundingBox }) => this.insert(id, boundingBox));
    }

    private resizeArea(shapes: Shape[]): void {
        this.minArea.set(0, 0);
        this.maxArea.set(0, 0);

        shapes.forEach(({ boundingBox: box }) => {
            this.minArea.set(Math.min(box.x, this.minArea.x), Math.min(box.y, this.minArea.y));
            this.maxArea.set(Math.max(box.x1, this.maxArea.x), Math.max(box.y1, this.maxArea.y));
        });

        this.area.set(this.minArea.x, this.minArea.y, this.maxArea.x - this.minArea.x, this.maxArea.y - this.minArea.y);
    }

    public retrieve(box: Rectangle): number[] {
        const items: number[] = [];

        if (this.children.length > 0) {
            this.getChildrenForBox(box).forEach((child) =>
                items.push(...child.retrieve(box).filter((c) => !items.includes(c))),
            );
        } else {
            this.shapes.forEach((item) => items.push(item[0]));
        }

        return items;
    }

    public insert(id: number, box: Rectangle): void {
        if (this.children.length === 0 && this.shapes.length > MAX_ITEMS && this.depth < MAX_DEPTH) {
            this.split();
        }

        if (this.children.length > 0) this.insertItemIntoChildren(id, box);
        else this.shapes.push([id, box]);
    }

    private split(): void {
        const childWidth = this.area.width / 2;
        const childHeight = this.area.height / 2;

        this.children = [
            // Bottom left
            new Rectangle(this.area.x, this.area.y, childWidth, childHeight),
            // Top left
            new Rectangle(this.area.x, this.area.y + childHeight, childWidth, childHeight),
            // Top right
            new Rectangle(this.area.x + childWidth, this.area.y + childHeight, childWidth, childHeight),
            // Bottom right
            new Rectangle(this.area.x + childWidth, this.area.y, childWidth, childHeight),
        ].map((area) => new QuadTree(area, this.depth + 1));

        this.shapes.forEach((item) => this.insertItemIntoChildren(item[0], item[1]));

        this.shapes = [];
    }

    private insertItemIntoChildren(id: number, box: Rectangle): void {
        this.getChildrenForBox(box).forEach((quadrant) => quadrant.insert(id, box));
    }

    private getChildrenForBox(box: Rectangle): QuadTree[] {
        const children: QuadTree[] = [];

        // Bottom left
        if (box.x <= this.area.center.x && box.y <= this.area.center.y) {
            children.push(this.children[0]);
        }
        // Top Left
        if (box.x <= this.area.center.x && box.y1 >= this.area.center.y) {
            children.push(this.children[1]);
        }
        // Top right
        if (box.x1 >= this.area.center.x && box.y1 >= this.area.center.y) {
            children.push(this.children[2]);
        }
        // Bottom right
        if (box.x1 >= this.area.center.x && box.y <= this.area.center.y) {
            children.push(this.children[3]);
        }

        return children;
    }
}
