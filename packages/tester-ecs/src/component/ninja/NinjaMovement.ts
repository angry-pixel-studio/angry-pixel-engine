import { Collision } from "angry-pixel-ecs";

export class NinjaMovement {
    public gravity: number = 1000;
    public walkSpeed: number = 106;
    public jumpSpeed: number = 350;
    public grounded: boolean = false;
    public jumping: boolean = false;
    public jumpReleased: boolean = false;
    public walking: boolean = false;
    public platformCollision: Collision = undefined;
}
