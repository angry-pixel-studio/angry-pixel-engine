import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { Vector2 } from "@angry-pixel/math";
import { Polygon } from "@angry-pixel/collisions";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { Transform } from "@component/gameLogic/Transform";
import { BoxCollider } from "@component/physics2d/BoxCollider";
import { BaseUpdateColliderShapeSystem } from "./BaseUpdateColliderShapeSystem";

@injectable(SYSTEM_SYMBOLS.UpdateBoxColliderShapeSystem)
export class UpdateBoxColliderShapeSystem extends BaseUpdateColliderShapeSystem implements System {
    constructor(@inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager) {
        super();
    }

    public onUpdate(): void {
        this.entityManager.search(BoxCollider).forEach(({ component: boxCollider, entity }) => {
            if (boxCollider.shapes.length === 0) {
                boxCollider.shapes[0] = new Polygon([new Vector2(), new Vector2(), new Vector2(), new Vector2()]);
            }

            boxCollider.shapes[0].rotation = boxCollider.rotation;
            boxCollider.shapes[0].vertexModel[0].set(-boxCollider.width / 2, -boxCollider.height / 2);
            boxCollider.shapes[0].vertexModel[1].set(-boxCollider.width / 2, boxCollider.height / 2);
            boxCollider.shapes[0].vertexModel[2].set(boxCollider.width / 2, boxCollider.height / 2);
            boxCollider.shapes[0].vertexModel[3].set(boxCollider.width / 2, -boxCollider.height / 2);

            this.updatePositionAndVertices(
                boxCollider.shapes[0],
                boxCollider.offset,
                this.entityManager.getComponent(entity, Transform),
            );
            this.updateBoundingBox(boxCollider.shapes[0]);
            this.updateProjectionAxes(boxCollider.shapes[0]);
        });
    }
}
