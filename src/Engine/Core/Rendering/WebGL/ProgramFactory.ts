import ShaderLoader from "./ShaderLoader";

export default class ProgramFactory {
    gl: WebGLRenderingContext;
    shaderLoader: ShaderLoader;

    constructor(gl: WebGLRenderingContext, shaderLoader: ShaderLoader) {
        this.gl = gl;
        this.shaderLoader = shaderLoader;
    }

    public create(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram {
        const program: WebGLProgram = this.gl.createProgram();

        const vertexShader: WebGLShader = this.shaderLoader.load(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader: WebGLShader = this.shaderLoader.load(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.link(program, vertexShader, fragmentShader);

        return program;
    }

    private link(program: WebGLProgram, vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        const status = this.gl.LINK_STATUS;

        if (!this.gl.getProgramParameter(program, status)) {
            const error: string = this.gl.getProgramInfoLog(program);
            this.gl.deleteProgram(program);
            throw new Error(`Unable to initialize the Program: ${error}`);
        }
    }
}
