import { Vector2 } from "../../../math";
import { ICollisionResolution, ICollisionResolver } from "./ICollisionResolver";
import { Circumference, IShape } from "../../component/Shape";

type AxisProjection = {
    min: number;
    max: number;
};

export class SatResolver implements ICollisionResolver {
    private axes: Vector2[];
    private projA: AxisProjection = { min: 0, max: 0 };
    private projB: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;
    private smallestAxis: Vector2 = new Vector2();
    private invertAxis: boolean;
    private distance: Vector2 = new Vector2(Infinity, Infinity);
    private cache: Vector2 = new Vector2();

    public resolve(shapeA: IShape, shapeB: IShape): ICollisionResolution {
        this.minOverlap = Infinity;

        if (shapeA instanceof Circumference) this.setCircumferenceAxis(shapeA, shapeB);
        else if (shapeB instanceof Circumference) this.setCircumferenceAxis(shapeB, shapeA);

        this.axes = [...shapeA.projectionAxes];
        shapeB.projectionAxes.forEach((pa) => (this.axes.some((a) => a.equals(pa)) ? undefined : this.axes.push(pa)));

        for (let i = 0; i < this.axes.length; i++) {
            if (shapeA instanceof Circumference) this.setCircumferenceVertices(shapeA, this.axes[i]);
            else if (shapeB instanceof Circumference) this.setCircumferenceVertices(shapeB, this.axes[i]);

            this.projectShapeOntoAxis(this.projA, shapeA, this.axes[i]);
            this.projectShapeOntoAxis(this.projB, shapeB, this.axes[i]);

            this.currentOverlap = Math.min(this.projA.max, this.projB.max) - Math.max(this.projA.min, this.projB.min);

            if (this.currentOverlap < 0) return undefined;

            this.invertAxis = true;

            // prevent containment
            if (
                (this.projA.max > this.projB.max && this.projA.min < this.projB.min) ||
                (this.projA.max < this.projB.max && this.projA.min > this.projB.min)
            ) {
                const mins = Math.abs(this.projA.min - this.projB.min);
                const maxs = Math.abs(this.projA.max - this.projB.max);

                if (mins < maxs) {
                    this.currentOverlap += mins;
                } else {
                    this.currentOverlap += maxs;
                    Vector2.scale(this.axes[i], this.axes[i], -1);
                    this.invertAxis = false;
                }
            }

            if (this.currentOverlap < this.minOverlap) {
                this.minOverlap = this.currentOverlap;
                this.smallestAxis.copy(this.axes[i]);

                if (this.invertAxis && this.projA.max < this.projB.max) {
                    Vector2.scale(this.smallestAxis, this.axes[i], -1);
                }
            }
        }

        return {
            direction: Vector2.scale(new Vector2(), this.smallestAxis, -1),
            penetration: this.minOverlap,
        };
    }

    private projectShapeOntoAxis(projection: AxisProjection, shape: IShape, axis: Vector2): AxisProjection {
        projection.min = Infinity;
        projection.max = -Infinity;

        shape.vertices.forEach((vertex: Vector2) => {
            projection.min = Math.min(Vector2.dot(axis, vertex), projection.min);
            projection.max = Math.max(Vector2.dot(axis, vertex), projection.max);
        });

        return projection;
    }

    private setCircumferenceAxis(c: Circumference, s: IShape): void {
        this.distance.set(Infinity, Infinity);

        s.vertices.forEach((vertex) => {
            Vector2.subtract(this.cache, vertex, c.position);

            if (this.cache.magnitude < this.distance.magnitude) {
                this.distance.copy(this.cache);
            }
        });

        Vector2.unit(c.projectionAxes[0], this.distance);
    }

    private setCircumferenceVertices(c: Circumference, axis: Vector2): void {
        Vector2.add(c.vertices[0], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), -c.radius));
        Vector2.add(c.vertices[1], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), c.radius));
    }
}
