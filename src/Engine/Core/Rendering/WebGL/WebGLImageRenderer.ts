import { mat4 } from "gl-matrix";
import { Vector2 } from "../../../Math/Vector2";
import { Rectangle } from "../../../Math/Rectangle";
import { Slice } from "../RenderData/ImageRenderData";
import { WebGLContextVersion } from "./WebGLRenderer";
import { FontAtlas } from "../FontAtlasFactory";
import { hexToRgb } from "./Utils";
import { TextRenderData } from "../RenderData/TextRenderData";

export class WebGLImageRenderer {
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
    private colorUniform: WebGLUniformLocation;
    private colorMixUniform: WebGLUniformLocation;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // vertices
    private imagePosVertices: number[] = [];
    private imageTexVertices: number[] = [];
    private textPosVertices: number[] = [];
    private textTexVertices: number[] = [];
    private textPosVerticesSize: Vector2 = new Vector2();

    // performance
    private lastTexture: WebGLTexture = null;
    private lastRender: "image" | "text" = null;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public setProgram(program: WebGLProgram): void {
        this.program = program;

        this.positionBuffer = this.gl.createBuffer();
        this.textureBuffer = this.gl.createBuffer();

        this.positionCoordsAttr = this.gl.getAttribLocation(this.program, "positionCoords");
        this.texCoordsAttr = this.gl.getAttribLocation(this.program, "textureCoords");

        this.modelMatrixUniform = this.gl.getUniformLocation(this.program, "modelMatrix");
        this.projectionMatrixUniform = this.gl.getUniformLocation(this.program, "projectionMatrix");
        this.textureMatrixUniform = this.gl.getUniformLocation(this.program, "textureMatrix");

        this.textureUniform = this.gl.getUniformLocation(this.program, "u_texImage");
        this.alphaUniform = this.gl.getUniformLocation(this.program, "u_alpha");
        this.colorUniform = this.gl.getUniformLocation(this.program, "u_color");
        this.colorMixUniform = this.gl.getUniformLocation(this.program, "u_colorMix");

        this.gl.useProgram(this.program);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.enableVertexAttribArray(this.positionCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.enableVertexAttribArray(this.texCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.vertexAttribPointer(this.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.imagePosVertices = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5];
        this.imageTexVertices = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0];
    }

    public renderImage(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        image: HTMLImageElement,
        position: Vector2,
        width: number,
        height: number,
        slice: Slice | null = null,
        rotation: number = 0,
        flipHorizontal: boolean = false,
        flipVertical: boolean = false,
        alpha: number = 1
    ): void {
        if (this.lastRender !== "image") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.imagePosVertices), this.gl.STATIC_DRAW);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.imageTexVertices), this.gl.STATIC_DRAW);
        }

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
            // subtracting 0.5 to avoid bleeding (half-pixel correction)
            mat4.scale(this.textureMatrix, this.textureMatrix, [
                (slice.width - 0.5) / image.naturalWidth,
                (slice.height - 0.5) / image.naturalHeight,
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

        if (this.lastTexture !== texture) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1f(this.alphaUniform, alpha);
        this.gl.uniform4f(this.colorUniform, 1, 1, 1, 1);
        this.gl.uniform1f(this.colorMixUniform, 0);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

        this.lastRender = "image";
    }

    public renderText(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        fontAtlas: FontAtlas,
        renderData: TextRenderData
    ): void {
        this.generateTextVertices(fontAtlas, renderData);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textPosVertices), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textTexVertices), this.gl.DYNAMIC_DRAW);

        // ---

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [
            renderData.positionInViewport.x - this.textPosVerticesSize.x / 2,
            renderData.positionInViewport.y - this.textPosVerticesSize.y / 2,
            0,
        ]);

        this.textureMatrix = mat4.identity(this.textureMatrix);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.textureMatrixUniform, false, this.textureMatrix);

        this.gl.disable(this.gl.BLEND);

        if (this.lastTexture !== texture) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1f(this.alphaUniform, 1);

        const rgbColor = hexToRgb(renderData.color);
        this.gl.uniform4f(this.colorUniform, rgbColor.r, rgbColor.g, rgbColor.b, 1);
        this.gl.uniform1f(this.colorMixUniform, 1);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.textPosVertices.length / 2);

        this.lastRender = "text";
    }

    private generateTextVertices(fontAtlas: FontAtlas, renderData: TextRenderData): void {
        this.textPosVertices = [];
        this.textTexVertices = [];

        const correction: number = 1;
        const p = { x1: 0, y1: 0, x2: 0, y2: renderData.fontSize };
        const t = { u1: 0, v1: 0, u2: 0, v2: 0 };
        let maxX: number = 0;

        for (let i = 0; i < renderData.text.length; i++) {
            const letter = renderData.text[i];

            if (letter === "\n") {
                p.y1 -= renderData.fontSize + renderData.lineSeparation;
                p.y2 = p.y1 + renderData.fontSize;
                p.x1 = 0;

                continue;
            }

            const glyphInfo = fontAtlas.glyphsData.get(letter);

            if (glyphInfo) {
                p.x2 = p.x1 + renderData.fontSize;

                maxX = p.x2 > maxX ? p.x2 : maxX;

                t.u1 = glyphInfo.x / fontAtlas.canvas.width;
                t.v1 = (glyphInfo.y + glyphInfo.height - correction) / fontAtlas.canvas.height;
                t.u2 = (glyphInfo.x + glyphInfo.width - correction) / fontAtlas.canvas.width;
                t.v2 = glyphInfo.y / fontAtlas.canvas.height;

                // prettier-ignore
                this.textPosVertices = [...this.textPosVertices, ...[
                    p.x1, p.y1,
                    p.x2, p.y1,
                    p.x1, p.y2,
                    p.x1, p.y2,
                    p.x2, p.y1,
                    p.x2, p.y2
                ]];

                // prettier-ignore
                this.textTexVertices = [...this.textTexVertices, ...[
                    t.u1, t.v1,
                    t.u2, t.v1,
                    t.u1, t.v2,
                    t.u1, t.v2,
                    t.u2, t.v1,
                    t.u2, t.v2
                ]];
            }

            p.x1 += renderData.fontSize + renderData.letterSpacing;
        }

        this.textPosVerticesSize.set(maxX, Math.abs(p.y2));
    }
}
