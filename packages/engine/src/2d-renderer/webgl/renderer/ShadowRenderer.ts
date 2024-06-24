import { mat4 } from "gl-matrix";
import { ICameraData } from "../../CameraData";
import { RenderDataType } from "../../renderData/RenderData";
import { IRenderer } from "./IRenderer";
import { IProgramManager } from "../program/ProgramManager";
import { setProjectionMatrix } from "./Utils";
import { hexToRgba } from "../../utils/hexToRgba";
import { IShadowRenderData } from "../../renderData/ShadowRenderData";

export class ShadowRenderer implements IRenderer {
    public readonly type: RenderDataType.Shadow;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // prettier-ignore
    private readonly vertices = new Float32Array([
    -0.5, -0.5,
    -0.5, 0.5,
    0.5, -0.5,
    0.5, -0.5,
    -0.5, 0.5,
    0.5, 0.5
]);

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: IProgramManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public render(renderData: IShadowRenderData, cameraData: ICameraData): void {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [renderData.width, renderData.height, 1]);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData, renderData.location);

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

        renderData.lights.forEach((light, i) => {
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
        });

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.uniform1i(this.programManager.renderLightUniform, 0);
    }
}
