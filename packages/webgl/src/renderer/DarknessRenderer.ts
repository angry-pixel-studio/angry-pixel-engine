import { mat4 } from "gl-matrix";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { Vector2 } from "@angry-pixel/math";
import { ProgramManager } from "../program/ProgramManager";
import { hexToRgba, setProjectionMatrix } from "./utils";

export interface DarknessRenderData extends RenderData {
    color: string;
    height: number;
    opacity: number;
    rotation: number;
    width: number;
    lights: Light[];
}

/**
 * Represents a light source
 * @internal
 * @example
 * ```js
 * const light = {
 *   position: new Vector2(10, 10),
 *   radius: 32,
 *   smooth: true,
 *   steps: 0,
 *   intensity: 0.7,
 *   color: "#FF9900",
 * }
 * ```
 */
export interface Light {
    /** The position of the light source */
    position: Vector2;
    /** The radius of the light source */
    radius: number;
    /** If it's TRUE the light will gradually disappear away from the origin point, if FALSE the light will be constant over its entire area. */
    smooth: boolean;
    /** Number of opacity steps of the smooth light, 0 means a continuous fade */
    steps: number;
    /** The intensity of the light, between 0 and 1 */
    intensity: number;
    /** The color of the light glow in hexadecimal, its strength is set by the intensity. No glow if it's not set. */
    color?: string;
}

export class DarknessRenderer implements Renderer {
    public readonly type: RenderDataType.Darkness;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private positionBuffer: WebGLBuffer;
    private lightGeometryData: Float32Array;
    private lightColorData: Float32Array;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: ProgramManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
        this.positionBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]),
            this.gl.STATIC_DRAW,
        );
    }

    public render(renderData: DarknessRenderData, cameraData: CameraData, lastRender?: RenderDataType): boolean {
        if (lastRender !== RenderDataType.Darkness) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.disableVertexAttribArray(this.programManager.texCoordsAttr);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [renderData.width, renderData.height, 1]);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.enable(this.gl.BLEND);
        // premultiplied alpha, so the light glow is added over the scene
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);
        this.gl.uniform1i(this.programManager.renderLightUniform, 1);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.opacity ?? 1);

        this.gl.uniform1f(this.programManager.lightPixelSizeUniform, cameraData.zoom);
        this.gl.uniform2f(
            this.programManager.lightGridOriginUniform,
            this.gl.canvas.width / 2 - cameraData.position.x * cameraData.zoom,
            this.gl.canvas.height / 2 - cameraData.position.y * cameraData.zoom,
        );

        // created on first use, because the light count is known once the program is loaded
        if (this.lightGeometryData?.length !== this.programManager.maxLights * 4) {
            this.lightGeometryData = new Float32Array(this.programManager.maxLights * 4);
            this.lightColorData = new Float32Array(this.programManager.maxLights * 4);
        }

        let numLights = 0;

        for (let i = 0; i < renderData.lights.length && numLights < this.programManager.maxLights; i++) {
            const light = renderData.lights[i];
            // snapped to the world unit grid so the pixelated circle keeps its shape while moving
            const x =
                this.gl.canvas.width / 2 + (Math.round(light.position.x) - cameraData.position.x) * cameraData.zoom;
            const y =
                this.gl.canvas.height / 2 + (Math.round(light.position.y) - cameraData.position.y) * cameraData.zoom;
            const radius = light.radius * cameraData.zoom;
            // one light pixel of margin, because the shader measures from the center of each light pixel
            const reach = radius + cameraData.zoom;

            if (
                x + reach < 0 ||
                x - reach > this.gl.canvas.width ||
                y + reach < 0 ||
                y - reach > this.gl.canvas.height
            ) {
                continue;
            }

            const offset = numLights++ * 4;

            this.lightGeometryData[offset] = x;
            this.lightGeometryData[offset + 1] = y;
            this.lightGeometryData[offset + 2] = radius;
            this.lightGeometryData[offset + 3] = light.smooth ? Math.max(0, Math.round(light.steps ?? 0)) : 1;

            const color = light.color ? hexToRgba(light.color) : undefined;
            this.lightColorData[offset] = color?.r ?? 0;
            this.lightColorData[offset + 1] = color?.g ?? 0;
            this.lightColorData[offset + 2] = color?.b ?? 0;
            this.lightColorData[offset + 3] = Math.max(0, Math.min(1, light.intensity));
        }

        this.gl.uniform1i(this.programManager.numLightsUniform, numLights);
        this.gl.uniform4fv(this.programManager.lightGeometryUniform, this.lightGeometryData);
        this.gl.uniform4fv(this.programManager.lightColorUniform, this.lightColorData);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.uniform1i(this.programManager.renderLightUniform, 0);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        return true;
    }
}
