import { RenderComponent } from "../../Component";
interface Config {
    text: string | string[];
    font?: string;
    size?: number;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    lineSeparation?: number;
}
export declare const TYPE_TEXT_RENDERER = "TextRenderer";
export declare class TextRenderer extends RenderComponent {
    text: string | string[];
    font: string;
    size: number;
    color: string;
    bold: boolean;
    italic: boolean;
    lineSeparation: number;
    private renderManager;
    private renderData;
    constructor(config: Config);
    protected start(): void;
    protected update(): void;
}
export {};
