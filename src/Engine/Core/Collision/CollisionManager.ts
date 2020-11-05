import { GeometricRenderData, GEOMETRIC_RECTANGLE } from "../Rendering/RenderData/GeometricRenderData";
import { LAYER_DEFAULT } from "./../../GameObject";
import { Rectangle } from "./../../Libs/Geometric/Shapes/Rectangle";
import { Vector2 } from "./../../Helper/Vector2";
import { RenderManager } from "./../Rendering/RenderManager";
import { ICollider } from "./Collider/ICollider";
import { QuadTree } from "./QuadTree";

export interface Collision {
    localCollider: ICollider;
    remoteCollider: ICollider;
}

export class CollisionManager {
    private debug: boolean = true;
    private renderManager: RenderManager;
    private colliders: Array<ICollider> = [];
    private quad: QuadTree;

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;

        // TODO: remove hardcoded quad size
        this.quad = new QuadTree(0, new Rectangle(-2500, -2500, 5000, 5000));
    }

    public prepare(): void {
        //this.debugQuads(this.quad);
        this.refreshQuad();
    }

    public addCollider(collider: ICollider): void {
        this.colliders.push(collider);
    }

    public removeCollider(collider: ICollider): void {
        const index: number = this.colliders.indexOf(collider);
        if (index !== -1) {
            delete this.colliders[index];
            this.colliders.splice(index, 1);
        }
    }

    public getCollisionsForCollider(collider: ICollider): Array<Collision> {
        const colliders = this.broadPhase(collider);

        return this.narrowPhase(collider, colliders).map<Collision>((remoteCollider: ICollider) => ({
            localCollider: collider,
            remoteCollider: remoteCollider,
        }));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        return this.quad.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): Array<ICollider> {
        const collisions: Array<ICollider> = [];
        for (const c of colliders) {
            if (collider.hasCollision(c)) {
                collisions.push(c);
            }
        }

        return collisions;
    }

    private refreshQuad(): void {
        this.quad.clear();
        for (const collider of this.colliders) {
            this.quad.insert(collider);
        }
    }

    private debugQuads(quad: QuadTree) {
        if (!this.debug) {
            return;
        }

        const renderData = new GeometricRenderData();
        renderData.position = new Vector2(quad.bounds.x, quad.bounds.y);
        renderData.layer = LAYER_DEFAULT;
        renderData.geometric = quad.bounds;
        renderData.geometricType = GEOMETRIC_RECTANGLE;
        renderData.color = "#0000FF";

        this.renderManager.addToRenderStack(renderData);

        for (const q of quad.quadrants) {
            this.debugQuads(q);
        }
    }
}
