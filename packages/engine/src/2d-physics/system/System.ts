import { IEntityManager } from "../EntityManager";

export abstract class SystemBase {
    constructor(protected readonly entityManager: IEntityManager) {}
}
