import { WebGLContextVersion } from "../ContextManager";
import { fragmentShader } from "../shader/fragmentShader";
import { legacyFragmentShader } from "../shader/legacy/fragmentShader";
import { legacyVertexShader } from "../shader/legacy/vertexShader";
import { vertexShader } from "../shader/vertexShader";
import { ProgramFactory } from "./ProgramFactory";

// upper limit for the light uniform arrays, the real size depends on the GPU uniform space
const MAX_LIGHTS = 256;
// uniform vectors used by each light, and kept for the rest of the fragment uniforms
const LIGHT_UNIFORM_VECTORS = 2;
const RESERVED_UNIFORM_VECTORS = 16;

export class ProgramManager {
    public program: WebGLProgram;

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
    // light uniforms
    public renderLightUniform: WebGLUniformLocation;
    public numLightsUniform: WebGLUniformLocation;
    public lightPixelSizeUniform: WebGLUniformLocation;
    public lightGridOriginUniform: WebGLUniformLocation;
    public lightGeometryUniform: WebGLUniformLocation;
    public lightColorUniform: WebGLUniformLocation;
    public maxLights: number;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly contextVersion: WebGLContextVersion,
        private readonly programFactory: ProgramFactory,
    ) {}

    public loadProgram(): void {
        const maxUniformVectors: number = this.gl.getParameter(this.gl.MAX_FRAGMENT_UNIFORM_VECTORS);
        this.maxLights = Math.max(
            1,
            Math.min(MAX_LIGHTS, Math.floor((maxUniformVectors - RESERVED_UNIFORM_VECTORS) / LIGHT_UNIFORM_VECTORS)),
        );

        this.program =
            this.contextVersion === WebGLContextVersion.WebGL2
                ? this.programFactory.create(vertexShader, fragmentShader(this.maxLights))
                : this.programFactory.create(legacyVertexShader, legacyFragmentShader(this.maxLights));

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
        this.renderLightUniform = this.gl.getUniformLocation(this.program, "u_renderLight");
        this.numLightsUniform = this.gl.getUniformLocation(this.program, "u_numLights");
        this.lightPixelSizeUniform = this.gl.getUniformLocation(this.program, "u_lightPixelSize");
        this.lightGridOriginUniform = this.gl.getUniformLocation(this.program, "u_lightGridOrigin");

        this.lightGeometryUniform = this.gl.getUniformLocation(this.program, "u_lightGeometry");
        this.lightColorUniform = this.gl.getUniformLocation(this.program, "u_lightColor");

        this.gl.useProgram(this.program);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
}
