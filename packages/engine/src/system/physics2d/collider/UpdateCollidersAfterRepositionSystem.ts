import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { Collider } from "@collisions2d";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { Transform } from "@component/gameLogic/Transform";
import { BallCollider } from "@component/physics2d/BallCollider";
import { BoxCollider } from "@component/physics2d/BoxCollider";
import { EdgeCollider } from "@component/physics2d/EdgeCollider";
import { PolygonCollider } from "@component/physics2d/PolygonCollider";
import { TilemapCollider } from "@component/physics2d/TilemapCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";

@injectable(SYSTEM_TYPES.UpdateCollidersAfterRepositionSystem)
export class UpdateCollidersAfterRepositionSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        const dynamicBodies = this.entityManager
            .search(RigidBody, (rigidBody) => rigidBody.type === RigidBodyType.Dynamic)
            .map(({ entity }) => entity);

        [BallCollider, BoxCollider, PolygonCollider, EdgeCollider, TilemapCollider].forEach((type) =>
            this.entityManager
                .search<Collider>(type, (collider, entity) => dynamicBodies.includes(entity))
                .forEach(({ component: collider, entity }) =>
                    collider.shapes.forEach((shape) => {
                        this.updatePositionAndVertices(
                            shape,
                            collider.offset,
                            this.entityManager.getComponent(entity, Transform),
                        );
                        this.updateBoundingBox(shape);
                    }),
                ),
        );
    }
}
