import { Entity, EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systemTypes";
import { Transform } from "@component/gameLogic/Transform";
import { Vector2 } from "@math";

@injectable(SYSTEMS.TransformSystem)
export class TransformSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager
            .search(Transform)
            .sort((a, b) => this.getBranchLength(a.entity) - this.getBranchLength(b.entity))
            .forEach(({ component: transform, entity }) => {
                const parentEntity = this.entityManager.getParent(entity);
                if (
                    !parentEntity ||
                    !this.entityManager.isEntityEnabled(parentEntity) ||
                    !this.entityManager.isComponentEnabled(parentEntity, Transform)
                ) {
                    if (transform._parent) this.removeParent(transform);
                    this.updateTransform(transform);
                } else {
                    if (!transform._parent) {
                        transform._parent = this.entityManager.getComponent<Transform>(parentEntity, Transform);
                        if (transform._awake) {
                            Vector2.subtract(transform.position, transform.localPosition, transform._parent.position);
                        }
                    }

                    if (transform._parent) this.translateChild(transform);
                    else this.updateTransform(transform);
                }
                transform._awake = true;
            });
    }

    private getBranchLength(entity: Entity): number {
        const parent = this.entityManager.getParent(entity);
        return parent ? 1 + this.getBranchLength(parent) : 0;
    }

    private removeParent(transform: Transform): void {
        transform._parent = undefined;
        transform.position.copy(transform.localPosition);
        transform.rotation = transform.localRotation;
    }

    private updateTransform(transform: Transform): void {
        transform.localPosition.copy(transform.position);
        transform.localScale.copy(transform.scale);
        transform.localRotation = transform.rotation;
        transform._parent = undefined;
    }

    private translateChild(child: Transform): void {
        child.localRotation = child.rotation + child._parent.localRotation;
        child.localScale.x = child.scale.x * child._parent.scale.x;
        child.localScale.y = child.scale.y * child._parent.scale.y;

        const translatedAngle = Math.atan2(child.position.y, child.position.x) + child._parent.localRotation;

        child.localPosition.set(
            child._parent.localPosition.x + child.position.magnitude * Math.cos(translatedAngle),
            child._parent.localPosition.y + child.position.magnitude * Math.sin(translatedAngle),
        );
    }
}
