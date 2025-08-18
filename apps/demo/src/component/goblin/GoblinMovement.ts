export class GoblinMovement {
    public gravity: number = 1000;
    public walkSpeed: number = 50;
    public jumpSpeed: number = 350;
    public grounded: boolean = false;
    public jumping: boolean = false;

    constructor(options?: Partial<GoblinMovement>) {
        Object.assign(this, options);
    }
}
