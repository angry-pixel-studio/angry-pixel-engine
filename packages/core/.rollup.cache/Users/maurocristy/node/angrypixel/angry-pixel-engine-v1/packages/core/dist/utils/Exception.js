export const exceptionName = "AngryPixelException";
/** @internal */
export class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = exceptionName;
    }
}
//# sourceMappingURL=Exception.js.map