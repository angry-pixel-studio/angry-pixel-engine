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
 *   intensity: 0.7,
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
    /** The intensity of the light, between 0 and 1 */
    intensity: number;
}

export class DarknessRenderer implements Renderer {
    public readonly type: RenderDataType.Darkness;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private positionBuffer: WebGLBuffer;

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

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);
        this.gl.uniform1i(this.programManager.renderLightUniform, 1);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.opacity ?? 1);

        this.gl.uniform1i(this.programManager.numLightsUniform, renderData.lights.length);

        for (const [i, light] of renderData.lights.entries()) {
            if (i >= 64) break; // 64 is the max lights allowed

            this.gl.uniform2f(
                this.gl.getUniformLocation(this.programManager.program, `u_lights[${i}].position`),
                this.gl.canvas.width / 2 + (light.position.x - cameraData.position.x) * cameraData.zoom,
                this.gl.canvas.height / 2 + (light.position.y - cameraData.position.y) * cameraData.zoom,
            );

            this.gl.uniform1f(
                this.gl.getUniformLocation(this.programManager.program, `u_lights[${i}].radius`),
                light.radius * cameraData.zoom,
            );

            this.gl.uniform1f(
                this.gl.getUniformLocation(this.programManager.program, `u_lights[${i}].smoothMode`),
                light.smooth ? 1 : 0,
            );

            this.gl.uniform1f(
                this.gl.getUniformLocation(this.programManager.program, `u_lights[${i}].intensity`),
                Math.max(0, Math.min(1, light.intensity)),
            );
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.uniform1i(this.programManager.renderLightUniform, 0);

        return true;
    }
}
