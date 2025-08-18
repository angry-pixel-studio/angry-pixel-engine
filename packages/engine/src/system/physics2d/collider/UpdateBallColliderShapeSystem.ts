import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { Circumference } from "@angry-pixel/collisions";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { Transform } from "@component/gameLogic/Transform";
import { BallCollider } from "@component/physics2d/BallCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";

@injectable(SYSTEM_SYMBOLS.UpdateBallColliderShapeSystem)
export class UpdateBallColliderShapeSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager) {
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
