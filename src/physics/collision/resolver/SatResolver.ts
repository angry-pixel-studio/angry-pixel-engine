import { Vector2 } from "angry-pixel-math";
import { Circumference } from "../shape/Circumference";
import { Shape, ShapeType } from "../shape/Shape";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";

type AxisProjection = {
    min: number;
    max: number;
};

export class SatResolver implements CollisionResolver {
    private axes: Vector2[];
    private projA: AxisProjection = { min: 0, max: 0 };
    private projB: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;
    private displacementDirection: Vector2 = new Vector2();

    private distance: Vector2 = new Vector2(Infinity, Infinity);
    private cache: Vector2 = new Vector2();

    public resolve(shapeA: Shape, shapeB: Shape): CollisionResolution | null {
        this.currentOverlap = null;
        this.minOverlap = null;

        if (shapeA.type === ShapeType.Circumference) {
            this.setCircumferenceAxis(shapeA as Circumference, shapeB);
        } else if (shapeB.type === ShapeType.Circumference) {
            this.setCircumferenceAxis(shapeB as Circumference, shapeA);
        }

        this.axes = [...shapeA.projectionAxes, ...shapeB.projectionAxes];

        for (let i = 0; i < this.axes.length; i++) {
            if (shapeA.type === ShapeType.Circumference) {
                this.setCircumferenceVertices(shapeA as Circumference, this.axes[i]);
            } else if (shapeB.type === ShapeType.Circumference) {
                this.setCircumferenceVertices(shapeB as Circumference, this.axes[i]);
            }

            this.projectShapeOntoAxis(this.projA, shapeA, this.axes[i]);
            this.projectShapeOntoAxis(this.projB, shapeB, this.axes[i]);

            this.currentOverlap = Math.min(this.projA.max, this.projB.max) - Math.max(this.projA.min, this.projB.min);
            if (this.currentOverlap < 0) {
                return null;
            }

            // to prevent containment (bigger shape containing smaller shape)
            this.preventContainment(i);

            if (this.currentOverlap < this.minOverlap || this.minOverlap === null) {
                this.minOverlap = this.currentOverlap;
                this.displacementDirection.copy(this.axes[i]);

                // negate the axis in order to use as displacment direction
                if (this.projA.max < this.projB.max) {
                    Vector2.scale(this.displacementDirection, this.displacementDirection, -1);
                }
            }
        }

        return {
            penetration: this.minOverlap,
            displacementDirection: this.displacementDirection.clone(),
            direction: Vector2.scale(new Vector2(), this.displacementDirection, -1),
        };
    }

    private projectShapeOntoAxis(projection: AxisProjection, shape: Shape, axis: Vector2): AxisProjection {
        projection.min = Vector2.dot(axis, shape.vertices[0]);
        projection.max = projection.min;

        shape.vertices.forEach((vertex: Vector2) => {
            projection.min = Math.min(Vector2.dot(axis, vertex), projection.min);
            projection.max = Math.max(Vector2.dot(axis, vertex), projection.max);
        });

        return projection;
    }

    private preventContainment(axisIndex: number): void {
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
                Vector2.scale(this.axes[axisIndex], this.axes[axisIndex], -1);
            }
        }
    }

    private setCircumferenceAxis(c: Circumference, s: Shape): void {
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
