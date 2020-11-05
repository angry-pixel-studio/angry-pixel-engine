import { ColliderComponent } from "./ColliderComponent";
interface Config {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    debug: boolean;
}
export declare const TYPE_BOX_COLLIDER: string;
export declare class BoxCollider extends ColliderComponent {
    private renderManager;
    debug: boolean;
    private width;
    private height;
    private offsetX;
    private offsetY;
    private renderData;
    constructor({ width, height, offsetX, offsetY, debug }: Config);
    protected start(): void;
    protected update(): void;
    protected updateCoordinates(): void;
    private updateRenderData;
}
export {};
