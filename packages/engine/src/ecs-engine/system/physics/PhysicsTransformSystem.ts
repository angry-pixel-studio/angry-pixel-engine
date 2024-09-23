import { IPhysicsManager } from "../../../2d-physics";
import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { Transform } from "../../component/Transform";
import { TYPES } from "../../../config/types";

export class PhysicsTransformSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.PhysicsManager) private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.physicsManager.removeAllEntities();

        this.entityManager.search(Transform).forEach(({ entity, component: transform }) => {
            this.physicsManager.addTransform(entity, transform);
        });
    }
}
