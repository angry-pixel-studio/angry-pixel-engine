import Vector2 from "../../Helper/Vector2";
import Rectangle from "../../Helper/Rectangle";

export default class RenderData {
    // general
    public ui: boolean = false;
    public layer: string = null;
    public position: Vector2 = new Vector2(0, 0);

    // for images
    public image: HTMLImageElement = null;
    public width: number = 0;
    public height: number = 0;
    public slice: Rectangle = null;
    public flipHorizontal: boolean = false;
    public flipVertical: boolean = false;
    public rotation: number = null;
    public smooth: boolean = false;

    // for text
    public text: string = null;
    public font: string = null;
    public textSize:  number = null;
    public color: string = null;
    public lineSeparation: number = null;
    public bold: boolean = false;
    public italic: boolean = false;
}