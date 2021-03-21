import { Rectangle } from "../../../Math/Rectangle";
import { RenderData, RenderDataType } from "./RenderData";

type Geometric = Rectangle; // in order to use Rectangle | Circle | Polygon
type GeometricType = "Rectangle"; // in order to use "Rectangle" | "Circle" | "Polygon"

export class GeometricRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Geometric;
    public color: string = null;
    public geometricType: GeometricType = null;
    private _geometric: Geometric = null;

    public set geometric(geometric: Geometric) {
        this._geometric = geometric;
    }

    public getGeometric<T extends Geometric>(): T {
        return this._geometric as T;
    }
}
