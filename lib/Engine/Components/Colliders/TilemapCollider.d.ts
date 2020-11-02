import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { Collider } from "./Collider";
interface Config {
    tilesData: Rectangle[];
    debug: boolean;
}
export declare class TilemapCollider extends Collider {
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
