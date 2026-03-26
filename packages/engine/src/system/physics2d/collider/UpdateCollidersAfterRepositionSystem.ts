import { ComponentType, EntityManager, System } from "@angry-pixel/ecs";
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

const colliderTypes: Set<ComponentType<Collider>> = new Set([
    BoxCollider,
    BallCollider,
    PolygonCollider,
    EdgeCollider,
    TilemapCollider,
]);

@injectable(SYSTEM_SYMBOLS.UpdateCollidersAfterRepositionSystem)
export class UpdateCollidersAfterRepositionSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        this.entityManager
            .search(RigidBody, (rigidBody) => rigidBody.type === RigidBodyType.Dynamic)
            .forEach(({ entity }) => {
                const transform = this.entityManager.getComponent(entity, Transform);

                for (const type of colliderTypes) {
                    if (this.entityManager.hasComponent(entity, type)) {
                        const collider = this.entityManager.getComponent(entity, type);
                        collider.shapes.forEach((shape) => {
                            this.updatePositionAndVertices(shape, collider.offset, transform);
                            this.updateBoundingBox(shape);
                        });
                    }
                }
            });
    }
}
