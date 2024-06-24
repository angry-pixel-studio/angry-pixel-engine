import { Rectangle } from "../../../math";

export class ShadowRenderer {
    public width: number = 0;
    public height: number = 0;
    public color: string = "#000000";
    public opacity: number = 1;
    public layer: string = "";
    public _boundingBox: Rectangle = new Rectangle();
}
