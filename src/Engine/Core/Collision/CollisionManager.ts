import Rectangle from "../../Helper/Rectangle";
import ICollider from "./ICollider";
import QuadTree from "./QuadTree";

export default class CollisionManager {
    private colliders: Array<ICollider> = [];
    private quad: QuadTree;

    constructor() {
        this.quad = new QuadTree(0, new Rectangle(0, 0, 1366, 768))
    }

    public checkCollisions(): void {
        for (const collider of this.colliders) {
            if (collider.getRectangle().x < this.quad.bounds.x) {
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
            }
        }
        this.quad.clear();
        this.broadPhase();
        //this.narrowPhase();
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
            if (collider.gameObject.id === "Player") {
                console.log("# of possible collisions with", collider.gameObject.id, colliders.length);
            }
        }
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(): void { }
}
