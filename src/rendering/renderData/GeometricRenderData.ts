import { Rectangle } from "../../math/Rectangle";
import { RenderData, RenderDataType } from "./RenderData";

type Geometric = Rectangle; // in order to use Rectangle | Circle | Polygon
type GeometricType = "Rectangle"; // in order to use "Rectangle" | "Circle" | "Polygon"

export class GeometricRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Geometric;
    public color: string = null;
    public geometricType: GeometricType = null;
    public geometric: Geometric = null;

    public getGeometric<T extends Geometric>(): T {
        return this.geometric as T;
    }
}
