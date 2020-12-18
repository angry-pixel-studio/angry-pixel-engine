import { Shape } from "../Shape/Shape";
import { SatData } from "./SatData";
export declare class SatResolver {
    private currentOverlap;
    private minOverlap;
    private smallestAxis;
    private vertexShape;
    getSatData(shape1: Shape, shape2: Shape): SatData | null;
    private findAxes;
    private getShapeAxes;
    private projShapeOntoAxis;
}
