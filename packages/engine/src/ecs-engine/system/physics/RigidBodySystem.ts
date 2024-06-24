import { IPhysicsManager } from "../../../2d-physics";
import { System, SystemGroup } from "../../manager/SystemManager";
import { RigidBody } from "../../component/RigidBody";
import { IEntityManager } from "../../manager/EntityManager";

export class RigidBodySystem extends System {
    constructor(
        private readonly entityManager: IEntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {
        super();
        this.group = SystemGroup.Physics;
    }

    public onUpdate(): void {
        this.entityManager.search(RigidBody).forEach(({ entity, component: rigidBody }) => {
            this.physicsManager.addRigidBody(entity, rigidBody);
        });
    }
}
