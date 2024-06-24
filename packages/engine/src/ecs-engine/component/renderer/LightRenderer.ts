import { Rectangle } from "../../../math";

export class LightRenderer {
    public radius: number = 0;
    public smooth: boolean = false;
    public layer: string = "";
    public intensity: number = 1;
    public _boundingBox: Rectangle = new Rectangle();
}
