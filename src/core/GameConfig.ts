import { CollisionMatrix, CollisionMethods } from "angry-pixel-2d-physics";
import { Rectangle, Vector2 } from "angry-pixel-math";

export interface GameConfig {
    containerNode?: HTMLElement | null;
    gameWidth?: number;
    gameHeight?: number;
    debugEnabled?: boolean;
    canvasColor?: string;
    physicsFramerate?: number;
    spriteDefaultScale?: Vector2 | null;
    headless?: boolean;
    collisions?: {
        collisionMethod?: CollisionMethods;
        collisionArea?: Rectangle; // TODO: implement different bounds per scene
        collisionMatrix?: CollisionMatrix;
    };
}
