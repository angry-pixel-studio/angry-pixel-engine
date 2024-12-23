import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { Circumference } from "@collisions2d";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systemTypes";
import { Transform } from "@component/gameLogic/Transform";
import { BallCollider } from "@component/physics2d/BallCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";

@injectable(SYSTEMS.UpdateBallColliderShapeSystem)
export class UpdateBallColliderShapeSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        this.entityManager.search(BallCollider).forEach(({ component: ballCollider, entity }) => {
            if (ballCollider.shapes.length === 0) {
                ballCollider.shapes[0] = new Circumference(ballCollider.radius);
            }

            ballCollider.shapes[0].radius = ballCollider.radius;

            this.updatePositionAndVertices(
                ballCollider.shapes[0],
                ballCollider.offset,
                this.entityManager.getComponent(entity, Transform),
            );
            this.updateBoundingBox(ballCollider.shapes[0]);
            this.updateProjectionAxes(ballCollider.shapes[0]);
        });
    }
}
