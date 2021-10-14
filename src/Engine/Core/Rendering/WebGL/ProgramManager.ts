import { ProgramFactory } from "./ProgramFactory";
import { WebGLContextVersion } from "./WebGLRenderer";
import { imageFragmentShader } from "./Shader/imageFragmentShader";
import { imageVertexShader } from "./Shader/imageVertexShader";
import { imageFragmentShader as legacyImageFragmentRenderer } from "./Shader/Legacy/imageFragmentShader";
import { imageVertexShader as legacyImageVertexRenderer } from "./Shader/Legacy/imageVertexShader";

export class ProgramManager {
    private gl: WebGLRenderingContext;
    private contextVersion: WebGLContextVersion;
    private programFactory: ProgramFactory;
    private program: WebGLProgram;

    // buffers
    public positionBuffer: WebGLBuffer;
    public textureBuffer: WebGLBuffer;

    // attributes
    public positionCoordsAttr: GLint;
    public texCoordsAttr: GLint;

    // vertex uniforms
    public modelMatrixUniform: WebGLUniformLocation;
    public projectionMatrixUniform: WebGLUniformLocation;
    public textureMatrixUniform: WebGLUniformLocation;

    // fragment uniforms
    public renderTextureUniform: WebGLUniformLocation;
    public textureUniform: WebGLUniformLocation;
    public solidColorUniform: WebGLUniformLocation;
    public useTintColorUniform: WebGLUniformLocation;
    public tintColorUniform: WebGLUniformLocation;
    public useMaskColorUniform: WebGLUniformLocation;
    public maskColorUniform: WebGLUniformLocation;
    public maskColorMixUniform: WebGLUniformLocation;
    public alphaUniform: WebGLUniformLocation;

    constructor(programFactory: ProgramFactory, contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;

        this.programFactory = programFactory;
        this.contextVersion = contextVersion;
    }

    public loadProgram(): void {
        this.program =
            this.contextVersion === WebGLContextVersion.WebGL2
                ? this.programFactory.create(this.gl, imageVertexShader, imageFragmentShader)
                : this.programFactory.create(this.gl, legacyImageVertexRenderer, legacyImageFragmentRenderer);

        this.positionBuffer = this.gl.createBuffer();
        this.textureBuffer = this.gl.createBuffer();

        this.positionCoordsAttr = this.gl.getAttribLocation(this.program, "positionCoords");
        this.texCoordsAttr = this.gl.getAttribLocation(this.program, "textureCoords");

        this.modelMatrixUniform = this.gl.getUniformLocation(this.program, "modelMatrix");
        this.projectionMatrixUniform = this.gl.getUniformLocation(this.program, "projectionMatrix");
        this.textureMatrixUniform = this.gl.getUniformLocation(this.program, "textureMatrix");

        this.renderTextureUniform = this.gl.getUniformLocation(this.program, "u_renderTexture");
        this.textureUniform = this.gl.getUniformLocation(this.program, "u_texImage");
        this.solidColorUniform = this.gl.getUniformLocation(this.program, "u_solidColor");
        this.useTintColorUniform = this.gl.getUniformLocation(this.program, "u_useTintColor");
        this.tintColorUniform = this.gl.getUniformLocation(this.program, "u_tintColor");
        this.useMaskColorUniform = this.gl.getUniformLocation(this.program, "u_useMaskColor");
        this.maskColorUniform = this.gl.getUniformLocation(this.program, "u_maskColor");
        this.maskColorMixUniform = this.gl.getUniformLocation(this.program, "u_maskColorMix");
        this.alphaUniform = this.gl.getUniformLocation(this.program, "u_alpha");

        this.gl.useProgram(this.program);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.enableVertexAttribArray(this.positionCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.enableVertexAttribArray(this.texCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.vertexAttribPointer(this.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
    }
}
