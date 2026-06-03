import { Rectangle } from "@angry-pixel/math";
import { Shape } from "../Shape";

/**
 * Broad phase collision methods
 * - QuadTree: Stores the shapes in an incremental quad tree.
 * - SpatialGrid: Stores the shapes in an incremental spatial grid.
 * @category Config
 * @public
 */
export enum BroadPhaseMethods {
    QuadTree,
    SpatialGrid,
}

export interface BroadPhaseResolver {
    update(shapes: Shape[]): void;
    retrieve(box: Rectangle): number[];
}
