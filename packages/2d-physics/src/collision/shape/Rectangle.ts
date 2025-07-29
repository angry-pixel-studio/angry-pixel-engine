import { Vector2 } from "@angry-pixel/math";
import { Polygon } from "./Polygon";

export class Rectangle extends Polygon {
    constructor(
        public width: number,
        public height: number,
    ) {
        super([
            new Vector2(-width / 2, -height / 2),
            new Vector2(-width / 2, height / 2),
            new Vector2(width / 2, height / 2),
            new Vector2(width / 2, -height / 2),
        ]);

        this._projectionAxes = [new Vector2(), new Vector2()];
    }

    public updateSize(width: number, height: number): void {
        this.width = width;
        this.height = height;

        this.vertexModel[0].set(-width / 2, -height / 2);
        this.vertexModel[1].set(-width / 2, height / 2);
        this.vertexModel[2].set(width / 2, height / 2);
        this.vertexModel[3].set(width / 2, -height / 2);
    }

    protected updateProjectionAxes(): void {
        Vector2.unit(
            this.projectionAxes[0],
            Vector2.subtract(this.projectionAxes[0], this.vertices[1], this.vertices[0]),
        );
        Vector2.normal(this.projectionAxes[1], this.projectionAxes[0]);
    }
}
