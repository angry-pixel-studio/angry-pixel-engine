export const exceptionName = "AngryPixelException";

/** @private */
export class Exception extends Error {
    constructor(message: string) {
        super(message);

        this.name = exceptionName;
    }
}
