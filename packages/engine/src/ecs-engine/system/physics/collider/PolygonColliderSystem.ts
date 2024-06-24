import { IPhysicsManager, Polygon } from "../../../../2d-physics";
import { IEntityManager } from "../../../manager/EntityManager";
import { Vector2 } from "../../../../math";
import { System, SystemGroup } from "../../../manager/SystemManager";
import { PolygonCollider } from "../../../component/collider/PolygonCollider";

export class PolygonColliderSystem extends System {
    constructor(
        private readonly entityManager: IEntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {
        super();
        this.group = SystemGroup.Physics;
    }

    public onUpdate(): void {
        this.entityManager.search(PolygonCollider).forEach(({ entity, component: polygonCollider }) => {
            this.createColliderIfNotExists(polygonCollider);

            polygonCollider._collider.layer = polygonCollider.layer;
            polygonCollider._collider.physics = polygonCollider.physics;
            polygonCollider._collider.offset.copy(polygonCollider.offset);
            polygonCollider._collider.shape.rotation = polygonCollider.rotation;
            polygonCollider._collider.shape.vertexModel = polygonCollider.vertexModel;

            this.physicsManager.addCollider(entity, polygonCollider._collider);
        });
    }

    private createColliderIfNotExists(polygonCollider: PolygonCollider): void {
        if (!polygonCollider._collider) {
            polygonCollider._collider = {
                layer: "",
                offset: new Vector2(),
                shape: new Polygon([]),
                updateCollisions: true,
                physics: true,
            };
        }
    }
}
