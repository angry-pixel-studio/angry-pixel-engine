import { EntityManager, System } from "ecs";
import { inject, injectable } from "ioc";
import { TYPES } from "config/types";
import { SYSTEMS } from "config/systems";
import { Parent } from "component/gameLogic/Parent";
import { Transform } from "component/gameLogic/Transform";

@injectable(SYSTEMS.ParentSystem)
export class ParentSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(Parent).forEach(({ entity, component: parent }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            parent.entity = transform.parent ? this.entityManager.getEntityForComponent(transform.parent) : undefined;
        });
    }
}
