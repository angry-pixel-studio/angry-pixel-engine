import { Rectangle } from "@math";
import { Shape } from "../Shape";

/**
 * Broad phase collision methods
 * - QuadTree: Stores the shapes in an incremental quad tree.
 * - SpartialGrid: Stores the shapes in an incremental spartial grid.
 * @category Config
 * @public
 */
export enum BroadPhaseMethods {
    QuadTree,
    SpartialGrid,
}

export interface BroadPhaseResolver {
    update(shapes: Shape[]): void;
    retrieve(box: Rectangle): number[];
}
