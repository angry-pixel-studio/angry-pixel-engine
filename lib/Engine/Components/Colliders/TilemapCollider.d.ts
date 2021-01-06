import { TilemapRenderer } from "../Renderer/TilemapRenderer";
import { ColliderComponent } from "./ColliderComponent";
interface Config {
    tilemapRenderer: TilemapRenderer;
    debug?: boolean;
}
export declare const TYPE_TILEMAP_COLLIDER: string;
export declare class TilemapCollider extends ColliderComponent {
    private tilemapRenderer;
    private debug;
    private cacheVertex;
    constructor(config: Config);
    protected start(): void;
    private needsCollider;
    protected updatePosition(): void;
}
export {};
