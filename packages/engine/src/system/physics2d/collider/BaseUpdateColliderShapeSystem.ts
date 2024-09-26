import { Transform } from "@component/gameLogic/Transform";
import { Vector2 } from "@math";
import { Circumference, Polygon, Shape } from "@physics2d";

export abstract class BaseUpdateColliderShapeSystem {
    private auxMin: Vector2 = new Vector2();
    private auxMax: Vector2 = new Vector2();
    private auxScaledOffset: Vector2 = new Vector2();
    private auxAngle: number;

    protected updatePositionAndVertices(shape: Shape, offset: Vector2, transform: Transform): void {
        // update position
        this.translatePosition(shape, offset, transform);

        if (shape instanceof Polygon) {
            this.auxAngle = shape.rotation + transform.localRotation;
            // scale vertices
            shape.vertexModel.forEach((v, i) =>
                shape.vertices[i].set(v.x * transform.localScale.x, v.y * transform.localScale.y),
            );
            // translate vertices
            shape.vertices.forEach((vertex) =>
                vertex.set(
                    vertex.x * Math.cos(this.auxAngle) - vertex.y * Math.sin(this.auxAngle) + shape.position.x,
                    vertex.x * Math.sin(this.auxAngle) + vertex.y * Math.cos(this.auxAngle) + shape.position.y,
                ),
            );
        } else if (shape instanceof Circumference) {
            // scale radius
            shape.radius *= Math.max(Math.abs(transform.localScale.x), Math.abs(transform.localScale.y));
        }
    }

    private translatePosition(
        shape: Shape,
        offset: Vector2,
        { localPosition, localScale, localRotation }: Transform,
    ): void {
        this.auxScaledOffset.set(offset.x * localScale.x, offset.y * localScale.y);

        if (localRotation !== 0) {
            const translatedAngle = Math.atan2(this.auxScaledOffset.y, this.auxScaledOffset.x) + localRotation;
            shape.position.set(
                localPosition.x + this.auxScaledOffset.magnitude * Math.cos(translatedAngle),
                localPosition.y + this.auxScaledOffset.magnitude * Math.sin(translatedAngle),
            );
        } else {
            Vector2.add(shape.position, localPosition, this.auxScaledOffset);
        }
    }

    protected updateBoundingBox(shape: Shape): void {
        if (shape instanceof Circumference) this.updateCircumferenceBoundingBox(shape);
        else if (shape instanceof Polygon) this.updatePolygonBoundingBox(shape);
    }

    private updateCircumferenceBoundingBox(shape: Circumference): void {
        shape.boundingBox.set(
            shape.position.x - shape.radius,
            shape.position.y - shape.radius,
            shape.radius * 2,
            shape.radius * 2,
        );
    }

    private updatePolygonBoundingBox(shape: Polygon): void {
        this.auxMin.x = shape.vertices[0].x;
        this.auxMin.y = shape.vertices[0].y;
        this.auxMax.x = shape.vertices[0].x;
        this.auxMax.y = shape.vertices[0].y;

        shape.vertices.forEach((vertex, i) => {
            this.auxMin.x = Math.min(vertex.x, this.auxMin.x);
            this.auxMin.y = Math.min(vertex.y, this.auxMin.y);
            this.auxMax.x = Math.max(vertex.x, this.auxMax.x);
            this.auxMax.y = Math.max(vertex.y, this.auxMax.y);
        });

        shape.boundingBox.set(
            this.auxMin.x,
            this.auxMin.y,
            this.auxMax.x - this.auxMin.x,
            this.auxMax.y - this.auxMin.y,
        );
    }

    protected updateProjectionAxes(shape: Shape): void {
        if (shape.vertices.length > 2) {
            for (let i = 0; i < shape.vertices.length; i++) {
                Vector2.normal(
                    shape.projectionAxes[i],
                    Vector2.subtract(
                        shape.projectionAxes[i],
                        shape.vertices[i + 1] ?? shape.vertices[0],
                        shape.vertices[i],
                    ),
                );
            }
        } else {
            Vector2.normal(
                shape.projectionAxes[0],
                Vector2.subtract(shape.projectionAxes[0], shape.vertices[1], shape.vertices[0]),
            );
        }
    }
}
