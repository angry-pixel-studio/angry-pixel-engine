import { Rectangle } from "../../math/Rectangle";
import { Vector2 } from "../../math/Vector2";
import { Exception } from "../../utils/Exception";

export const DEFAULT_MAX_ITEMS: number = 15;
export const DEFAULT_MAX_LEVELS: number = 6;

export interface QuadItem {
    x: number;
    y: number;
    x1: number;
    y1: number;
}

export class QuadTree {
    private _bounds: Rectangle = new Rectangle(0, 0, 0, 0);
    private _items: QuadItem[] = [];
    private _quadrants: QuadTree[] = [];

    private readonly maxLevels: number;
    private readonly maxItems: number;
    private readonly level: number;

    // Quads cardinal positions
    private readonly sw: number = 0;
    private readonly se: number = 1;
    private readonly nw: number = 2;
    private readonly ne: number = 3;

    // cache
    private center: Vector2 = new Vector2();
    private childrenWidth: number = 0;
    private childrenHeight: number = 0;
    private quadsForItem: QuadTree[] = [];

    constructor(
        level: number,
        bounds: Rectangle,
        maxLevels: number = DEFAULT_MAX_LEVELS,
        maxItems: number = DEFAULT_MAX_ITEMS
    ) {
        this.level = level;
        this._bounds.updateFromRect(bounds);

        this.maxLevels = maxLevels;
        this.maxItems = maxItems;

        this.updateCache();
    }

    public get bounds(): Rectangle {
        return this._bounds;
    }

    public get quadrants(): QuadTree[] {
        return this._quadrants;
    }

    public updateBounds(bounds: Rectangle): void {
        this._bounds.updateFromRect(bounds);
        this.updateCache();
    }

    public clearItems(): void {
        this._items = [];
        this._quadrants.forEach((quad: QuadTree) => quad.clearItems());
    }

    public clearQuadrants(): void {
        this._quadrants.forEach((quad: QuadTree) => quad.clearQuadrants());
        this._quadrants = [];
    }

    public addItem(item: QuadItem): void {
        if (this._quadrants.length > 0) {
            this.insertItemIntoChildrenQuads(item);
            return;
        }

        this._items.push(item);

        if (this._items.length > this.maxItems && this.level < this.maxLevels) {
            this.splitQuad();
        }
    }

    public retrieve<T extends QuadItem>(item: QuadItem): T[] {
        const items: QuadItem[] = [];

        if (this._quadrants.length > 0) {
            this.getChildrenQuadrantForItem(item).forEach((quadrant: QuadTree) =>
                items.push(...quadrant.retrieve(item))
            );
        }

        items.push(...this._items);

        const selfIndex: number = items.indexOf(item);
        if (selfIndex !== -1) {
            items.splice(selfIndex, 1);
        }

        return items as T[];
    }

    private splitQuad(): void {
        this._quadrants = [
            new Rectangle(
                this.center.x - this.childrenWidth,
                this.center.y - this.childrenHeight,
                this.childrenWidth,
                this.childrenHeight
            ),
            new Rectangle(this.center.x, this.center.y - this.childrenHeight, this.childrenWidth, this.childrenHeight),
            new Rectangle(this.center.x - this.childrenWidth, this.center.y, this.childrenWidth, this.childrenHeight),
            new Rectangle(this.center.x, this.center.y, this.childrenWidth, this.childrenHeight),
        ].map<QuadTree>(
            (rectangle: Rectangle) => new QuadTree(this.level + 1, rectangle, this.maxLevels, this.maxItems)
        );

        for (const rect of this._items) {
            this.insertItemIntoChildrenQuads(rect);
        }

        this._items = [];
    }

    private getChildrenQuadrantForItem(item: QuadItem): Array<QuadTree> {
        if (this._quadrants.length === 0) {
            throw new Exception("Current quadrant does not have quadrant children.");
        }

        this.quadsForItem = [];

        if (item.x <= this.center.x && item.y <= this.center.y) {
            this.quadsForItem.push(this._quadrants[this.sw]);
        }

        if (item.x1 >= this.center.x && item.y <= this.center.y) {
            this.quadsForItem.push(this._quadrants[this.se]);
        }

        if (item.x <= this.center.x && item.y1 >= this.center.y) {
            this.quadsForItem.push(this._quadrants[this.nw]);
        }

        if (item.x1 >= this.center.x && item.y1 >= this.center.y) {
            this.quadsForItem.push(this._quadrants[this.ne]);
        }

        if (this.quadsForItem.length === 0) {
            throw new Exception("Item does not fit in any children quadrant");
        }

        return this.quadsForItem;
    }

    private insertItemIntoChildrenQuads(item: QuadItem): void {
        this.getChildrenQuadrantForItem(item).forEach((quadrant: QuadTree) => quadrant.addItem(item));
    }

    private updateCache(): void {
        this.center.set(this._bounds.width / 2 + this._bounds.x, this._bounds.height / 2 + this._bounds.y);
        this.childrenWidth = this._bounds.width / 2;
        this.childrenHeight = this._bounds.height / 2;
    }
}
