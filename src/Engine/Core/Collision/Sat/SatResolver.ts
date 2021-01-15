import { Vector2 } from "../../../Math/Vector2";
import { Shape, ShapeType } from "../Shape/Shape";
import { SatData } from "./SatData";
import { ShapeAxisProjection } from "./ShapeAxisProjection";

export class SatResolver {
    private currentOverlap: number;
    private minOverlap: number;
    private smallestAxis: Vector2;
    private vertexShape: Shape;

    public getSatData(shape1: Shape, shape2: Shape): SatData | null {
        this.currentOverlap = null;
        this.minOverlap = null;
        this.smallestAxis = null;
        this.vertexShape = null;

        const axes: Vector2[] = this.findAxes(shape1, shape2);

        const firstShapeAxes: number = this.getShapeAxes(shape1);

        for (let i = 0; i < axes.length; i++) {
            const proj1: ShapeAxisProjection = this.projShapeOntoAxis(axes[i], shape1);
            const proj2: ShapeAxisProjection = this.projShapeOntoAxis(axes[i], shape2);

            this.currentOverlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if (this.currentOverlap < 0) {
                return null;
            }

            // to prevent containment (bigger shape containing smaller shape)
            if ((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)) {
                const mins = Math.abs(proj1.min - proj2.min);
                const maxs = Math.abs(proj1.max - proj2.max);
                if (mins < maxs) {
                    this.currentOverlap += mins;
                } else {
                    this.currentOverlap += maxs;
                    axes[i] = axes[i].mult(-1);
                }
            }

            if (this.currentOverlap < this.minOverlap || this.minOverlap === null) {
                this.minOverlap = this.currentOverlap;
                this.smallestAxis = axes[i];

                // esto es para diferenciar si el vertice con el minimo overlap pertenece al primer objeto o al segundo
                if (i < firstShapeAxes) {
                    this.vertexShape = shape2;
                    if (proj1.max > proj2.max) {
                        this.smallestAxis = axes[i].mult(-1); // la direccion del vertice es negada para usarla como direccion de respuesta
                    }
                } else {
                    this.vertexShape = shape1;
                    if (proj1.max < proj2.max) {
                        this.smallestAxis = axes[i].mult(-1); // idem
                    }
                }
            }
        }

        const contactVertex = this.projShapeOntoAxis(this.smallestAxis, this.vertexShape).collisionVertex;

        if (this.vertexShape === shape2) {
            this.smallestAxis = this.smallestAxis.mult(-1);
        }

        return new SatData(this.minOverlap, this.smallestAxis, contactVertex);
    }

    private findAxes(shape1: Shape, shape2: Shape): Vector2[] {
        const axes: Vector2[] = [];

        // TODO: make the shapes retrieve their own axes
        if (shape1.type === ShapeType.Rectangle) {
            axes.push(Vector2.normal(new Vector2(), shape1.direction));
            axes.push(shape1.direction);
        }

        if (shape2.type === ShapeType.Rectangle) {
            axes.push(Vector2.normal(new Vector2(), shape1.direction));
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
            const p = Vector2.dot(axis, shape.vertex[i]);
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
