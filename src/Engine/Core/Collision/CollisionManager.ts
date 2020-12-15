import { GeometricRenderData, GEOMETRIC_RECTANGLE } from "../Rendering/RenderData/GeometricRenderData";
import { LAYER_DEFAULT } from "./../../GameObject";
import { Rectangle } from "../../Math/Rectangle";
import { Vector2 } from "../../Math/Vector2";
import { RenderManager } from "./../Rendering/RenderManager";
import { ICollider } from "./Collider/ICollider";
import { QuadTree } from "./QuadTree";
import { SatResolver } from "./Sat/SatResolver";
import { SatData } from "./Sat/SatData";

export interface Collision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    collisionData: SatData;
}

export class CollisionManager {
    private debug: boolean = false;
    private renderManager: RenderManager;
    private colliders: Array<ICollider> = [];
    private quad: QuadTree;
    private satResolver: SatResolver = new SatResolver();

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;

        // TODO: remove hardcoded quad size
        this.quad = new QuadTree(0, new Rectangle(-2500, -2500, 5000, 5000));
    }

    public prepare(): void {
        if (this.debug === true) {
            this.debugQuads(this.quad);
        }

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

        return this.narrowPhase(collider, colliders);
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        return this.quad.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): Array<Collision> {
        const collisions: Array<Collision> = [];
        for (const remoteCollider of colliders) {
            const satData = this.satResolver.getSatData(collider.shape, remoteCollider.shape);
            if (satData !== null) {
                collisions.push({
                    localCollider: collider,
                    remoteCollider: remoteCollider,
                    collisionData: satData,
                });
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
        const renderData = new GeometricRenderData();

        renderData.debug = true;
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
