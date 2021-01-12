import { Rectangle } from "../../Math/Rectangle";

export class CameraData {
    public depth: number = 0;
    public layers: string[] = [];
    public viewportRect: Rectangle = null;
    public worldSpaceRect: Rectangle = null;
    public zoom: number = 0;
}
