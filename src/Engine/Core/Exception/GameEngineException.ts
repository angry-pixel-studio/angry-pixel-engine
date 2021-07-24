export class GameEngineException extends Error {
    public static messagePrefix: string = "Angry Pixel Exception";

    constructor(message: string) {
        super(`${GameEngineException.messagePrefix}: ${message}`);

        this.name = "GameEngineException";
    }
}
