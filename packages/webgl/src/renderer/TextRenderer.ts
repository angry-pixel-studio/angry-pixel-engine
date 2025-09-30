import { mat4 } from "gl-matrix";
import { Vector2 } from "@angry-pixel/math";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { FontAtlas, FontAtlasFactory } from "../FontAtlasFactory";
import { TextureManager } from "../texture/TextureManager";
import { ProgramManager } from "../program/ProgramManager";
import { hexToRgba, setProjectionMatrix } from "./utils";

/**
 * Alignment of the text.
 * @category Components Configuration
 * @public
 */
export enum TextAlignment {
    Center,
    Right,
    Left,
}

export interface TextRenderData extends RenderData {
    color: string;
    flipHorizontally: boolean;
    flipVertically: boolean;
    font: FontFace | string;
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
    opacity: number;
    rotation: number;
    shadow?: {
        color: string;
        offset: Vector2;
        opacity: number;
    };
    smooth: boolean;
    text: string;
    textureAtlas: {
        charRanges: number[];
        fontSize: number;
        spacing: number;
    };
    boundingBox: { width: number; height: number };
    alignment: TextAlignment;
}

export class TextRenderer implements Renderer {
    public readonly type: RenderDataType = RenderDataType.Text;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private posVertices: number[] = [];
    private texVertices: number[] = [];
    private positionBuffer: WebGLBuffer;
    private textureBuffer: WebGLBuffer;

    // cache
    private lastTexture: WebGLTexture = null;
    private shadowPosition: Vector2 = new Vector2();

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: ProgramManager,
        private readonly textureManager: TextureManager,
        private readonly fontAtlasFactory: FontAtlasFactory,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
        this.positionBuffer = this.gl.createBuffer();
        this.textureBuffer = this.gl.createBuffer();
    }

    public render(
        renderData: TextRenderData,
        cameraData: CameraData,
        lastRender: RenderDataType,
        shadow: boolean = false,
    ): boolean {
        if (!renderData.text) return false;

        const fontAtlas = this.fontAtlasFactory.getOrCreate({
            font: renderData.font,
            ...renderData.textureAtlas,
        });

        // If we are render the shadow text, we dont need to recalculate the vertices or re-enable buffers
        if (!shadow) {
            this.generateTextVertices(fontAtlas, renderData);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(this.programManager.texCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
        }

        if (renderData.shadow) {
            const { color, offset, opacity } = renderData.shadow;
            const shadowRenderData = {
                ...renderData,
                color,
                opacity,
                position: Vector2.add(this.shadowPosition, renderData.position, offset),
            };
            shadowRenderData.shadow = undefined;
            this.render(shadowRenderData, cameraData, lastRender, true);
            lastRender = RenderDataType.Text;
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            renderData.fontSize * (renderData.flipHorizontally ? -1 : 1),
            renderData.fontSize * (renderData.flipVertically ? -1 : 1),
            1,
        ]);

        this.textureMatrix = mat4.identity(this.textureMatrix);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.enable(this.gl.BLEND);

        const texture = this.textureManager.getOrCreateTextureFromCanvas(
            fontAtlas.id,
            fontAtlas.canvas,
            renderData.smooth,
        );

        if (this.lastTexture !== texture || lastRender !== RenderDataType.Text) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.useMaskColorUniform, 0);
        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.opacity);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform1i(this.programManager.useTintColorUniform, 1);
        this.gl.uniform4f(this.programManager.tintColorUniform, r, g, b, a);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.posVertices.length / 2);

        return true;
    }

    private generateTextVertices(fontAtlas: FontAtlas, renderData: TextRenderData): void {
        this.posVertices = [];
        this.texVertices = [];

        const processedText = this.preProcessText(fontAtlas, renderData);

        const letterSpacing = renderData.letterSpacing / renderData.fontSize;
        const lineHeight = renderData.lineHeight / renderData.fontSize;
        const height = renderData.boundingBox.height / renderData.fontSize;
        const width = renderData.boundingBox.width / renderData.fontSize;

        let y = height / 2;

        for (const line of processedText) {
            const { text, width: lineWidth } = line;
            let x =
                renderData.alignment === TextAlignment.Center
                    ? -lineWidth / 2
                    : renderData.alignment === TextAlignment.Left
                      ? -width / 2
                      : width / 2 - lineWidth;

            for (const letter of text) {
                const glyph = fontAtlas.glyphs.get(letter);
                if (glyph) {
                    const letterWidth = glyph.width / fontAtlas.fontSize;

                    // prettier-ignore
                    this.posVertices.push(
                        x, y - 1,
                        x + letterWidth, y - 1,
                        x, y,
                        x, y,
                        x + letterWidth, y - 1,
                        x + letterWidth, y
                    )

                    const gx = (glyph.id % fontAtlas.gridSize) * (fontAtlas.fontSize + fontAtlas.spacing);
                    const gy = ((glyph.id / fontAtlas.gridSize) | 0) * (fontAtlas.fontSize + fontAtlas.spacing);

                    const u1 = gx / fontAtlas.canvas.width;
                    const v1 = gy / fontAtlas.canvas.height;
                    const u2 = (gx + glyph.width) / fontAtlas.canvas.width;
                    const v2 = (gy + fontAtlas.fontSize) / fontAtlas.canvas.height;

                    // prettier-ignore
                    this.texVertices.push(
                        u1, v2,
                        u2, v2,
                        u1, v1,
                        u1, v1,
                        u2, v2,
                        u2, v1
                    );

                    x += letterWidth + letterSpacing;
                }
            }

            x = -width / 2;
            y -= lineHeight;
        }
    }

    private preProcessText(
        fontAtlas: FontAtlas,
        { text, fontSize, letterSpacing, lineHeight, boundingBox: { width, height } }: TextRenderData,
    ): { width: number; text: string }[] {
        const result: { width: number; text: string }[] = [];

        // Normalize
        letterSpacing /= fontSize;
        lineHeight /= fontSize;
        width /= fontSize;
        height /= fontSize;
        const spaceWidth = fontAtlas.glyphs.get(" ").width / fontAtlas.fontSize + letterSpacing;

        let currentHeight = 0;

        const lines = text.split("\n");

        for (const line of lines) {
            let newLine: string[] = [];
            let lineWidth = 0;
            currentHeight += lineHeight;

            const words = line.split(" ");
            for (const word of words) {
                if (currentHeight > height) return result;

                let wordWidth = 0;
                for (const letter of word) {
                    const glyph = fontAtlas.glyphs.get(letter);
                    if (glyph) wordWidth += glyph.width / fontAtlas.fontSize + letterSpacing;
                }
                wordWidth -= letterSpacing;

                if (lineWidth + wordWidth === width) {
                    lineWidth += wordWidth;
                    newLine.push(word);
                    result.push({ width: lineWidth, text: newLine.join(" ") });
                    newLine = [];
                    lineWidth = 0;
                    currentHeight += lineHeight;
                } else if (lineWidth + wordWidth > width) {
                    result.push({ width: lineWidth, text: newLine.join(" ") });
                    newLine = [word];
                    lineWidth = wordWidth + spaceWidth;
                    currentHeight += lineHeight;
                } else {
                    lineWidth += wordWidth + spaceWidth;
                    newLine.push(word);
                }
            }

            if (newLine.length > 0) {
                result.push({ width: lineWidth, text: newLine.join(" ") });
            }
        }

        return result;
    }
}
