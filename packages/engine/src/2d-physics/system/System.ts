import { IPhysicsEntityManager } from "../PhysicsEntityManager";

export abstract class SystemBase {
    constructor(protected readonly entityManager: IPhysicsEntityManager) {}
}
