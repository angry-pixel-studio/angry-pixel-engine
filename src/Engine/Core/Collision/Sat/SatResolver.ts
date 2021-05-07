import { Vector2 } from "../../../Math/Vector2";
import { Shape } from "../Shape/Shape";
import { SatData } from "./SatData";

type AxisProjection = {
    min: number;
    max: number;
};

export class SatResolver {
    private axes: Vector2[];
    private proj1: AxisProjection = { min: 0, max: 0 };
    private proj2: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;
    private displaceDirection: Vector2;

    public getSatData(shape1: Shape, shape2: Shape): SatData | null {
        this.currentOverlap = null;
        this.minOverlap = null;
        this.displaceDirection = null;

        this.axes = [...shape1.getAxes(), ...shape2.getAxes()];

        for (let i = 0; i < this.axes.length; i++) {
            this.projectShapeOntoAxis(this.proj1, this.axes[i], shape1);
            this.projectShapeOntoAxis(this.proj2, this.axes[i], shape2);

            this.currentOverlap = Math.min(this.proj1.max, this.proj2.max) - Math.max(this.proj1.min, this.proj2.min);
            if (this.currentOverlap < 0) {
                return null;
            }

            // to prevent containment (bigger shape containing smaller shape)
            this.preventContainment(i);

            if (this.currentOverlap < this.minOverlap || this.minOverlap === null) {
                this.minOverlap = this.currentOverlap;
                this.displaceDirection = this.axes[i];

                // negate the axis in order to use as displacment direction
                if (this.proj1.max < this.proj2.max) {
                    Vector2.scale(this.displaceDirection, this.displaceDirection, -1);
                }
            }
        }

        return new SatData(this.minOverlap, this.displaceDirection);
    }

    private projectShapeOntoAxis(projection: AxisProjection, axis: Vector2, shape: Shape): AxisProjection {
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
            (this.proj1.max > this.proj2.max && this.proj1.min < this.proj2.min) ||
            (this.proj1.max < this.proj2.max && this.proj1.min > this.proj2.min)
        ) {
            const mins = Math.abs(this.proj1.min - this.proj2.min);
            const maxs = Math.abs(this.proj1.max - this.proj2.max);
            if (mins < maxs) {
                this.currentOverlap += mins;
            } else {
                this.currentOverlap += maxs;
                Vector2.scale(this.axes[axisIndex], this.axes[axisIndex], -1);
            }
        }
    }
}
