export class TimeManager {
    private then: number = 0;
    private _deltaTime: number = 0;

    public start(): void {
        this.then = Date.now();
    }

    public update(time: number): void {
        const now: number = time * 0.001;
        this._deltaTime = Math.min(Math.max(0, now - this.then), 0.1);
        this.then = now;
    }

    public get deltaTime(): number {
        return this._deltaTime;
    }
}
