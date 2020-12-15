import { TilemapRenderer } from "../Renderer/Tilemap/TilemapRenderer";
import { ColliderComponent } from "./ColliderComponent";
interface Config {
    tilemapRenderer: TilemapRenderer;
    debug?: boolean;
}
export declare const TYPE_TILEMAP_COLLIDER: string;
export declare class TilemapCollider extends ColliderComponent {
    private renderManager;
    private tilemapRenderer;
    debug: boolean;
    private renderData;
    constructor(config: Config);
    protected start(): void;
    protected update(): void;
    private updateRenderData;
    protected updatePosition(): void;
}
export {};
