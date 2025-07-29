import { mat4 } from "gl-matrix";
import { Vector2 } from "@angry-pixel/math";
import { ICameraData } from "../../CameraData";
import { RenderDataType } from "../../renderData/RenderData";
import { ITextRenderData, TextOrientation } from "../../renderData/TextRenderData";
import { hexToRgba } from "../../utils/hexToRgba";
import { FontAtlas, IFontAtlasFactory } from "../FontAtlasFactory";
import { IProgramManager } from "../program/ProgramManager";
import { ITextureManager } from "../texture/TextureManager";
import { IRenderer } from "./IRenderer";
import { setProjectionMatrix } from "./Utils";

const DEFAULT_BITMAP_FONT_SIZE = 64;
const DEFAULT_BITMAP_MARGIN = new Vector2();
const DEFAULT_BITMAP_SPACING = new Vector2();
const DEFAULT_CHAR_RANGES = [32, 126, 161, 255];
const DEFAULT_COLOR = "#000000";
const DEFAULT_LETTER_SPACING = 0;
const DEFAULT_LINE_SEPARATION = 0;
const DEFAULT_ORIENTATION = TextOrientation.Center;
const DEFAULT_ALPHA = 1;
const DEFAULT_ROTATION = 0;

const TEXTURE_PREFIX = "FontFamily:";

export class TextRenderer implements IRenderer {
    public readonly type: RenderDataType = RenderDataType.Text;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // vertices
    private posVertices: number[] = [];
    private texVertices: number[] = [];

    // cache
    private lastTexture: WebGLTexture = null;
    private textSize: Vector2 = new Vector2();
    private modelPosition: Vector2 = new Vector2();

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: IProgramManager,
        private readonly textureManager: ITextureManager,
        private readonly fontAtlasFactory: IFontAtlasFactory,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public render(renderData: ITextRenderData, cameraData: ICameraData, lastRender: RenderDataType): void {
        if (!renderData.text) throw new Error("Nothing to render");

        this.setDefaultValues(renderData);

        const fontAtlas = this.fontAtlasFactory.getOrCreate(
            renderData.bitmap.charRanges,
            renderData.font,
            renderData.bitmap.fontSize,
        );

        this.generateTextVertices(fontAtlas, renderData);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.DYNAMIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);
        this.setPositionFromOrientation(renderData);

        mat4.translate(this.modelMatrix, this.modelMatrix, [this.modelPosition.x, this.modelPosition.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [renderData.fontSize, renderData.fontSize, 1]);

        this.textureMatrix = mat4.identity(this.textureMatrix);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData, renderData.location);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        if (renderData.alpha < 1) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }

        const texture = this.textureManager.getOrCreateTextureFromCanvas(
            TEXTURE_PREFIX + fontAtlas.fontFaceFamily,
            fontAtlas.canvas,
            renderData.smooth,
        );

        if (this.lastTexture !== texture || lastRender !== RenderDataType.Text) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.useTintColorUniform, 0);
        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.alpha);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.maskColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.maskColorMixUniform, 1);
        this.gl.uniform1i(this.programManager.useMaskColorUniform, 1);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.posVertices.length / 2);
    }

    private setDefaultValues(renderData: ITextRenderData): void {
        if (renderData.bitmap) {
            renderData.bitmap.margin = renderData.bitmap.margin ?? DEFAULT_BITMAP_MARGIN;
            renderData.bitmap.spacing = renderData.bitmap.spacing ?? DEFAULT_BITMAP_SPACING;
            renderData.bitmap.fontSize = renderData.bitmap.fontSize ?? DEFAULT_BITMAP_FONT_SIZE;
            renderData.bitmap.charRanges = renderData.bitmap.charRanges ?? DEFAULT_CHAR_RANGES;
        } else {
            renderData.bitmap = {
                margin: DEFAULT_BITMAP_MARGIN,
                spacing: DEFAULT_BITMAP_SPACING,
                fontSize: DEFAULT_BITMAP_FONT_SIZE,
                charRanges: DEFAULT_CHAR_RANGES,
            };
        }

        renderData.color = renderData.color ?? DEFAULT_COLOR;
        renderData.letterSpacing = renderData.letterSpacing ?? DEFAULT_LETTER_SPACING;
        renderData.lineSeparation = renderData.lineSeparation ?? DEFAULT_LINE_SEPARATION;
        renderData.alpha = renderData.alpha ?? DEFAULT_ALPHA;
        renderData.orientation = renderData.orientation ?? DEFAULT_ORIENTATION;
        renderData.rotation = renderData.rotation ?? DEFAULT_ROTATION;
    }

    private generateTextVertices(
        fontAtlas: FontAtlas,
        { text, fontSize, bitmap, letterSpacing, lineSeparation }: ITextRenderData,
    ): void {
        this.posVertices = [];
        this.texVertices = [];

        let x = 0;
        let y = 0;

        let maxWidth = 0;

        letterSpacing /= fontSize;
        lineSeparation /= fontSize;

        for (let i = 0; i < text.length; i++) {
            const letter = text[i];

            if (letter === "\n") {
                maxWidth = Math.max(maxWidth, x);
                x = 0;
                y -= 1 + lineSeparation;

                continue;
            }

            const glyph = fontAtlas.glyphs.get(letter);

            if (glyph) {
                const letterWidth = glyph.width / fontAtlas.bitmapFontSize;

                // prettier-ignore
                this.posVertices.push(
                    x, y - 1,
                    x + letterWidth, y - 1,
                    x, y,
                    x, y,
                    x + letterWidth, y - 1,
                    x + letterWidth, y
                )

                const gx = (glyph.id % fontAtlas.gridSize) * fontAtlas.bitmapFontSize;
                const gy = ((glyph.id / fontAtlas.gridSize) | 0) * fontAtlas.bitmapFontSize;

                const u1 = (gx + bitmap.margin.x) / fontAtlas.canvas.width;
                const v1 = (gy + bitmap.margin.y) / fontAtlas.canvas.width;
                const u2 = (gx + glyph.width + bitmap.spacing.x) / fontAtlas.canvas.width;
                const v2 = (gy + fontAtlas.bitmapFontSize + bitmap.spacing.y) / fontAtlas.canvas.width;

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

        this.textSize.set(Math.max(maxWidth, x) * fontSize, Math.abs(y - 1) * fontSize);
    }

    private setPositionFromOrientation(renderData: ITextRenderData): void {
        this.modelPosition.set(
            renderData.position.x + (renderData.orientation === TextOrientation.Center ? -this.textSize.x / 2 : 0),
            renderData.position.y +
                (renderData.orientation === TextOrientation.Center ||
                renderData.orientation === TextOrientation.RightCenter
                    ? this.textSize.y / 2
                    : renderData.orientation === TextOrientation.RightUp
                      ? this.textSize.y
                      : 0),
        );
    }
}
