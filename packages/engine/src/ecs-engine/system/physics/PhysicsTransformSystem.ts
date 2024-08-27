import { IPhysicsManager } from "../../../2d-physics";
import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { Transform } from "../../component/Transform";

export class PhysicsTransformSystem implements System {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.physicsManager.removeAllEntities();

        this.entityManager.search(Transform).forEach(({ entity, component: transform }) => {
            this.physicsManager.addTransform(entity, transform);
        });
    }
}
