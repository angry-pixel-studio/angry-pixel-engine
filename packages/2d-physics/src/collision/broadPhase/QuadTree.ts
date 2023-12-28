import { Rectangle } from "@angry-pixel/math";
import { IBroadPhaseResolver } from "./IBroadPhaseResolver";

const MAX_ITEMS = 16;
const MAX_DEPTH = 8;

export class QuadTree implements IBroadPhaseResolver {
    private area: Rectangle = new Rectangle(0, 0, 0, 0);
    private depth: number = 0;
    private items: [unknown, Rectangle][] = [];
    private children: QuadTree[] = [];

    constructor(area: Rectangle, depth: number = 0) {
        this.depth = depth;
        this.resize(area);
    }

    public resize(area: Rectangle): void {
        this.clear();
        this.area.copy(area);
    }

    public clear(): void {
        this.items = [];
        this.children.forEach((child) => child.clear());
        this.children = [];
    }

    public insert(item: unknown, area: Rectangle): void {
        if (this.children.length === 0 && this.items.length > MAX_ITEMS && this.depth < MAX_DEPTH) {
            this.split();
        }

        if (this.children.length > 0) {
            this.insertItemIntoChildren(item, area);
        } else {
            this.items.push([item, area]);
        }
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

        this.items.forEach((item) => this.insertItemIntoChildren(item[0], item[1]));

        this.items = [];
    }

    private insertItemIntoChildren(item: unknown, area: Rectangle): void {
        this.getChildrenForArea(area).forEach((quadrant) => quadrant.insert(item, area));
    }

    public retrieve<T>(area: Rectangle): T[] {
        const items: unknown[] = [];

        if (this.children.length > 0) {
            this.getChildrenForArea(area).forEach((child) => items.push(...child.retrieve(area)));
        } else {
            this.items.forEach((item) => items.push(item[0]));
        }

        return items as T[];
    }

    private getChildrenForArea(area: Rectangle): QuadTree[] {
        const children: QuadTree[] = [];

        // Bottom left
        if (area.x <= this.area.center.x && area.y <= this.area.center.y) {
            children.push(this.children[0]);
        }
        // Top Left
        if (area.x <= this.area.center.x && area.y1 >= this.area.center.y) {
            children.push(this.children[1]);
        }
        // Top right
        if (area.x1 >= this.area.center.x && area.y1 >= this.area.center.y) {
            children.push(this.children[2]);
        }
        // Bottom right
        if (area.x1 >= this.area.center.x && area.y <= this.area.center.y) {
            children.push(this.children[3]);
        }

        return children;
    }
}
