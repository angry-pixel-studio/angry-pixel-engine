import { mat4 } from "gl-matrix";
import { Vector2 } from "../../../../Math/Vector2";
import { Rectangle } from "../../../../Math/Rectangle";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { FontAtlas } from "../../FontAtlasFactory";
import { hexToRgb, RGB } from "../Utils";
import { TextRenderData } from "../../RenderData/TextRenderData";
import { ProgramManager } from "../ProgramManager";

export class TextRenderer {
    private gl: WebGLRenderingContext;
    private programManager: ProgramManager;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // vertices
    private posVertices: number[] = [];
    private texVertices: number[] = [];
    private posVerticesSize: Vector2 = new Vector2();

    // cache
    private lastTexture: WebGLTexture = null;
    private maskColor: RGB = null;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement, programManager: ProgramManager) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
        this.programManager = programManager;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public render(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        fontAtlas: FontAtlas,
        renderData: TextRenderData,
        lastRender: LastRender
    ): void {
        this.generateTextVertices(fontAtlas, renderData);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.DYNAMIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [
            renderData.positionInViewport.x +
                (renderData.pivot === "center"
                    ? -this.posVerticesSize.x / 2
                    : renderData.pivot === "right"
                    ? -this.posVerticesSize.x
                    : 0),
            renderData.positionInViewport.y - this.posVerticesSize.y / 2,
            0,
        ]);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.disable(this.gl.BLEND);

        if (this.lastTexture !== texture || lastRender === "image") {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.maskColor = hexToRgb(renderData.color);
        this.gl.uniform4f(this.programManager.colorUniform, this.maskColor.r, this.maskColor.g, this.maskColor.b, 1);
        this.gl.uniform1f(this.programManager.colorMixUniform, 1);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.posVertices.length / 2);
    }

    private generateTextVertices(fontAtlas: FontAtlas, renderData: TextRenderData): void {
        this.posVertices = [];
        this.texVertices = [];

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
                this.posVertices = [...this.posVertices, ...[
                    p.x1, p.y1,
                    p.x2, p.y1,
                    p.x1, p.y2,
                    p.x1, p.y2,
                    p.x2, p.y1,
                    p.x2, p.y2
                ]];

                // prettier-ignore
                this.texVertices = [...this.texVertices, ...[
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

        this.posVerticesSize.set(maxX, Math.abs(p.y2));
    }
}
