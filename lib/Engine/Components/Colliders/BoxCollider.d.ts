import { ColliderComponent } from "./ColliderComponent";
interface Config {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    debug?: boolean;
}
export declare const TYPE_BOX_COLLIDER: string;
export declare class BoxCollider extends ColliderComponent {
    private renderManager;
    private width;
    private height;
    private offsetX;
    private offsetY;
    debug: boolean;
    private realWidth;
    private realHeight;
    private realOffsetX;
    private realOffsetY;
    private renderData;
    constructor(config: Config);
    protected start(): void;
    protected update(): void;
    protected updateCoordinates(): void;
    private updateRealSize;
    private updateRenderData;
}
export {};
