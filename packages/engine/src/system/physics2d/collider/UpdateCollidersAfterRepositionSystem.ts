import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { Collider } from "@angry-pixel/collisions";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { Transform } from "@component/gameLogic/Transform";
import { BallCollider } from "@component/physics2d/BallCollider";
import { BoxCollider } from "@component/physics2d/BoxCollider";
import { EdgeCollider } from "@component/physics2d/EdgeCollider";
import { PolygonCollider } from "@component/physics2d/PolygonCollider";
import { TilemapCollider } from "@component/physics2d/TilemapCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";

@injectable(SYSTEM_SYMBOLS.UpdateCollidersAfterRepositionSystem)
export class UpdateCollidersAfterRepositionSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager) {
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
