import { Vector2 } from "../../math";
import { Circumference, IShape, Polygon } from "../component/Shape";
import { ITransform } from "../component/Transform";
import { SystemBase } from "./System";

export class UpdateColliderSystemShape extends SystemBase {
    private cacheMin: Vector2 = new Vector2();
    private cacheMax: Vector2 = new Vector2();
    private scaledOffset: Vector2 = new Vector2();
    private angle: number;

    public update() {
        this.entityManager
            .getEntities()
            .filter((e) => e[3].length > 0)
            .forEach(([entity, transform, rb, colliders]) => {
                colliders.forEach(({ shape, offset }) => {
                    this.updatePositionAndVertices(shape, offset, transform);
                    this.updateBoundingBox(shape);
                    this.updateProjectionAxes(shape);
                });
            });
    }

    private updatePositionAndVertices(
        shape: IShape,
        offset: Vector2,
        { localPosition, localScale, localRotation }: ITransform,
    ): void {
        this.scaledOffset.set(offset.x * localScale.x, offset.y * localScale.y);

        // update position
        Vector2.add(shape.position, localPosition, this.scaledOffset);

        if (shape instanceof Polygon) {
            this.angle = shape.rotation + localRotation;
            // scale vertices
            shape.vertexModel.forEach((v, i) => shape.vertices[i].set(v.x * localScale.x, v.y * localScale.y));
            // translate vertices
            shape.vertices.forEach((vertex) =>
                vertex.set(
                    vertex.x * Math.cos(this.angle) - vertex.y * Math.sin(this.angle) + shape.position.x,
                    vertex.x * Math.sin(this.angle) + vertex.y * Math.cos(this.angle) + shape.position.y,
                ),
            );
        } else if (shape instanceof Circumference) {
            // scale radius
            shape.radius *= Math.max(Math.abs(localScale.x), Math.abs(localScale.y));
        }
    }

    private updateBoundingBox(shape: IShape): void {
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
        this.cacheMin.x = shape.vertices[0].x;
        this.cacheMin.y = shape.vertices[0].y;
        this.cacheMax.x = shape.vertices[0].x;
        this.cacheMax.y = shape.vertices[0].y;

        shape.vertices.forEach((vertex, i) => {
            this.cacheMin.x = Math.min(vertex.x, this.cacheMin.x);
            this.cacheMin.y = Math.min(vertex.y, this.cacheMin.y);
            this.cacheMax.x = Math.max(vertex.x, this.cacheMax.x);
            this.cacheMax.y = Math.max(vertex.y, this.cacheMax.y);
        });

        shape.boundingBox.set(
            this.cacheMin.x,
            this.cacheMin.y,
            this.cacheMax.x - this.cacheMin.x,
            this.cacheMax.y - this.cacheMin.y,
        );
    }

    private updateProjectionAxes(shape: IShape): void {
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
