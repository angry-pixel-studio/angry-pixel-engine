import { IPhysicsManager, Polygon } from "../../../../2d-physics";
import { EntityManager } from "../../../../ecs/EntityManager";
import { System } from "../../../../ecs/SystemManager";
import { inject } from "../../../../ioc/container";
import { Vector2 } from "../../../../math";
import { EdgeCollider } from "../../../component/collider/EdgeCollider";
import { TYPES } from "../../../config/types";

export class EdgeColliderSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.PhysicsManager) private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(EdgeCollider).forEach(({ entity, component: edgeCollider }) => {
            for (let i = 0; i < edgeCollider.vertexModel.length - 1; i++) {
                this.updateColliders(edgeCollider, i);

                edgeCollider._colliders[i].offset.copy(edgeCollider.offset);
                edgeCollider._colliders[i].physics = edgeCollider.physics;
                edgeCollider._colliders[i].layer = edgeCollider.layer;
                edgeCollider._colliders[i].shape.rotation = edgeCollider.rotation;
                edgeCollider._colliders[i].shape.vertexModel = [
                    edgeCollider.vertexModel[i],
                    edgeCollider.vertexModel[i + 1],
                ];
                edgeCollider._colliders[i].ignoreCollisionsWithLayers =
                    edgeCollider.ignoreCollisionsWithLayers.length > 0
                        ? edgeCollider.ignoreCollisionsWithLayers
                        : undefined;

                this.physicsManager.addCollider(entity, edgeCollider._colliders[i]);
            }
        });
    }

    private updateColliders(edgeCollider: EdgeCollider, index: number): void {
        if (!edgeCollider._colliders[index]) {
            edgeCollider._colliders[index] = {
                entity: undefined,
                id: undefined,
                layer: "",
                offset: new Vector2(),
                shape: new Polygon([new Vector2(), new Vector2()]),
                updateCollisions: true,
                physics: true,
                ignoreCollisionsWithLayers: undefined,
            };
        }
    }
}
