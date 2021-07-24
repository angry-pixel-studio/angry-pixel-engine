export class GameEngineException extends Error {
    public static messagePrefix: string = "MiniEngine Exception";

    constructor(message: string) {
        super(`${GameEngineException.messagePrefix}: ${message}`);

        this.name = "MiniEngineException";
    }
}
