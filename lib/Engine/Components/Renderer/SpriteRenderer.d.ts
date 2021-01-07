import { RenderComponent } from "../../Component";
import { Vector2 } from "../../Math/Vector2";
import { Sprite } from "../../Sprite";
interface Config {
    sprite: Sprite;
    offset?: Vector2;
    smooth?: boolean;
    rotation?: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    opacity?: number;
    tiled?: Vector2;
}
export declare const TYPE_SPRITE_RENDERER: string;
export declare class SpriteRenderer extends RenderComponent {
    sprite: Sprite;
    offset: Vector2;
    flipHorizontal: boolean;
    flipVertical: boolean;
    rotation: number;
    smooth: boolean;
    opacity: number;
    private _tiled;
    private renderManager;
    private renderData;
    private goPosition;
    constructor(config: Config);
    get tiled(): Vector2;
    set tiled(tiled: Vector2);
    protected start(): void;
    protected update(): void;
    private updateRenderDataArray;
    private updateRenderData;
    private calculateRenderPosition;
    private translateRenderPosition;
}
export {};
