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
            collider.clearCollisions();
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

        for (const collider of this.colliders) {
            this.quad.insert(collider);
        }

        this.broadPhase();
    }

    public addCollider(collider: ICollider): void {
        this.colliders.push(collider);
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase() {
        for (const collider of this.colliders) {
            const colliders = this.quad.retrieve(collider);

            this.narrowPhase(collider, colliders);
        }
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): void {
        for (const c of colliders) {
            if (c.isPasive()) {
                continue;
            }
            if (this.checkCollision(c, collider)) {
                c.addCollision(collider);
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

    private checkCollision(collider1: ICollider, colldier2: ICollider) {
        return collider1.getRectangle().x < colldier2.getRectangle().x + colldier2.getRectangle().width &&
            collider1.getRectangle().x + collider1.getRectangle().width > colldier2.getRectangle().x &&
            collider1.getRectangle().y - collider1.getRectangle().height < colldier2.getRectangle().y &&
            collider1.getRectangle().y > colldier2.getRectangle().y - colldier2.getRectangle().height
    }
}
