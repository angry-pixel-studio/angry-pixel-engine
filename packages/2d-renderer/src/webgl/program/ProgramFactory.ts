import { IShaderLoader } from "./ShaderLoader";

export interface IProgramFactory {
    create(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram;
}

export class ProgramFactory implements IProgramFactory {
    constructor(private readonly gl: WebGL2RenderingContext, private readonly shaderLoader: IShaderLoader) {}

    public create(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram {
        const program: WebGLProgram = this.gl.createProgram();
        const vertexShader: WebGLShader = this.shaderLoader.load(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader: WebGLShader = this.shaderLoader.load(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        const status = this.gl.LINK_STATUS;

        if (!this.gl.getProgramParameter(program, status)) {
            const error: string = this.gl.getProgramInfoLog(program);
            this.gl.deleteProgram(program);
            throw new Error(`Unable to initialize the Program: ${error}`);
        }

        return program;
    }
}
