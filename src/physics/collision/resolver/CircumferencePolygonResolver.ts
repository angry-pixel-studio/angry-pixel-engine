import { Vector2 } from "../../../math/Vector2";
import { Circumference } from "../shape/Circumference";
import { Polygon } from "../shape/Polygon";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";

type AxisProjection = {
    min: number;
    max: number;
};

export class CircumferencePolygonResolver implements CollisionResolver {
    private axes: Vector2[];
    private projA: AxisProjection = { min: 0, max: 0 };
    private projB: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;
    private displaceDirection: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    private closestVertex: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2(Infinity, Infinity);
    private newDistance: Vector2 = new Vector2();
    private circumferenceAxis: Vector2 = new Vector2();
    private cache: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Polygon, invert: boolean = false): CollisionResolution {
        this.distance.set(Infinity, Infinity);
        this.currentOverlap = null;
        this.minOverlap = null;

        this.findClosestVertex(shapeA, shapeB);

        this.axes = [Vector2.unit(this.circumferenceAxis, this.distance), ...shapeB.projectionAxes];

        for (let i = 0; i < this.axes.length; i++) {
            this.setCircumferenceVertices(shapeA, this.axes[i]);
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
                this.displaceDirection.copy(this.axes[i]);

                // negate the axis in order to use as displacment direction
                if (this.projA.max < this.projB.max) {
                    Vector2.scale(this.displaceDirection, this.displaceDirection, -1);
                }
            }
        }

        Vector2.scale(this.direction, this.displaceDirection, -1);

        return {
            penetration: this.minOverlap,
            direction: invert ? Vector2.scale(new Vector2(), this.direction, -1) : this.direction.clone(),
            displacementDirection: invert ? this.direction.clone() : Vector2.scale(new Vector2(), this.direction, -1),
        };
    }

    private findClosestVertex(c: Circumference, p: Polygon): void {
        p.vertices.forEach((vertex) => {
            Vector2.subtract(this.newDistance, vertex, c.position);

            if (this.newDistance.magnitude < this.distance.magnitude) {
                this.distance.copy(this.newDistance);
                this.closestVertex.copy(vertex);
            }
        });
    }

    private setCircumferenceVertices(c: Circumference, axis: Vector2): void {
        Vector2.add(c.vertices[0], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), -c.radius));
        Vector2.add(c.vertices[1], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), c.radius));
    }

    private projectShapeOntoAxis(
        projection: AxisProjection,
        shape: Polygon | Circumference,
        axis: Vector2
    ): AxisProjection {
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
}
