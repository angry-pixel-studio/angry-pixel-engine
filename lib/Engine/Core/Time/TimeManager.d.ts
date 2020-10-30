export declare class TimeManager {
    private then;
    private _deltaTime;
    start(): void;
    update(time: number): void;
    get deltaTime(): number;
}
