import { IPhysicsManager } from "../../../2d-physics";
import { System, SystemGroup } from "../../manager/SystemManager";
import { Transform } from "../../component/Transform";
import { IEntityManager } from "../../manager/EntityManager";

export class PhysicsTransformSystem extends System {
    constructor(
        private readonly entityManager: IEntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {
        super();
        this.group = SystemGroup.Physics;
    }

    public onUpdate(): void {
        this.physicsManager.removeAllEntities();

        this.entityManager.search(Transform).forEach(({ entity, component: transform }) => {
            this.physicsManager.addTransform(entity, transform);
        });
    }
}
