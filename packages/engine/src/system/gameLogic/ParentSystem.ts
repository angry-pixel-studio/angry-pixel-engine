import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systemTypes";
import { Parent } from "@component/gameLogic/Parent";
import { Transform } from "@component/gameLogic/Transform";

@injectable(SYSTEMS.ParentSystem)
export class ParentSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(Parent).forEach(({ entity, component: parent }) => {
            parent.entity = this.entityManager.getComponent(entity, Transform)._parentEntity;
        });
    }
}
