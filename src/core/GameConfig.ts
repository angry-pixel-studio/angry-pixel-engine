import { BroadPhaseMethods, CollisionMatrix, CollisionMethods } from "angry-pixel-2d-physics";
import { Rectangle, Vector2 } from "angry-pixel-math";

export interface GameConfig {
    containerNode?: HTMLElement;
    gameWidth?: number;
    gameHeight?: number;
    debugEnabled?: boolean;
    canvasColor?: string;
    physicsFramerate?: number;
    spriteDefaultScale?: Vector2;
    headless?: boolean;
    collisions?: {
        collisionMethod?: CollisionMethods;
        collisionArea?: Rectangle;
        collisionMatrix?: CollisionMatrix;
        collisionBroadPhaseMethod?: BroadPhaseMethods;
    };
}
