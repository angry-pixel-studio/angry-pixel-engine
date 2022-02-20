import { Rectangle } from "../math/Rectangle";

export class CameraData {
    public depth: number = 0;
    public layers: string[] = [];
    public originalViewportRect: Rectangle = null;
    public viewportRect: Rectangle = null;
    public worldSpaceRect: Rectangle = null;
    public zoom: number = 0;
}