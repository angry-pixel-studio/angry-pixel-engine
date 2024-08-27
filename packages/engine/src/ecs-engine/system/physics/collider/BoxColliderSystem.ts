import { IPhysicsManager, Polygon } from "../../../../2d-physics";
import { EntityManager } from "../../../../ecs/EntityManager";
import { System } from "../../../../ecs/SystemManager";
import { Vector2 } from "../../../../math";
import { BoxCollider } from "../../../component/collider/BoxCollider";

export class BoxColliderSystem implements System {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(BoxCollider).forEach(({ entity, component: boxCollider }) => {
            this.createColliderIfNotExists(boxCollider);

            boxCollider._collider.layer = boxCollider.layer;
            boxCollider._collider.physics = boxCollider.physics;
            boxCollider._collider.offset.copy(boxCollider.offset);
            boxCollider._collider.shape.rotation = boxCollider.rotation;
            boxCollider._collider.shape.vertexModel[0].set(-boxCollider.width / 2, -boxCollider.height / 2);
            boxCollider._collider.shape.vertexModel[1].set(-boxCollider.width / 2, boxCollider.height / 2);
            boxCollider._collider.shape.vertexModel[2].set(boxCollider.width / 2, boxCollider.height / 2);
            boxCollider._collider.shape.vertexModel[3].set(boxCollider.width / 2, -boxCollider.height / 2);
            boxCollider._collider.ignoreCollisionsWithLayers =
                boxCollider.ignoreCollisionsWithLayers.length > 0 ? boxCollider.ignoreCollisionsWithLayers : undefined;

            this.physicsManager.addCollider(entity, boxCollider._collider);
        });
    }

    private createColliderIfNotExists(boxCollider: BoxCollider): void {
        if (!boxCollider._collider) {
            boxCollider._collider = {
                entity: undefined,
                id: undefined,
                layer: "",
                offset: new Vector2(),
                shape: new Polygon([new Vector2(), new Vector2(), new Vector2(), new Vector2()]),
                updateCollisions: true,
                physics: true,
                ignoreCollisionsWithLayers: undefined,
            };
        }
    }
}
