import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { Parent } from "../../component/Parent";
import { Transform } from "../../component/Transform";

export class ParentSystem implements System {
    constructor(private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(Parent).forEach(({ entity, component: parent }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            parent.entity = transform.parent ? this.entityManager.getEntityForComponent(transform.parent) : undefined;
        });
    }
}
