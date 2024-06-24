import { Rectangle } from "../../../math";
import { ICollider } from "../../component/Collider";

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
    clear(): void;
    update(colliders: ICollider[]): void;
    retrieve(box: Rectangle): number[];
    insert(id: number, box: Rectangle): void;
}
