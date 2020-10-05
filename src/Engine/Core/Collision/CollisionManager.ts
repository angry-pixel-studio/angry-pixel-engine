import GeometricRenderData, { GEOMETRIC_RECTANGLE } from "../Rendering/RenderData/GeometricRenderData";
import { LAYER_DEFAULT } from "./../../GameObject";
import Rectangle from "./../../Helper/Rectangle";
import Vector2 from "./../../Helper/Vector2";
import RenderManager from "./../Rendering/RenderManager";
import ICollider from "./ICollider";
import QuadTree from "./QuadTree";

export default class CollisionManager {
    private debug: boolean = false;
    private renderManager: RenderManager;
    private colliders: Array<ICollider> = [];
    private quad: QuadTree;

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;

        // TODO: remove hardcoded quad size
        this.quad = new QuadTree(0, new Rectangle(-1025, 700, 2050, 1400));
    }

    public prepare(): void {
        this.debugColliders();
        this.debugQuads(this.quad);
        this.refreshQuad();
    }

    public addCollider(collider: ICollider): void {
        this.colliders.push(collider);
    }

    public getCollisionsForCollider(collider: ICollider): Array<ICollider> {
        const colliders = this.broadPhase(collider);

        return this.narrowPhase(collider, colliders);
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider) {
        return this.quad.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): Array<ICollider> {
        const collisions: Array<ICollider> = [];
        for (const c of colliders) {
            if (this.checkCollision(collider, c)) {
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

    // TODO: Make this agnostic of which shapes is checking
    private checkCollision(collider1: ICollider, colldier2: ICollider) {
        return (
            collider1.getRectangle().x < colldier2.getRectangle().x + colldier2.getRectangle().width &&
            collider1.getRectangle().x + collider1.getRectangle().width > colldier2.getRectangle().x &&
            collider1.getRectangle().y - collider1.getRectangle().height < colldier2.getRectangle().y &&
            collider1.getRectangle().y > colldier2.getRectangle().y - colldier2.getRectangle().height
        );
    }

    private debugColliders(): void {
        if (!this.debug) {
            return;
        }

        for (const collider of this.colliders) {
            this.renderManager.addToRenderStack(collider.getRenderData());
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
