import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { Children } from "../../component/Children";
import { Transform } from "../../component/Transform";
import { TYPES } from "../../config/types";

export class ChildrenSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(Children).forEach(({ entity, component: children }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            children.entities = this.entityManager.search(Transform, { parent: transform }).map(({ entity }) => entity);
        });
    }
}
