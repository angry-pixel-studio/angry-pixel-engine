import { Circumference, IPhysicsManager } from "../../../../2d-physics";
import { IEntityManager } from "../../../manager/EntityManager";
import { Vector2 } from "../../../../math";
import { System, SystemGroup } from "../../../manager/SystemManager";
import { BallCollider } from "../../../component/collider/BallCollider";

export class BallColliderSystem extends System {
    constructor(
        private readonly entityManager: IEntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {
        super();
        this.group = SystemGroup.Physics;
    }

    public onUpdate(): void {
        this.entityManager.search(BallCollider).forEach(({ entity, component: ballCollider }) => {
            this.createColliderIfNotExists(ballCollider);

            ballCollider._collider.layer = ballCollider.layer;
            ballCollider._collider.physics = ballCollider.physics;
            ballCollider._collider.offset.copy(ballCollider.offset);
            ballCollider._collider.shape.radius = ballCollider.radius;

            this.physicsManager.addCollider(entity, ballCollider._collider);
        });
    }

    private createColliderIfNotExists(ballCollider: BallCollider): void {
        if (!ballCollider._collider) {
            ballCollider._collider = {
                layer: "",
                offset: new Vector2(),
                shape: new Circumference(0),
                updateCollisions: true,
                physics: true,
            };
        }
    }
}
