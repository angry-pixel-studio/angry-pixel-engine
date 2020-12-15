import { ColliderComponent } from "./ColliderComponent";
interface Config {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    physics?: boolean;
    debug?: boolean;
}
export declare const TYPE_BOX_COLLIDER: string;
export declare class BoxCollider extends ColliderComponent {
    debug: boolean;
    private width;
    private height;
    private offsetX;
    private offsetY;
    private realWidth;
    private realHeight;
    private realOffsetX;
    private realOffsetY;
    constructor(config: Config);
    protected start(): void;
    protected update(): void;
    protected updatePosition(): void;
    private updateRealSize;
}
export {};
