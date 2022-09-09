export interface IIterationManager {
    running: boolean;
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
}
