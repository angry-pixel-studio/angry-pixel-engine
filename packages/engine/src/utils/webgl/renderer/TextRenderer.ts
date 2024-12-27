import { mat4 } from "gl-matrix";
import { Vector2 } from "@math";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { FontAtlas, FontAtlasFactory } from "../FontAtlasFactory";
import { TextureManager } from "../texture/TextureManager";
import { ProgramManager } from "../program/ProgramManager";
import { hexToRgba, setProjectionMatrix } from "./utils";

/**
 * Direction in which the text will be rendered.
 * @category Components
 * @public
 */
export enum TextOrientation {
    Center,
    RightUp,
    RightDown,
    RightCenter,
}

const TEXTURE_PREFIX = "FontTextureAtlas:";

export interface TextRenderData extends RenderData {
    color: string;
    flipHorizontally: boolean;
    flipVertically: boolean;
    font: FontFace | string;
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
    opacity: number;
    orientation: TextOrientation;
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
    private textSize: Vector2 = new Vector2();
    private modelPosition: Vector2 = new Vector2();
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
        this.setPositionFromOrientation(renderData);

        mat4.translate(this.modelMatrix, this.modelMatrix, [this.modelPosition.x, this.modelPosition.y, 0]);
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
            `${TEXTURE_PREFIX}${fontAtlas.id}${renderData.smooth ? ":smooth" : ""}`,
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

    private generateTextVertices(
        fontAtlas: FontAtlas,
        { text, fontSize, letterSpacing, lineHeight }: TextRenderData,
    ): void {
        this.posVertices = [];
        this.texVertices = [];

        let x = 0;
        let y = 0;

        let maxWidth = 0;

        letterSpacing /= fontSize;
        lineHeight /= fontSize;

        for (let i = 0; i < text.length; i++) {
            const letter = text[i];

            if (letter === "\n") {
                maxWidth = Math.max(maxWidth, x);
                x = 0;
                y -= lineHeight;

                continue;
            }

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

        this.textSize.set(Math.max(maxWidth, x) * fontSize, Math.abs(y - 1) * fontSize);
    }

    private setPositionFromOrientation(renderData: TextRenderData): void {
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
