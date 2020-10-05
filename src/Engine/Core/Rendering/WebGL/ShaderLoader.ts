export default class ShaderLoader {
    gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    load(type: number, source: string): WebGLShader {
        const shader: WebGLShader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const status: number = this.gl.COMPILE_STATUS;

        if (!this.gl.getShaderParameter(shader, status)) {
            const error: string = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);

            throw new Error(`Unable to initialize the shader program: ${error}`);
        }

        return shader;
    }
}
