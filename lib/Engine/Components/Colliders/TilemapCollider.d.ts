import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { AbstractColliderComponent } from "./AbstractColliderComponent";
interface Config {
    tilesData: Rectangle[];
    debug: boolean;
}
export declare class TilemapCollider extends AbstractColliderComponent {
    private renderManager;
    debug: boolean;
    private tilesData;
    private renderData;
    constructor({ tilesData, debug }: Config);
    protected start(): void;
    protected update(): void;
    private updateRenderData;
    protected updateCoordinates(): void;
}
export {};
