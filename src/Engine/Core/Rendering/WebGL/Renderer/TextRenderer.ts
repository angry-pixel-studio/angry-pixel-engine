import { mat4 } from "gl-matrix";
import { Vector2 } from "../../../../Math/Vector2";
import { Rectangle } from "../../../../Math/Rectangle";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { FontAtlas } from "../../FontAtlasFactory";
import { hexToRgb, RGB } from "../Utils";
import { TextRenderData } from "../../RenderData/TextRenderData";
import { ProgramManager } from "../ProgramManager";

const TEXTURE_CORRECTION = 0.5;

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
            renderData.positionInViewport.y + this.posVerticesSize.y / 2,
            0,
        ]);

        this.textureMatrix = mat4.identity(this.textureMatrix);
        mat4.scale(this.textureMatrix, this.textureMatrix, [
            1 / fontAtlas.canvas.width,
            1 / fontAtlas.canvas.height,
            1,
        ]);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.disable(this.gl.BLEND);

        if (this.lastTexture !== texture || lastRender !== "text") {
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

        const p = { x1: 0, y1: -renderData.fontSize, x2: 0, y2: 0 };
        const t = { x1: 0, y1: 0, x2: 0, y2: 0 };

        let maxX: number = 0;
        let lines: number = 1;

        for (let i = 0; i < renderData.text.length; i++) {
            const letter = renderData.text[i];

            if (letter === "\n") {
                p.y1 -= renderData.fontSize + renderData.lineSeparation;
                p.y2 = p.y1 + renderData.fontSize;
                p.x1 = 0;

                lines++;

                continue;
            }

            if (letter === " ") {
                p.x1 += renderData.fontSize + renderData.letterSpacing;

                continue;
            }

            const glyphInfo = fontAtlas.glyphsData.get(letter);

            if (glyphInfo) {
                p.x2 = p.x1 + renderData.fontSize;

                maxX = Math.max(p.x2, maxX);

                t.x1 = glyphInfo.x;
                t.y1 = glyphInfo.y;
                t.x2 = glyphInfo.x + glyphInfo.width - TEXTURE_CORRECTION;
                t.y2 = glyphInfo.y + glyphInfo.height - TEXTURE_CORRECTION;

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
                    t.x1, t.y2,
                    t.x2, t.y2,
                    t.x1, t.y1,
                    t.x1, t.y1,
                    t.x2, t.y2,
                    t.x2, t.y1
                ]];
            }

            p.x1 += renderData.fontSize + renderData.letterSpacing;
        }

        this.posVerticesSize.set(maxX, lines * renderData.fontSize + (lines - 1) * renderData.lineSeparation);
    }
}
