import { RenderComponent } from "../../Component";
import { Sprite } from "../../Sprite";
interface Config {
    sprite: Sprite;
    offsetX?: number;
    offsetY?: number;
    smooth?: boolean;
    rotation?: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    opacity?: number;
}
export declare const TYPE_SPRITE_RENDERER: string;
export declare class SpriteRenderer extends RenderComponent {
    sprite: Sprite;
    offsetX: number;
    offsetY: number;
    flipHorizontal: boolean;
    flipVertical: boolean;
    rotation: number;
    smooth: boolean;
    opacity: number;
    private renderManager;
    private renderData;
    private goPosition;
    constructor(config: Config);
    protected start(): void;
    protected update(): void;
    private calculateRenderPosition;
    private translateRenderPosition;
}
export {};
