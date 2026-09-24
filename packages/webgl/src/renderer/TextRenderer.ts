import { mat4 } from "gl-matrix";
import { Vector2 } from "@angry-pixel/math";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { FontAtlas, FontAtlasFactory } from "../FontAtlasFactory";
import { TextureManager } from "../texture/TextureManager";
import { ProgramManager } from "../program/ProgramManager";
import {
    createVertexBuffersRegistry,
    growFloat32Array,
    hexToRgba,
    setProjectionMatrix,
    VertexBuffers,
    writeQuad,
} from "./utils";

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

/**
 * GPU buffers of a single text render data, plus the snapshot of the inputs its vertices were generated from.
 * @internal
 */
type TextVertexEntry = {
    buffers: VertexBuffers;
    vertexCount: number;
    generated: boolean;
    text: string;
    font: FontFace | string;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    alignment: TextAlignment;
    boundingBoxWidth: number;
    boundingBoxHeight: number;
    fontAtlasId: string;
    fontAtlasWidth: number;
    fontAtlasHeight: number;
};

export class TextRenderer implements Renderer {
    public readonly type: RenderDataType = RenderDataType.Text;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private posVertices: Float32Array = new Float32Array(0);
    private texVertices: Float32Array = new Float32Array(0);

    // every render data owns its buffers, so the vertices are uploaded only when the text changes
    private readonly entries: WeakMap<TextRenderData, TextVertexEntry> = new WeakMap();
    private readonly buffersRegistry: FinalizationRegistry<VertexBuffers>;

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
        this.buffersRegistry = createVertexBuffersRegistry(this.gl);
    }

    public render(renderData: TextRenderData, cameraData: CameraData, lastRender: RenderDataType): boolean {
        if (!renderData.text) return false;

        const fontAtlas = this.fontAtlasFactory.getOrCreate({
            font: renderData.font,
            ...renderData.textureAtlas,
        });

        const entry = this.getOrCreateEntry(renderData);
        if (this.isDirty(entry, renderData, fontAtlas)) this.updateVertices(entry, renderData, fontAtlas);

        if (entry.vertexCount === 0) return false;

        // consecutive texts use different buffers, so the attributes are always set up
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.positionBuffer);
        this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
        this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.textureBuffer);
        this.gl.enableVertexAttribArray(this.programManager.texCoordsAttr);
        this.gl.vertexAttribPointer(this.programManager.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        // the shadow is drawn with the vertices of the main text, only the position and the color change
        if (renderData.shadow) {
            const { color, offset, opacity } = renderData.shadow;
            const shadowRenderData = {
                ...renderData,
                color,
                opacity: opacity * renderData.opacity,
                position: Vector2.add(this.shadowPosition, renderData.position, offset),
            };
            shadowRenderData.shadow = undefined;
            this.draw(shadowRenderData, entry, fontAtlas, cameraData, lastRender);
            lastRender = RenderDataType.Text;
        }

        this.draw(renderData, entry, fontAtlas, cameraData, lastRender);

        return true;
    }

    private draw(
        renderData: TextRenderData,
        entry: TextVertexEntry,
        fontAtlas: FontAtlas,
        cameraData: CameraData,
        lastRender: RenderDataType,
    ): void {
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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, entry.vertexCount);
    }

    private getOrCreateEntry(renderData: TextRenderData): TextVertexEntry {
        let entry = this.entries.get(renderData);
        if (entry) return entry;

        entry = {
            buffers: { positionBuffer: this.gl.createBuffer(), textureBuffer: this.gl.createBuffer() },
            vertexCount: 0,
            generated: false,
            text: undefined,
            font: undefined,
            fontSize: undefined,
            letterSpacing: undefined,
            lineHeight: undefined,
            alignment: undefined,
            boundingBoxWidth: undefined,
            boundingBoxHeight: undefined,
            fontAtlasId: undefined,
            fontAtlasWidth: undefined,
            fontAtlasHeight: undefined,
        };

        this.entries.set(renderData, entry);
        this.buffersRegistry.register(renderData, entry.buffers);

        return entry;
    }

    /** Only the inputs that affect the vertices are compared: color, opacity, position, rotation, flip and shadow do not */
    private isDirty(entry: TextVertexEntry, renderData: TextRenderData, fontAtlas: FontAtlas): boolean {
        return (
            !entry.generated ||
            entry.text !== renderData.text ||
            entry.font !== renderData.font ||
            entry.fontSize !== renderData.fontSize ||
            entry.letterSpacing !== renderData.letterSpacing ||
            entry.lineHeight !== renderData.lineHeight ||
            entry.alignment !== renderData.alignment ||
            // the bounding box is a new object every frame, so its values are compared
            entry.boundingBoxWidth !== renderData.boundingBox.width ||
            entry.boundingBoxHeight !== renderData.boundingBox.height ||
            entry.fontAtlasId !== fontAtlas.id ||
            entry.fontAtlasWidth !== fontAtlas.canvas.width ||
            entry.fontAtlasHeight !== fontAtlas.canvas.height
        );
    }

    private updateVertices(entry: TextVertexEntry, renderData: TextRenderData, fontAtlas: FontAtlas): void {
        entry.generated = true;
        entry.text = renderData.text;
        entry.font = renderData.font;
        entry.fontSize = renderData.fontSize;
        entry.letterSpacing = renderData.letterSpacing;
        entry.lineHeight = renderData.lineHeight;
        entry.alignment = renderData.alignment;
        entry.boundingBoxWidth = renderData.boundingBox.width;
        entry.boundingBoxHeight = renderData.boundingBox.height;
        entry.fontAtlasId = fontAtlas.id;
        entry.fontAtlasWidth = fontAtlas.canvas.width;
        entry.fontAtlasHeight = fontAtlas.canvas.height;

        const length = this.generateTextVertices(fontAtlas, renderData);
        entry.vertexCount = length / 2;

        if (length === 0) return;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.posVertices.subarray(0, length), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.texVertices.subarray(0, length), this.gl.DYNAMIC_DRAW);
    }

    /** Writes the vertices into the scratch arrays and returns the number of values written to each of them */
    private generateTextVertices(fontAtlas: FontAtlas, renderData: TextRenderData): number {
        let length = 0;

        // TODO: cache this
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

                    // 12 values per glyph: two triangles of two coordinates each
                    this.posVertices = growFloat32Array(this.posVertices, length + 12, length);
                    this.texVertices = growFloat32Array(this.texVertices, length + 12, length);

                    writeQuad(this.posVertices, length, x, y - 1, x + letterWidth, y);

                    const gx = (glyph.id % fontAtlas.gridSize) * (fontAtlas.fontSize + fontAtlas.spacing);
                    const gy = ((glyph.id / fontAtlas.gridSize) | 0) * (fontAtlas.fontSize + fontAtlas.spacing);

                    const u1 = gx / fontAtlas.canvas.width;
                    const v1 = gy / fontAtlas.canvas.height;
                    const u2 = (gx + glyph.width) / fontAtlas.canvas.width;
                    const v2 = (gy + fontAtlas.fontSize) / fontAtlas.canvas.height;

                    writeQuad(this.texVertices, length, u1, v2, u2, v1);

                    length += 12;

                    x += letterWidth + letterSpacing;
                }
            }

            x = -width / 2;
            y -= lineHeight;
        }

        return length;
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
                const firstWord = newLine.length === 0;

                let wordWidth = 0;
                for (const letter of word) {
                    const glyph = fontAtlas.glyphs.get(letter);
                    if (glyph) wordWidth += glyph.width / fontAtlas.fontSize + letterSpacing;
                }
                wordWidth -= letterSpacing;
                if (!firstWord) wordWidth += spaceWidth;

                if (firstWord && wordWidth >= width) {
                    result.push({ width: wordWidth, text: word });
                    currentHeight += lineHeight;
                } else if (lineWidth + wordWidth === width) {
                    newLine.push(word);
                    result.push({ width: lineWidth + wordWidth, text: newLine.join(" ") });
                    newLine = [];
                    lineWidth = 0;
                    currentHeight += lineHeight;
                } else if (lineWidth + wordWidth > width) {
                    result.push({ width: lineWidth, text: newLine.join(" ") });
                    newLine = [word];
                    lineWidth = wordWidth - spaceWidth;
                    currentHeight += lineHeight;
                } else {
                    lineWidth += wordWidth;
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
