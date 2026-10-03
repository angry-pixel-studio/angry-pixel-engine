import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { areAxesParallel, Circumference, Shape } from "../Shape";
import { CollisionResolutionPool } from "./CollisionResolutionPool";

type AxisProjection = {
    min: number;
    max: number;
};

@injectable(SYMBOLS.CollisionSatResolver)
export class SatResolver implements CollisionResolver {
    @inject(SYMBOLS.CollisionResolutionPool) private readonly collisionResolutionPool: CollisionResolutionPool;

    private mergedAxes: Vector2[] = [];
    private projA: AxisProjection = { min: 0, max: 0 };
    private projB: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;
    private smallestAxis: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2(Infinity, Infinity);
    private cache: Vector2 = new Vector2();

    public resolve(shapeA: Shape, shapeB: Shape): CollisionResolution {
        this.minOverlap = Infinity;

        const circumferenceA = shapeA instanceof Circumference;
        const circumferenceB = !circumferenceA && shapeB instanceof Circumference;

        if (circumferenceA) this.setCircumferenceAxis(shapeA as Circumference, shapeB);
        else if (circumferenceB) this.setCircumferenceAxis(shapeB as Circumference, shapeA);

        this.mergeProjectionAxes(shapeA, shapeB);
        if (this.mergedAxes.length === 0) return undefined;

        for (let i = 0; i < this.mergedAxes.length; i++) {
            const axis = this.mergedAxes[i];

            if (circumferenceA) this.projectCircumferenceOntoAxis(this.projA, shapeA, axis);
            else this.projectShapeOntoAxis(this.projA, shapeA, axis);

            if (circumferenceB) this.projectCircumferenceOntoAxis(this.projB, shapeB, axis);
            else this.projectShapeOntoAxis(this.projB, shapeB, axis);

            this.currentOverlap = Math.min(this.projA.max, this.projB.max) - Math.max(this.projA.min, this.projB.min);

            if (this.currentOverlap < 0) return undefined;

            // containment: exit through the nearest end
            if (
                (this.projA.max > this.projB.max && this.projA.min < this.projB.min) ||
                (this.projA.max < this.projB.max && this.projA.min > this.projB.min)
            ) {
                this.currentOverlap += Math.min(
                    Math.abs(this.projA.min - this.projB.min),
                    Math.abs(this.projA.max - this.projB.max),
                );
            }

            if (this.currentOverlap < this.minOverlap) {
                this.minOverlap = this.currentOverlap;
                // orient from A towards B; also picks the nearest end on containment
                if (this.projA.min + this.projA.max < this.projB.min + this.projB.max) this.smallestAxis.copy(axis);
                else Vector2.scale(this.smallestAxis, axis, -1);
            }
        }

        const resolution = this.collisionResolutionPool.get();
        resolution.direction.copy(this.smallestAxis);
        resolution.penetration = this.minOverlap;

        return resolution;
    }

    private mergeProjectionAxes(shapeA: Shape, shapeB: Shape): void {
        const ax = shapeA.projectionAxes;
        const bx = shapeB.projectionAxes;
        this.mergedAxes.length = 0;
        for (let i = 0; i < ax.length; i++) {
            // a zero axis has no direction, e.g. a circumference centered on a vertex
            if (ax[i].x === 0 && ax[i].y === 0) continue;
            this.mergedAxes.push(ax[i]);
        }
        for (let j = 0; j < bx.length; j++) {
            const pb = bx[j];
            if (pb.x === 0 && pb.y === 0) continue;

            let duplicate = false;
            for (let k = 0; k < this.mergedAxes.length; k++) {
                // opposite axes project the same way
                if (areAxesParallel(this.mergedAxes[k], pb)) {
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

    private projectCircumferenceOntoAxis(projection: AxisProjection, { position, radius }: Shape, axis: Vector2): void {
        const center = Vector2.dot(axis, position);

        projection.min = center - radius;
        projection.max = center + radius;
    }
}
