export const exceptionName = "AngryPixelException";

/** @internal */
export class Exception extends Error {
    constructor(message: string) {
        super(message);

        this.name = exceptionName;
    }
}
