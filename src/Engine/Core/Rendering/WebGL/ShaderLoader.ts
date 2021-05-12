import { MiniEngineException } from "../../Exception/MiniEngineException";

export class ShaderLoader {
    load(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
        const shader: WebGLShader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        const status: number = gl.COMPILE_STATUS;

        if (!gl.getShaderParameter(shader, status)) {
            const error: string = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);

            throw new MiniEngineException(`Unable to initialize the shader program: ${error}`);
        }

        return shader;
    }
}
