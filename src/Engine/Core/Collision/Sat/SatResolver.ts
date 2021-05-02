import { Vector2 } from "../../../Math/Vector2";
import { Shape } from "../Shape/Shape";
import { SatData } from "./SatData";
import { ShapeAxisProjection } from "./ShapeAxisProjection";

export class SatResolver {
    private proj1: ShapeAxisProjection = new ShapeAxisProjection();
    private proj2: ShapeAxisProjection = new ShapeAxisProjection();
    private currentOverlap: number;
    private vertexShape: Shape;

    public getSatData(shape1: Shape, shape2: Shape): SatData | null {
        this.currentOverlap = null;
        this.vertexShape = null;

        let minOverlap: number = null;
        let smallestAxis: Vector2 = null;

        const axes: Vector2[] = [...shape1.getAxes(), ...shape2.getAxes()];
        const firstShapeAxes: number = shape1.getAxes().length;

        for (let i = 0; i < axes.length; i++) {
            this.projectShapeOntoAxis(this.proj1, axes[i], shape1);
            this.projectShapeOntoAxis(this.proj2, axes[i], shape2);

            this.currentOverlap = Math.min(this.proj1.max, this.proj2.max) - Math.max(this.proj1.min, this.proj2.min);
            if (this.currentOverlap < 0) {
                return null;
            }

            // to prevent containment (bigger shape containing smaller shape)
            if (
                (this.proj1.max > this.proj2.max && this.proj1.min < this.proj2.min) ||
                (this.proj1.max < this.proj2.max && this.proj1.min > this.proj2.min)
            ) {
                const mins = Math.abs(this.proj1.min - this.proj2.min);
                const maxs = Math.abs(this.proj1.max - this.proj2.max);
                if (mins < maxs) {
                    this.currentOverlap += mins;
                } else {
                    this.currentOverlap += maxs;
                    Vector2.scale(axes[i], axes[i], -1);
                }
            }

            if (this.currentOverlap < minOverlap || minOverlap === null) {
                minOverlap = this.currentOverlap;
                smallestAxis = axes[i];

                // esto es para diferenciar si el vertice con el minimo overlap pertenece al primer objeto o al segundo
                if (i < firstShapeAxes) {
                    this.vertexShape = shape2;
                    if (this.proj1.max > this.proj2.max) {
                        Vector2.scale(smallestAxis, axes[i], -1); // la direccion del vertice es negada para usarla como direccion de respuesta
                    }
                } else {
                    this.vertexShape = shape1;
                    if (this.proj1.max < this.proj2.max) {
                        Vector2.scale(smallestAxis, axes[i], -1); // idem
                    }
                }
            }
        }

        const contactVertex = this.projectShapeOntoAxis(new ShapeAxisProjection(), smallestAxis, this.vertexShape)
            .collisionVertex;

        if (this.vertexShape === shape2) {
            Vector2.scale(smallestAxis, smallestAxis, -1);
        }

        return new SatData(minOverlap, smallestAxis, contactVertex);
    }

    private projectShapeOntoAxis(projection: ShapeAxisProjection, axis: Vector2, shape: Shape): ShapeAxisProjection {
        projection.min = Vector2.dot(axis, shape.vertices[0]);
        projection.max = projection.min;
        projection.collisionVertex = shape.vertices[0];

        for (let i = 0; i < shape.vertices.length; i++) {
            const p = Vector2.dot(axis, shape.vertices[i]);
            if (p < projection.min) {
                projection.min = p;
                projection.collisionVertex = shape.vertices[i];
            }
            if (p > projection.max) {
                projection.max = p;
            }
        }

        return projection;
    }
}
