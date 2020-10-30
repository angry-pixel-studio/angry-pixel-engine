import { AbstractColliderComponent } from "./AbstractColliderComponent";
interface Config {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    debug: boolean;
}
export declare class RectangleCollider extends AbstractColliderComponent {
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
