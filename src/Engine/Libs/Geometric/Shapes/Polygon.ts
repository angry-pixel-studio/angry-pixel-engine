import Vector2 from "../../../Helper/Vector2";

export default class Polygon {
    points: Array<Vector2>;

    constructor(points: Array<Vector2>) {
        this.points = points;
    }
}
