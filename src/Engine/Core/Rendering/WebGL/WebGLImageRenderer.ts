import { vertexShader } from "./Shader/Image/vertexShader";
import { fragmentShader } from "./Shader/Image/fragmentShader";
import { mat4 } from "gl-matrix";
import { ProgramFactory } from "./ProgramFactory";
import { TextureFactory } from "./TextureFactory";
import { Vector2 } from "../../../Math/Vector2";
import * as sha256 from "crypto-js/sha256";
import { Rectangle } from "../../../Math/Rectangle";
import { Slice } from "../RenderData/ImageRenderData";

export class WebGLImageRenderer {
    private textureFactory: TextureFactory;
    private gl: WebGLRenderingContext;

    private program: WebGLProgram;

    // buffers
    private positionBuffer: WebGLBuffer;
    private textureBuffer: WebGLBuffer;

    // attributes
    private positionCoordsAttr: GLint;
    private texCoordsAttr: GLint;

    // vertex uniforms
    private modelMatrixUniform: WebGLUniformLocation;
    private projectionMatrixUniform: WebGLUniformLocation;
    private textureMatrixUniform: WebGLUniformLocation;

    // fragment uniforms
    private textureUniform: WebGLUniformLocation;
    private alphaUniform: WebGLUniformLocation;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    private texcache: Map<string, WebGLTexture> = new Map<string, WebGLTexture>();

    constructor(canvas: HTMLCanvasElement, programFactory: ProgramFactory, textureFactory: TextureFactory) {
        this.gl = canvas.getContext("webgl2");
        this.textureFactory = textureFactory;
        this.program = programFactory.create(this.gl, vertexShader, fragmentShader);

        this.positionBuffer = this.gl.createBuffer();
        this.textureBuffer = this.gl.createBuffer();

        this.positionCoordsAttr = this.gl.getAttribLocation(this.program, "positionCoords");
        this.texCoordsAttr = this.gl.getAttribLocation(this.program, "textureCoords");

        this.modelMatrixUniform = this.gl.getUniformLocation(this.program, "modelMatrix");
        this.projectionMatrixUniform = this.gl.getUniformLocation(this.program, "projectionMatrix");
        this.textureMatrixUniform = this.gl.getUniformLocation(this.program, "textureMatrix");

        this.textureUniform = this.gl.getUniformLocation(this.program, "texImage");
        this.alphaUniform = this.gl.getUniformLocation(this.program, "alpha");

        this.gl.useProgram(this.program);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        const triangleCoords = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5];
        const textureCoords = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0];

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangleCoords), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);

        this.gl.enableVertexAttribArray(this.positionCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.enableVertexAttribArray(this.texCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.vertexAttribPointer(this.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public renderImage(
        viewportRect: Rectangle,
        image: HTMLImageElement,
        position: Vector2,
        width: number,
        height: number,
        slice: Slice | null = null,
        rotation: number = 0,
        flipHorizontal: boolean = false,
        flipVertical: boolean = false,
        alpha: number = 1,
        smooth: boolean = true
    ): void {
        const textureHash: string = sha256(image.src).toString();
        if (this.texcache.has(textureHash) === false) {
            this.texcache.set(textureHash, this.textureFactory.createFromImage(this.gl, image, smooth));
        }
        const texture = this.texcache.get(textureHash);

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [position.x, position.y, 0]);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            width * (flipHorizontal ? -1 : 1),
            height * (flipVertical ? -1 : 1),
            1,
        ]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, rotation * (Math.PI / 180));

        this.textureMatrix = mat4.identity(this.textureMatrix);
        if (slice !== null) {
            mat4.translate(this.textureMatrix, this.textureMatrix, [
                slice.x / image.naturalWidth,
                slice.y / image.naturalHeight,
                0,
            ]);
            mat4.scale(this.textureMatrix, this.textureMatrix, [
                slice.width / image.naturalWidth,
                slice.height / image.naturalHeight,
                1,
            ]);
        }

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.textureMatrixUniform, false, this.textureMatrix);

        if (alpha < 1) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.uniform1i(this.textureUniform, 0);

        this.gl.uniform1f(this.alphaUniform, alpha);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}
