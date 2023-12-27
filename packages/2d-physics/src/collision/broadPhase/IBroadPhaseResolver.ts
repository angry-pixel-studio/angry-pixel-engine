import { Rectangle } from "@angry-pixel/math";

/**
 * Broad phase collision methods
 * - QuadTree: Stores the colliders in an incremental quad tree.
 * - SpartialGrid: Stores the colliders in an incremental spartial grid.
 * @category Config
 * @public
 */
export enum BroadPhaseMethods {
    QuadTree,
    SpartialGrid,
}

export interface IBroadPhaseResolver {
    resize(area: Rectangle): void;
    clear(): void;
    insert(item: unknown, area: Rectangle): void;
    retrieve<T>(area: Rectangle): T[];
}
