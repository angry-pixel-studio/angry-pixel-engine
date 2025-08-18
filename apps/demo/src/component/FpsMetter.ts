export class FpsMetter {
    public gameLogicTimer: number = 0;
    public gameLogicCounter: number = 0;
    public gameLogicFps: string = "";
    public physicsTimer: number = 0;
    public physicsCounter: number = 0;
    public physicsFps: string = "";
    public renderTimer: number = 0;
    public renderCounter: number = 0;
    public renderFps: string = "";
    public template: string = "Game: %{g} FPS. Physics: %{p} FPS. Rendering: %{r} FPS.";
}
