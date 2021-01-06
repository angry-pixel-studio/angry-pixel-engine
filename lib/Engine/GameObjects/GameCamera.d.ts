import { GameObject } from "../GameObject";
import { Camera } from "../Components/Camera";
import { Rectangle } from "../Math/Rectangle";
export declare class GameCamera extends GameObject {
    readonly camera: Camera;
    constructor();
    set layers(layers: string[]);
    get layers(): string[];
    set depth(depth: number);
    get depth(): number;
    set zoom(zoom: number);
    get zoom(): number;
    get worldSpaceRect(): Rectangle;
    get viewportRect(): Rectangle;
    addLayer(layer: string): void;
}
