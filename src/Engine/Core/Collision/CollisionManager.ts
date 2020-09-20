import { LAYER_DEFAULT } from "../../GameObject";
import Rectangle from "../../Helper/Rectangle";
import Vector2 from "../../Helper/Vector2";
import RenderData, { GEOMETRIC_RECTANGLE } from "../Rendering/RenderData";
import RenderManager from "../Rendering/RenderManager";
import ICollider from "./ICollider";
import QuadTree from "./QuadTree";

export default class CollisionManager {
    private renderManager: RenderManager;
    private colliders: Array<ICollider> = [];
    private quad: QuadTree;

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;
        this.quad = new QuadTree(0, new Rectangle(-1025, 700, 2050, 1400))
    }

    public checkCollisions(): void {
        for (const collider of this.colliders) {
            this.renderManager.addToRenderStack(collider.getRenderData());

            /*if (collider.getRectangle().x < this.quad.bounds.x) {
                this.quad.bounds.x = collider.getRectangle().x;
            }
            if (collider.getRectangle().y < this.quad.bounds.y) {
                this.quad.bounds.y = collider.getRectangle().y;
            }
            if (collider.getRectangle().x1 > this.quad.bounds.x1) {
                this.quad.bounds.width = collider.getRectangle().x1;
            }
            if (collider.getRectangle().y1 < this.quad.bounds.y1) {
                this.quad.bounds.height = collider.getRectangle().y1;
            }*/
        }

        this.debugQuads(this.quad);

        this.quad.clear();
        this.broadPhase();
    }

    public addCollider(collider: ICollider): void {
        this.colliders.push(collider);
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase() {
        for (const collider of this.colliders) {
            this.quad.insert(collider);
        }

        for (const collider of this.colliders) {
            const colliders = this.quad.retrieve(collider);

            this.narrowPhase(collider, colliders);
            //if (collider.gameObject.id === "Player") {
            //    console.log("# of possible collisions with", collider.gameObject.id, colliders.length);
            // console.log(collider.gameObject.transform.position.x, collider.gameObject.transform.position.y)
            //}
        }
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): void {
        for (const c of colliders) {
            if (c.isPasive()) {
                continue;
            }
            //console.log(c.getRectangle().y);
            if (c.collidesWith(collider)) {
                console.log('true!');
            }
        }
    }

    private debugQuads(quad: QuadTree) {
        const renderData = new RenderData();
        renderData.position = new Vector2(quad.bounds.x, quad.bounds.y);
        renderData.layer = LAYER_DEFAULT;
        renderData.geometric = quad.bounds;
        renderData.geometricType = GEOMETRIC_RECTANGLE;
        renderData.color = '#0000FF';

        this.renderManager.addToRenderStack(renderData);

        for (const q of quad.quadrants) {
            this.debugQuads(q);
        }
    }
}
