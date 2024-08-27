import { IPhysicsManager, Polygon } from "../../../../2d-physics";
import { Vector2 } from "../../../../math";
import { PolygonCollider } from "../../../component/collider/PolygonCollider";
import { EntityManager } from "../../../../ecs/EntityManager";
import { System } from "../../../../ecs/SystemManager";

export class PolygonColliderSystem implements System {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(PolygonCollider).forEach(({ entity, component: polygonCollider }) => {
            this.createColliderIfNotExists(polygonCollider);

            polygonCollider._collider.layer = polygonCollider.layer;
            polygonCollider._collider.physics = polygonCollider.physics;
            polygonCollider._collider.offset.copy(polygonCollider.offset);
            polygonCollider._collider.shape.rotation = polygonCollider.rotation;
            polygonCollider._collider.shape.vertexModel = polygonCollider.vertexModel;
            polygonCollider._collider.ignoreCollisionsWithLayers =
                polygonCollider.ignoreCollisionsWithLayers.length > 0
                    ? polygonCollider.ignoreCollisionsWithLayers
                    : undefined;

            this.physicsManager.addCollider(entity, polygonCollider._collider);
        });
    }

    private createColliderIfNotExists(polygonCollider: PolygonCollider): void {
        if (!polygonCollider._collider) {
            polygonCollider._collider = {
                entity: undefined,
                id: undefined,
                layer: "",
                offset: new Vector2(),
                shape: new Polygon([]),
                updateCollisions: true,
                physics: true,
                ignoreCollisionsWithLayers: undefined,
            };
        }
    }
}
