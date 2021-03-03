export class TimeManager {
    private readonly max: number = 0.1;
    private then: number = 0;

    private _deltaTime: number = 0;
    private _timeScale: number = 1;
    private _unscaledDeltaTime: number = 0;

    public start(): void {
        this.then = Date.now();
    }

    public update(time: number): void {
        const now: number = time * 0.001;
        this._unscaledDeltaTime = Math.min(Math.max(0, now - this.then), this.max);
        this._deltaTime = this._unscaledDeltaTime * this._timeScale;
        this.then = now;
    }

    public get deltaTime(): number {
        return this._deltaTime;
    }

    public get timeScale(): number {
        return this._timeScale;
    }

    public set timeScale(timeScale: number) {
        this._timeScale = timeScale;
    }

    public get unscaledDeltaTime(): number {
        return this._unscaledDeltaTime;
    }
}
