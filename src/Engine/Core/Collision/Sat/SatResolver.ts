import { Vector2 } from "../../../Math/Vector2";
import { Shape, ShapeType } from "../Shape/Shape";
import { SatData } from "./SatData";
import { ShapeAxisProjection } from "./ShapeAxisProjection";

export class SatResolver {
    public getSatData(shape1: Shape, shape2: Shape): SatData | null {
        let minOverlap: number = null;
        let smallestAxis: Vector2;
        let vertexObj: Shape;

        let axes: Vector2[] = this.findAxes(shape1, shape2);

        const firstShapeAxes: number = this.getShapeAxes(shape1);

        for (let i = 0; i < axes.length; i++) {
            const proj1: ShapeAxisProjection = this.projShapeOntoAxis(axes[i], shape1);
            const proj2: ShapeAxisProjection = this.projShapeOntoAxis(axes[i], shape2);

            let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if (overlap < 0) {
                return null;
            }

            if ((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)) {
                let mins = Math.abs(proj1.min - proj2.min);
                let maxs = Math.abs(proj1.max - proj2.max);
                if (mins < maxs) {
                    overlap += mins;
                } else {
                    overlap += maxs;
                    axes[i] = axes[i].mult(-1);
                }
            }

            if (overlap < minOverlap || minOverlap === null) {
                minOverlap = overlap;
                smallestAxis = axes[i];

                // esto es para diferenciar si el vertice con el minimo overlap pertenece al primer objeto o al segundo
                if (i < firstShapeAxes) {
                    vertexObj = shape2;
                    if (proj1.max > proj2.max) {
                        smallestAxis = axes[i].mult(-1); // la direccion del vertice es negada para usarla como direccion de respuesta
                    }
                } else {
                    vertexObj = shape1;
                    if (proj1.max < proj2.max) {
                        smallestAxis = axes[i].mult(-1); // idem
                    }
                }
            }
        }

        const contactVertex = this.projShapeOntoAxis(smallestAxis, vertexObj).collisionVertex;

        if (vertexObj === shape2) {
            smallestAxis = smallestAxis.mult(-1);
        }

        return new SatData(minOverlap, smallestAxis, contactVertex);
    }

    private findAxes(shape1: Shape, shape2: Shape): Vector2[] {
        const axes: Vector2[] = [];

        if (shape1.type === ShapeType.Rectangle) {
            axes.push(shape1.direction.normal());
            axes.push(shape1.direction);
        }

        if (shape2.type === ShapeType.Rectangle) {
            axes.push(shape2.direction.normal());
            axes.push(shape2.direction);
        }

        return axes;
    }

    // returns the number of the axes that belong to an object
    private getShapeAxes(shape: Shape): number {
        if (shape.type === ShapeType.Rectangle) {
            return 2;
        }
    }

    //returns the min and max projection values of a shape onto an axis
    private projShapeOntoAxis(axis: Vector2, shape: Shape): ShapeAxisProjection {
        let min = Vector2.dot(axis, shape.vertex[0]);
        let max = min;
        let collisionVertex = shape.vertex[0];

        for (let i = 0; i < shape.vertex.length; i++) {
            let p = Vector2.dot(axis, shape.vertex[i]);
            if (p < min) {
                min = p;
                collisionVertex = shape.vertex[i];
            }
            if (p > max) {
                max = p;
            }
        }

        return new ShapeAxisProjection(min, max, collisionVertex);
    }
}
