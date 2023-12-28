import { Rectangle } from "@angry-pixel/math";
import { IBroadPhaseResolver } from "./IBroadPhaseResolver";

const MAX_DEPTH = 8;

export class QuadTree implements IBroadPhaseResolver {
    private depth: number;
    private area: Rectangle;
    private childrenArea: Rectangle[] = [];
    private children: QuadTree[] = [];
    private items: unknown[] = [];

    constructor(area: Rectangle, depth: number = 0) {
        this.depth = depth;
        this.resize(area);
    }

    public resize(area: Rectangle): void {
        this.clear();

        this.area = area;

        const childWidth = area.width / 2;
        const childHeight = area.height / 2;

        this.childrenArea = [
            // Top left
            new Rectangle(this.area.x, this.area.y + childHeight, childWidth, childHeight),
            // Top right
            new Rectangle(this.area.x + childWidth, this.area.y + childHeight, childWidth, childHeight),
            // Bottom left
            new Rectangle(this.area.x, this.area.y, childWidth, childHeight),
            // Bottom right
            new Rectangle(this.area.x + childWidth, this.area.y, childWidth, childHeight),
        ];
    }

    public clear(): void {
        this.items = [];

        for (let i = 0; i < 4; i++) {
            if (this.children[i]) {
                this.children[i].clear();
            }
            delete this.children[i];
        }
    }

    public insert(item: unknown, area: Rectangle): void {
        for (let i = 0; i < 4; i++) {
            if (this.childrenArea[i].contains(area) && this.depth + 1 < MAX_DEPTH) {
                if (!this.children[i]) {
                    this.children[i] = new QuadTree(this.childrenArea[i], this.depth + 1);
                }

                return this.children[i].insert(item, area);
            }
        }

        this.items.push(item);
    }

    public retrieve<T>(area: Rectangle, items: T[] = []): T[] {
        if (this.area.overlaps(area)) {
            this.items.forEach((item) => items.push(item as T));
            this.children.forEach((child) => child.retrieve(area, items));
        }

        return items;
    }
}
