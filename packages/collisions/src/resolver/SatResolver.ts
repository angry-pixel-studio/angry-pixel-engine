import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Circumference, Shape } from "../Shape";

type AxisProjection = {
    min: number;
    max: number;
};

@injectable(SYMBOLS.CollisionSatResolver)
export class SatResolver implements CollisionResolver {
    private mergedAxes: Vector2[] = [];
    private projA: AxisProjection = { min: 0, max: 0 };
    private projB: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;
    private smallestAxis: Vector2 = new Vector2();
    private invertAxis: boolean;
    private distance: Vector2 = new Vector2(Infinity, Infinity);
    private cache: Vector2 = new Vector2();
    /** Reused return direction; callers that store CollisionResolution must copy `direction`. */
    private readonly outDirection: Vector2 = new Vector2();

    public resolve(shapeA: Shape, shapeB: Shape): CollisionResolution {
        this.minOverlap = Infinity;

        if (shapeA instanceof Circumference) this.setCircumferenceAxis(shapeA, shapeB);
        else if (shapeB instanceof Circumference) this.setCircumferenceAxis(shapeB, shapeA);

        this.mergeProjectionAxes(shapeA, shapeB);

        for (let i = 0; i < this.mergedAxes.length; i++) {
            const axis = this.mergedAxes[i];
            if (shapeA instanceof Circumference) this.setCircumferenceVertices(shapeA, axis);
            else if (shapeB instanceof Circumference) this.setCircumferenceVertices(shapeB, axis);

            this.projectShapeOntoAxis(this.projA, shapeA, axis);
            this.projectShapeOntoAxis(this.projB, shapeB, axis);

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
                    Vector2.scale(axis, axis, -1);
                    this.invertAxis = false;
                }
            }

            if (this.currentOverlap < this.minOverlap) {
                this.minOverlap = this.currentOverlap;
                this.smallestAxis.copy(axis);

                if (this.invertAxis && this.projA.max < this.projB.max) {
                    Vector2.scale(this.smallestAxis, axis, -1);
                }
            }
        }

        Vector2.scale(this.outDirection, this.smallestAxis, -1);

        return {
            direction: this.outDirection,
            penetration: this.minOverlap,
        };
    }

    private mergeProjectionAxes(shapeA: Shape, shapeB: Shape): void {
        const ax = shapeA.projectionAxes;
        const bx = shapeB.projectionAxes;
        this.mergedAxes.length = 0;
        for (let i = 0; i < ax.length; i++) {
            this.mergedAxes.push(ax[i]);
        }
        for (let j = 0; j < bx.length; j++) {
            const pb = bx[j];
            let duplicate = false;
            for (let k = 0; k < this.mergedAxes.length; k++) {
                if (this.mergedAxes[k].equals(pb)) {
                    duplicate = true;
                    break;
                }
            }
            if (!duplicate) {
                this.mergedAxes.push(pb);
            }
        }
    }

    private projectShapeOntoAxis(projection: AxisProjection, shape: Shape, axis: Vector2): AxisProjection {
        projection.min = Infinity;
        projection.max = -Infinity;

        const verts = shape.vertices;
        for (let i = 0; i < verts.length; i++) {
            const d = Vector2.dot(axis, verts[i]);
            if (d < projection.min) projection.min = d;
            if (d > projection.max) projection.max = d;
        }

        return projection;
    }

    private setCircumferenceAxis(c: Circumference, s: Shape): void {
        this.distance.set(Infinity, Infinity);
        let bestLenSq = Infinity;

        const verts = s.vertices;
        for (let i = 0; i < verts.length; i++) {
            Vector2.subtract(this.cache, verts[i], c.position);
            const lenSq = this.cache.x * this.cache.x + this.cache.y * this.cache.y;
            if (lenSq < bestLenSq) {
                bestLenSq = lenSq;
                this.distance.copy(this.cache);
            }
        }

        Vector2.unit(c.projectionAxes[0], this.distance);
    }

    private setCircumferenceVertices(c: Circumference, axis: Vector2): void {
        Vector2.add(c.vertices[0], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), -c.radius));
        Vector2.add(c.vertices[1], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), c.radius));
    }
}
