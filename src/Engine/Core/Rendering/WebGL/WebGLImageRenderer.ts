import { mat4 } from "gl-matrix";
import { Vector2 } from "../../../Math/Vector2";
import { Rectangle } from "../../../Math/Rectangle";
import { Slice } from "../RenderData/ImageRenderData";
import { WebGLContextVersion } from "./WebGLRenderer";
import { FontAtlas } from "../FontAtlasFactory";
import { stringify } from "uuid";

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

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    private lastTexture: WebGLTexture = null;

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

        this.textureUniform = this.gl.getUniformLocation(this.program, "texImage");
        this.alphaUniform = this.gl.getUniformLocation(this.program, "alpha");

        this.gl.useProgram(this.program);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.enableVertexAttribArray(this.positionCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.enableVertexAttribArray(this.texCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.vertexAttribPointer(this.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
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
        const triangleCoords = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5];
        const textureCoords = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0];

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangleCoords), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);

        // ---

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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    public renderTextTest(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        position: Vector2,
        text: string | string[],
        fontSize: number,
        fontAtlas: FontAtlas
    ): void {
        // prettier-ignore
        const triangleCoords: number[] = [
            0*fontSize, 0,
            1*fontSize, 0,
            0*fontSize, 1*fontSize,
            0*fontSize, 1*fontSize,
            1*fontSize, 0,
            1*fontSize, 1*fontSize,

            1*fontSize, 0,
            2*fontSize, 0,
            1*fontSize, 1*fontSize,
            1*fontSize, 1*fontSize,
            2*fontSize, 0,
            2*fontSize, 1*fontSize,

            2*fontSize, 0,
            3*fontSize, 0,
            2*fontSize, 1*fontSize,
            2*fontSize, 1*fontSize,
            3*fontSize, 0,
            3*fontSize, 1*fontSize,

            3*fontSize, 0,
            4*fontSize, 0,
            3*fontSize, 1*fontSize,
            3*fontSize, 1*fontSize,
            4*fontSize, 0,
            4*fontSize, 1*fontSize,
        ];

        const maxX: number = 980;
        const maxY: number = 980;

        // prettier-ignore
        const textureCoords: number[] = [
            140/maxX, 420/maxY,
            210/maxX, 420/maxY,
            140/maxX, 350/maxY,
            140/maxX, 350/maxY,
            210/maxX, 420/maxY,
            210/maxX, 350/maxY,

            630/maxX, 420/maxY,
            700/maxX, 420/maxY,
            630/maxX, 350/maxY,
            630/maxX, 350/maxY,
            700/maxX, 420/maxY,
            700/maxX, 350/maxY,

            420/maxX, 420/maxY,
            490/maxX, 420/maxY,
            420/maxX, 350/maxY,
            420/maxX, 350/maxY,
            490/maxX, 420/maxY,
            490/maxX, 350/maxY,

            630/maxX, 350/maxY,
            700/maxX, 350/maxY,
            630/maxX, 280/maxY,
            630/maxX, 280/maxY,
            700/maxX, 350/maxY,
            700/maxX, 280/maxY,
        ];

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangleCoords), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);

        // ---

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [position.x, position.y, 0]);

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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, triangleCoords.length / 2);
    }

    public renderText(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        position: Vector2,
        text: string | string[],
        fontSize: number,
        fontAtlas: FontAtlas
    ): void {
        const vertices = this.generateTextVertices(fontAtlas, text as string, fontSize);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices.posVertices), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices.texVertices), this.gl.STATIC_DRAW);

        // ---

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [position.x, position.y, 0]);

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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.posVertices.length / 2);
    }

    private generateTextVertices(
        fontAtlas: FontAtlas,
        text: string,
        fontSize: number
    ): { posVertices: number[]; texVertices: number[] } {
        let offset: number = 0;
        let x: number = 0;

        const posVertices: number[] = [];
        const texVertices: number[] = [];

        for (let i = 0; i < text.length; i++) {
            const letter = text[i];
            const glyphInfo = fontAtlas.glyphsData.get(letter);

            if (glyphInfo) {
                const x2 = x + fontSize;

                const u1 = glyphInfo.x / fontAtlas.canvas.width;
                const v1 = (glyphInfo.y + glyphInfo.height - 0.5) / fontAtlas.canvas.height;
                const u2 = (glyphInfo.x + glyphInfo.width - 0.5) / fontAtlas.canvas.width;
                const v2 = glyphInfo.y / fontAtlas.canvas.height;

                posVertices[offset + 0] = x;
                posVertices[offset + 1] = 0;
                posVertices[offset + 2] = x2;
                posVertices[offset + 3] = 0;
                posVertices[offset + 4] = x;
                posVertices[offset + 5] = fontSize;
                posVertices[offset + 6] = x;
                posVertices[offset + 7] = fontSize;
                posVertices[offset + 8] = x2;
                posVertices[offset + 9] = 0;
                posVertices[offset + 10] = x2;
                posVertices[offset + 11] = fontSize;

                texVertices[offset + 0] = u1;
                texVertices[offset + 1] = v1;
                texVertices[offset + 2] = u2;
                texVertices[offset + 3] = v1;
                texVertices[offset + 4] = u1;
                texVertices[offset + 5] = v2;
                texVertices[offset + 6] = u1;
                texVertices[offset + 7] = v2;
                texVertices[offset + 8] = u2;
                texVertices[offset + 9] = v1;
                texVertices[offset + 10] = u2;
                texVertices[offset + 11] = v2;

                x += fontSize;
                offset += 12;
            } else {
                x += fontSize;
            }
        }

        return {
            posVertices: posVertices,
            texVertices: texVertices,
        };
    }
}
