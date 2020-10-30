import { ShaderLoader } from "./ShaderLoader";
export declare class ProgramFactory {
    shaderLoader: ShaderLoader;
    constructor(shaderLoader: ShaderLoader);
    create(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram;
    private link;
}
