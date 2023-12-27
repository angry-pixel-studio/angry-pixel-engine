export enum WebGLContextVersion {
    LegacyWebGL = "webgl",
    WebGL2 = "webgl2",
}

export interface IContextManager {
    readonly gl: WebGL2RenderingContext;
}

export class ContextManager implements IContextManager {
    public readonly gl: WebGL2RenderingContext;
    public readonly contextVersion: WebGLContextVersion;

    constructor(public readonly canvas: HTMLCanvasElement) {
        this.contextVersion = this.getContextVersion();
        if (!this.contextVersion) {
            throw new Error("Your browser does not support WebGL.");
        }

        this.gl = this.canvas.getContext(this.contextVersion) as WebGL2RenderingContext;
    }

    private getContextVersion(): WebGLContextVersion | undefined {
        return this.canvas.getContext(WebGLContextVersion.WebGL2) !== null
            ? WebGLContextVersion.WebGL2
            : this.canvas.getContext(WebGLContextVersion.LegacyWebGL) !== null
            ? WebGLContextVersion.LegacyWebGL
            : undefined;
    }
}
