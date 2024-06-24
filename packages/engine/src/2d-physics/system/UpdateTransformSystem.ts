import { SystemBase } from "./System";
import { ITransform } from "../component/Transform";

export class UpdateTransformSystem extends SystemBase {
    public update() {
        this.entityManager
            .getEntities()
            .filter(([e, transform]) => !transform.parent)
            .forEach(([e, transform]) => {
                transform.localPosition.copy(transform.position);
                transform.localScale.copy(transform.scale);
                transform.localRotation = transform.rotation;

                this.updateChildren(transform);
            });
    }

    private updateChildren(parent: ITransform): void {
        this.entityManager
            .getEntities()
            .filter(([e, transform]) => transform.parent === parent)
            .forEach(([e, transform]) => {
                this.translateChild(parent, transform);
                this.updateChildren(transform);
            });
    }

    private translateChild(parent: ITransform, child: ITransform): void {
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
