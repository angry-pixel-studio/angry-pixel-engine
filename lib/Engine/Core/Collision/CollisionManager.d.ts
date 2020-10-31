import { RenderManager } from "./../Rendering/RenderManager";
import { ICollider } from "./Collider/ICollider";
export declare class CollisionManager {
    private debug;
    private renderManager;
    private colliders;
    private quad;
    constructor(renderManager: RenderManager);
    prepare(): void;
    addCollider(collider: ICollider): void;
    removeCollider(collider: ICollider): void;
    getCollisionsForCollider(collider: ICollider): Array<ICollider>;
    private broadPhase;
    private narrowPhase;
    private refreshQuad;
    private debugQuads;
}
