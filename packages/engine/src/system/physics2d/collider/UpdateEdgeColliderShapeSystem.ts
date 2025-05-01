import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { Vector2 } from "@math";
import { Polygon } from "@collisions2d";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { Transform } from "@component/gameLogic/Transform";
import { EdgeCollider } from "@component/physics2d/EdgeCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";

@injectable(SYSTEM_TYPES.UpdateEdgeColliderShapeSystem)
export class UpdateEdgeColliderShapeSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        this.entityManager.search(EdgeCollider).forEach(({ component: edgeCollider, entity }) => {
            for (let i = 0; i < edgeCollider.vertexModel.length - 1; i++) {
                if (!edgeCollider.shapes[i]) edgeCollider.shapes[i] = new Polygon([new Vector2(), new Vector2()]);

                edgeCollider.shapes[i].rotation = edgeCollider.rotation;
                edgeCollider.shapes[i].vertexModel = [edgeCollider.vertexModel[i], edgeCollider.vertexModel[i + 1]];

                this.updatePositionAndVertices(
                    edgeCollider.shapes[i],
                    edgeCollider.offset,
                    this.entityManager.getComponent(entity, Transform),
                );
                this.updateBoundingBox(edgeCollider.shapes[i]);
                this.updateProjectionAxes(edgeCollider.shapes[i]);
            }
        });
    }
}
