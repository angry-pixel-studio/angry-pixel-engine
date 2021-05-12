export class MiniEngineException extends Error {
    public static messagePrefix: string = "MiniEngine Exception";

    constructor(message: string) {
        super(`${MiniEngineException.messagePrefix}: ${message}`);

        this.name = "MiniEngineException";
    }
}
