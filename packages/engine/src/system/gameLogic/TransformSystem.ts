import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systems";
import { Transform } from "@component/gameLogic/Transform";

const getBranchLength = (transform: Transform): number =>
    transform.parent ? 1 + getBranchLength(transform.parent) : 0;

@injectable(SYSTEMS.TransformSystem)
export class TransformSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager
            .search(Transform)
            .sort((a, b) => getBranchLength(a.component) - getBranchLength(b.component))
            .forEach(({ component: transform, entity }) => {
                if (!transform.parent || !this.entityManager.getEntityForComponent(transform.parent)) {
                    this.updateTransform(transform);
                } else {
                    transform._childEntities = [];
                    transform._parentEntity = this.entityManager.getEntityForComponent(transform.parent);
                    transform.parent._childEntities.push(entity);
                    this.translateChild(transform.parent, transform);
                }
            });
    }

    private updateTransform(transform: Transform): void {
        transform.parent = undefined;
        transform._parentEntity = undefined;
        transform._childEntities = [];

        transform.localPosition.copy(transform.position);
        transform.localScale.copy(transform.scale);
        transform.localRotation = transform.rotation;
    }

    private translateChild(parent: Transform, child: Transform): void {
        child.localRotation = child.rotation + parent.localRotation;
        child.localScale.x = child.scale.x * parent.scale.x;
        child.localScale.y = child.scale.y * parent.scale.y;

        const translatedAngle = Math.atan2(child.position.y, child.position.x) + parent.localRotation;

        child.localPosition.set(
            parent.localPosition.x + child.position.magnitude * Math.cos(translatedAngle),
            parent.localPosition.y + child.position.magnitude * Math.sin(translatedAngle),
        );
    }
}
