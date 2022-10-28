import { Rectangle, Vector2 } from "angry-pixel-math";
import { CollisionMatrix } from "../physics/collision/CollisionManager";

export enum CollisionMethodConfig {
    AABB = "aabb",
    SAT = "sat",
}

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
        method?: CollisionMethodConfig;
        quadTreeBounds?: Rectangle | null; // TODO: implement different bounds per scene
        quadMaxLevel?: number;
        collidersPerQuad?: number;
        collisionMatrix?: CollisionMatrix;
    };
}
