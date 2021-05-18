import { Rectangle } from "../../Math/Rectangle";
import { Vector2 } from "../../Math/Vector2";
import { GeometricRenderData } from "../Rendering/RenderData/GeometricRenderData";
import { RenderManager } from "../Rendering/RenderManager";
import { ICollider } from "./Collider/ICollider";
import { QuadTree } from "./QuadTree";
import { CollisionData } from "./CollisionData";
import { ICollisionResolver } from "./Resolver/ICollisionResolver";

const DEBUG_RENDER_LAYER = "QuadTree";

export interface Collision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    collisionData: CollisionData;
}

export class CollisionManager {
    private debug: boolean;
    private colliders: ICollider[];
    private quadTree: QuadTree;
    private bounds: Rectangle;
    private fixedQuadTree: boolean;
    private resolver: ICollisionResolver;
    private renderManager: RenderManager;

    // cache
    private minBounds: Vector2 = new Vector2();
    private maxBounds: Vector2 = new Vector2();
    private newBounds: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(
        resolver: ICollisionResolver,
        renderManager: RenderManager,
        quadTreeBounds: Rectangle | null = null,
        quadMaxLevel: number,
        collidersPerQuad: number,
        debug: boolean = false
    ) {
        this.fixedQuadTree = quadTreeBounds !== null;
        this.resolver = resolver;
        this.debug = debug;
        this.renderManager = renderManager;
        this.colliders = [];

        if (this.fixedQuadTree) {
            this.bounds = quadTreeBounds;
        } else {
            this.bounds = new Rectangle(0, 0, 0, 0);
        }

        this.quadTree = new QuadTree(0, this.bounds, quadMaxLevel, collidersPerQuad);
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

    public getCollisionsForCollider(collider: ICollider): Collision[] {
        if (this.colliders.indexOf(collider) === -1) return [];

        return this.narrowPhase(collider, this.broadPhase(collider));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        return this.quadTree.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): Array<Collision> {
        const collisions: Array<Collision> = [];
        colliders
            .filter((remoteCollider: ICollider) => remoteCollider.gameObject !== collider.gameObject)
            .forEach((remoteCollider: ICollider) => {
                const collisionData = this.resolver.getCollisionData(collider.shape, remoteCollider.shape);
                if (collisionData !== null) {
                    collisions.push({
                        localCollider: collider,
                        remoteCollider: remoteCollider,
                        collisionData: collisionData,
                    });
                }
            });

        return collisions;
    }

    public update(): void {
        if (this.colliders.length === 0) {
            return;
        }

        this.quadTree.clearColliders();
        this.quadTree.clearQuadrants();

        if (this.fixedQuadTree === false) {
            this.updateNewBounds();
            if (this.newBounds.equals(this.bounds) === false) {
                this.bounds.updateFromRect(this.newBounds);
                this.quadTree.updateBounds(this.bounds);
            }
        }

        for (const collider of this.colliders) {
            this.quadTree.addCollider(collider);
        }

        if (this.debug) {
            this.debugQuads(this.quadTree);
        }
    }

    private updateNewBounds(): void {
        this.colliders.forEach((collider: ICollider) => {
            this.minBounds.set(
                Math.min(collider.bottomLeftQuadVertex.x, this.minBounds.x),
                Math.min(collider.bottomLeftQuadVertex.y, this.minBounds.y)
            );

            this.maxBounds.set(
                Math.max(collider.topRightQuadVertex.x, this.maxBounds.x),
                Math.max(collider.topRightQuadVertex.y, this.maxBounds.y)
            );
        });

        this.newBounds.set(
            this.minBounds.x,
            this.minBounds.y,
            this.maxBounds.x - this.minBounds.x,
            this.maxBounds.y - this.minBounds.y
        );
    }

    private debugQuads(quad: QuadTree) {
        for (const q of quad.quadrants) {
            this.debugQuads(q);
        }

        if (quad.quadrants.length > 0) {
            return;
        }

        const renderData = new GeometricRenderData();

        renderData.debug = true;
        renderData.position = new Vector2(
            quad.bounds.x + quad.bounds.width / 2,
            quad.bounds.y + quad.bounds.height / 2
        );

        renderData.layer = DEBUG_RENDER_LAYER;
        renderData.geometric = quad.bounds;
        renderData.geometricType = "Rectangle";
        renderData.color = "#0000FF";

        this.renderManager.addToRenderStack(renderData);
    }
}
