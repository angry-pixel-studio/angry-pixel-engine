import { System, SystemGroup } from "../../manager/SystemManager";
import { Transform } from "../../component/Transform";
import { IEntityManager } from "../../manager/EntityManager";

export class TransformSystem extends System {
    constructor(private readonly entityManager: IEntityManager) {
        super();
        this.group = SystemGroup.PostGameLogic;
    }

    public onUpdate(): void {
        this.entityManager
            .search(Transform)
            .filter(({ component: { parent } }) => !parent)
            .forEach(({ component: transform }) => {
                transform.localPosition.copy(transform.position);
                transform.localScale.copy(transform.scale);
                transform.localRotation = transform.rotation;

                this.updateChildren(transform);
            });
    }

    private updateChildren(parent: Transform): void {
        this.entityManager
            .search(Transform)
            .filter(({ component: transform }) => transform.parent === parent)
            .forEach(({ component: transform }) => {
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
