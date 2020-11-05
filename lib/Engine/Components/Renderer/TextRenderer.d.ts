import { RenderComponent } from "../../Component";
interface Config {
    text: string;
    font: string;
    size: number;
    color: string;
    bold: boolean;
    italic: boolean;
    lineSeparation: number;
    width: number;
    height: number;
}
export declare const TYPE_TEXT_RENDERER = "TextRenderer";
export declare class TextRenderer extends RenderComponent {
    text: string;
    font: string;
    size: number;
    color: string;
    bold: boolean;
    italic: boolean;
    lineSeparation: number;
    width: number;
    height: number;
    private renderManager;
    private renderData;
    constructor({ width, height, text, font, size, color, bold, italic, lineSeparation, }: Config);
    protected start(): void;
    protected update(): void;
}
export {};
