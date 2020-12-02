import { Rectangle } from "../../Math/Rectangle";
import { ICollider } from "./Collider/ICollider";
export declare class QuadTree {
    readonly maxColliders: number;
    readonly maxLevels: number;
    private readonly sw;
    private readonly se;
    private readonly nw;
    private readonly ne;
    private level;
    private colliders;
    quadrants: Array<QuadTree>;
    bounds: Rectangle;
    constructor(level: number, bounds: Rectangle);
    insert(collider: ICollider): void;
    retrieve(collider: ICollider): Array<ICollider>;
    clear(): void;
    private splitQuad;
    private getChildrenQuadrantForCollider;
    private insertColliderIntoChildrenQuads;
    private getQuadrantMidPoint;
    private hasQuadChildren;
    private isQuadFull;
}
