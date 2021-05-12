import { MiniEngineException } from "../../Exception/MiniEngineException";
import { ShaderLoader } from "./ShaderLoader";

export class ProgramFactory {
    shaderLoader: ShaderLoader;

    constructor(shaderLoader: ShaderLoader) {
        this.shaderLoader = shaderLoader;
    }

    public create(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram {
        const program: WebGLProgram = gl.createProgram();

        const vertexShader: WebGLShader = this.shaderLoader.load(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader: WebGLShader = this.shaderLoader.load(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.link(gl, program, vertexShader, fragmentShader);

        return program;
    }

    private link(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        vertexShader: WebGLShader,
        fragmentShader: WebGLShader
    ): void {
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        const status = gl.LINK_STATUS;

        if (!gl.getProgramParameter(program, status)) {
            const error: string = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new MiniEngineException(`Unable to initialize the Program: ${error}`);
        }
    }
}
