import { Circumference, IPhysicsManager } from "../../../../2d-physics";
import { EntityManager } from "../../../../ecs/EntityManager";
import { System } from "../../../../ecs/SystemManager";
import { Vector2 } from "../../../../math";
import { BallCollider } from "../../../component/collider/BallCollider";

export class BallColliderSystem implements System {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(BallCollider).forEach(({ entity, component: ballCollider }) => {
            this.createColliderIfNotExists(ballCollider);

            ballCollider._collider.layer = ballCollider.layer;
            ballCollider._collider.physics = ballCollider.physics;
            ballCollider._collider.offset.copy(ballCollider.offset);
            ballCollider._collider.shape.radius = ballCollider.radius;
            ballCollider._collider.ignoreCollisionsWithLayers =
                ballCollider.ignoreCollisionsWithLayers.length > 0
                    ? ballCollider.ignoreCollisionsWithLayers
                    : undefined;

            this.physicsManager.addCollider(entity, ballCollider._collider);
        });
    }

    private createColliderIfNotExists(ballCollider: BallCollider): void {
        if (!ballCollider._collider) {
            ballCollider._collider = {
                entity: undefined,
                id: undefined,
                layer: "",
                offset: new Vector2(),
                shape: new Circumference(0),
                updateCollisions: true,
                physics: true,
                ignoreCollisionsWithLayers: undefined,
            };
        }
    }

    public onCreate(): void {}
    public onEnable(): void {}
    public onDisable(): void {}
    public onDestroy(): void {}
}
