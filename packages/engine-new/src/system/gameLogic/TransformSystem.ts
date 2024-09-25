import { EntityManager, System } from "ecs";
import { inject, injectable } from "ioc";
import { TYPES } from "config/types";
import { SYSTEMS } from "config/systems";
import { Transform } from "component/gameLogic/Transform";

@injectable(SYSTEMS.TransformSystem)
export class TransformSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(Transform).forEach(({ component: transform }) => {
            if (!transform.parent) {
                this.updateTransform(transform);
            } else if (!this.entityManager.getEntityForComponent(transform.parent)) {
                transform.parent = undefined;
                this.updateTransform(transform);
            }
        });
    }

    private updateTransform(transform: Transform): void {
        transform.localPosition.copy(transform.position);
        transform.localScale.copy(transform.scale);
        transform.localRotation = transform.rotation;

        this.updateChildren(transform);
    }

    private updateChildren(parent: Transform): void {
        this.entityManager.search(Transform, { parent }).forEach(({ component: transform }) => {
            this.translateChild(parent, transform);
            this.updateChildren(transform);
        });
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
