import { IPhysicsManager } from "../../../2d-physics";
import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { RigidBody } from "../../component/RigidBody";

export class RigidBodySystem implements System {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(RigidBody).forEach(({ entity, component: rigidBody }) => {
            this.physicsManager.addRigidBody(entity, rigidBody);
        });
    }
}
