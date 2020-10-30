import { GameObject } from "../GameObject";
import { Camera } from "../Components/Camera";
export declare const CAMERA_COMPONENT = "Camera";
export declare class GameCamera extends GameObject {
    constructor();
    get camera(): Camera;
}
