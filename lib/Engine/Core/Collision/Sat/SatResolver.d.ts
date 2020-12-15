import { Shape } from "../Shape/Shape";
import { SatData } from "./SatData";
export declare class SatResolver {
    getSatData(shape1: Shape, shape2: Shape): SatData | null;
    private findAxes;
    private getShapeAxes;
    private projShapeOntoAxis;
}
