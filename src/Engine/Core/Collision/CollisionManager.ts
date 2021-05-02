import { Rectangle } from "../../Math/Rectangle";
import { Vector2 } from "../../Math/Vector2";
import { GeometricRenderData } from "../Rendering/RenderData/GeometricRenderData";
import { RenderManager } from "../Rendering/RenderManager";
import { ICollider } from "./Collider/ICollider";
import { QuadTree } from "./QuadTree";
import { SatData } from "./Sat/SatData";
import { SatResolver } from "./Sat/SatResolver";

const EXTRA_BOUND: number = 0;
const DEBUG_RENDER_LAYER = "QuadTree";

export interface Collision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    collisionData: SatData;
}

export class CollisionManager {
    private debug: boolean;
    private colliders: ICollider[];
    private quadTree: QuadTree;
    private bounds: Rectangle;
    private fixedQuadTree: boolean;
    private satResolver: SatResolver;
    private renderManager: RenderManager;

    // cache
    private minBounds: Vector2 = new Vector2();
    private maxBounds: Vector2 = new Vector2();
    private newBounds: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(
        satResolver: SatResolver,
        renderManager: RenderManager,
        fixedQuadTree: boolean,
        quadTreeSize: { width: number; height: number } | null = null,
        debug: boolean = false
    ) {
        this.fixedQuadTree = fixedQuadTree;
        if (this.fixedQuadTree && quadTreeSize === null) {
            throw new Error("quadTreeSize cannot be null if quad tree is fixed");
        }

        this.satResolver = satResolver;
        this.debug = debug;
        this.renderManager = renderManager;
        this.colliders = [];

        if (this.fixedQuadTree) {
            this.bounds = new Rectangle(
                -quadTreeSize.width / 2,
                -quadTreeSize.height / 2,
                quadTreeSize.width,
                quadTreeSize.height
            );
        } else {
            this.bounds = new Rectangle(0, 0, 0, 0);
        }

        this.quadTree = new QuadTree(0, this.bounds);
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
        return this.narrowPhase(collider, this.broadPhase(collider));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        return this.quadTree.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): Array<Collision> {
        const collisions: Array<Collision> = [];
        colliders.forEach((remoteCollider: ICollider) => {
            if (remoteCollider.gameObject === collider.gameObject) {
                return;
            }

            const satData = this.satResolver.getSatData(collider.shape, remoteCollider.shape);
            if (satData !== null) {
                collisions.push({
                    localCollider: collider,
                    remoteCollider: remoteCollider,
                    collisionData: satData,
                });
            }
        });

        return collisions;
    }

    public update(): void {
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
                collider.bottomLeftQuadVertex.x < this.minBounds.x ? collider.bottomLeftQuadVertex.x : this.minBounds.x,
                collider.bottomLeftQuadVertex.y < this.minBounds.y ? collider.bottomLeftQuadVertex.y : this.minBounds.y
            );

            this.maxBounds.set(
                collider.topRightQuadVertex.x > this.maxBounds.x ? collider.topRightQuadVertex.x : this.maxBounds.x,
                collider.topRightQuadVertex.y > this.maxBounds.y ? collider.topRightQuadVertex.y : this.maxBounds.y
            );
        });

        this.newBounds.set(
            this.minBounds.x - EXTRA_BOUND,
            this.minBounds.y - EXTRA_BOUND,
            this.maxBounds.x - this.minBounds.x + 2 * EXTRA_BOUND,
            this.maxBounds.y - this.minBounds.y + 2 * EXTRA_BOUND
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
