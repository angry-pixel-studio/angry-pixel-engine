import { RenderManager } from "./../Rendering/RenderManager";
import { ICollider } from "./Collider/ICollider";
import { SatData } from "./Sat/SatData";
export interface Collision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    collisionData: SatData;
}
export declare class CollisionManager {
    private debug;
    private renderManager;
    private colliders;
    private quad;
    private satResolver;
    constructor(renderManager: RenderManager);
    prepare(): void;
    addCollider(collider: ICollider): void;
    removeCollider(collider: ICollider): void;
    getCollisionsForCollider(collider: ICollider): Array<Collision>;
    private broadPhase;
    private narrowPhase;
    private refreshQuad;
    private debugQuads;
}
