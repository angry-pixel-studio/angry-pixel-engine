import GeometricRenderData, { GEOMETRIC_RECTANGLE } from "../Rendering/RenderData/GeometricRenderData";
import { LAYER_DEFAULT } from "./../../GameObject";
import Rectangle from "./../../Libs/Geometric/Shapes/Rectangle";
import Vector2 from "./../../Helper/Vector2";
import RenderManager from "./../Rendering/RenderManager";
import ICollider from "./ICollider";
import IColliderData, { ITrapezoid } from "./IColliderData";
import QuadTree from "./QuadTree";

export default class CollisionManager {
    private debug: boolean = true;
    private renderManager: RenderManager;
    private colliders: Array<ICollider> = [];
    private colliders2: Array<IColliderData> = [];
    private quad: QuadTree;

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;

        // TODO: remove hardcoded quad size
        this.quad = new QuadTree(0, new Rectangle(-1025, -700, 2050, 1400));
    }

    public prepare(): void {
        this.debugQuads(this.quad);
        this.refreshQuad();
    }

    public addCollider(collider: ICollider, collider2: IColliderData): void {
        this.colliders.push(collider);
        this.colliders2.push(collider2);
    }

    public getCollisionsForCollider(collider: IColliderData): Array<ICollider> {
        const colliders = this.broadPhase(collider);

        return this.narrowPhase(collider, colliders);
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: IColliderData): IColliderData[] {
        return this.quad.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: IColliderData, colliders: Array<IColliderData>): Array<ICollider> {
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
    private checkCollision(collider1: ITrapezoid, collider2: ITrapezoid) {
        return (
            collider1.getBottomLeftPoint().x < collider2.getBottomRightPoint().x &&
            collider1.getBottomRightPoint().x > collider2.getBottomLeftPoint().x &&
            collider1.getBottomLeftPoint().y < collider2.getTopLeftPoint().y &&
            collider1.getTopLeftPoint().y > collider2.getBottomLeftPoint().y
        );
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
