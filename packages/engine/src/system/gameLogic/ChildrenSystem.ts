import { Children } from "@component/gameLogic/Children";
import { Transform } from "@component/gameLogic/Transform";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systemTypes";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";

@injectable(SYSTEMS.ChildrenSystem)
export class ChildrenSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(Children).forEach(({ entity, component: children }) => {
            children.entities = this.entityManager.getComponent(entity, Transform)._childEntities;
        });
    }
}
