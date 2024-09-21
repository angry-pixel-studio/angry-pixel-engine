import { IPhysicsManager } from "../../../2d-physics";
import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { RigidBody } from "../../component/RigidBody";
import { TYPES } from "../../config/types";

export class RigidBodySystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.PhysicsManager) private readonly physicsManager: IPhysicsManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(RigidBody).forEach(({ entity, component: rigidBody }) => {
            this.physicsManager.addRigidBody(entity, rigidBody);
        });
    }
}
