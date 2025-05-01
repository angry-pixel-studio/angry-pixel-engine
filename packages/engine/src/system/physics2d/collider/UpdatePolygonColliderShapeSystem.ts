import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { Polygon } from "@collisions2d";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { Transform } from "@component/gameLogic/Transform";
import { PolygonCollider } from "@component/physics2d/PolygonCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";

@injectable(SYSTEM_TYPES.UpdatePolygonColliderShapeSystem)
export class UpdatePolygonColliderShapeSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        this.entityManager.search(PolygonCollider).forEach(({ component: polygonCollider, entity }) => {
            if (polygonCollider.shapes.length === 0) {
                polygonCollider.shapes[0] = new Polygon([]);
            }

            polygonCollider.shapes[0].rotation = polygonCollider.rotation;
            polygonCollider.shapes[0].vertexModel = polygonCollider.vertexModel;

            this.updatePositionAndVertices(
                polygonCollider.shapes[0],
                polygonCollider.offset,
                this.entityManager.getComponent(entity, Transform),
            );
            this.updateBoundingBox(polygonCollider.shapes[0]);
            this.updateProjectionAxes(polygonCollider.shapes[0]);
        });
    }
}
