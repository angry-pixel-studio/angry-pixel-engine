import { RenderComponent } from "../../Component";
export declare type TextRendererConfig = {
    text: string;
    font: string;
    size: number;
    color: string;
    bold: boolean;
    italic: boolean;
    lineSeparation: number;
    width: number;
    height: number;
};
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
    constructor(config: TextRendererConfig);
    protected start(): void;
    protected update(): void;
}
