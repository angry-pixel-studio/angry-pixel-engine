import { mat4 } from "gl-matrix";
import { ICameraData } from "../../CameraData";
import { RenderLocation } from "../../renderData/RenderData";

export const setProjectionMatrix = (
    projectionMatrix: mat4,
    gl: WebGL2RenderingContext,
    cameraData: ICameraData,
    renderLocation: RenderLocation
): void => {
    projectionMatrix = mat4.identity(projectionMatrix);
    mat4.ortho(
        projectionMatrix,
        -gl.canvas.width / 2,
        gl.canvas.width / 2,
        -gl.canvas.height / 2,
        gl.canvas.height / 2,
        -1,
        1
    );

    if (renderLocation === RenderLocation.WorldSpace) {
        mat4.scale(projectionMatrix, projectionMatrix, [cameraData.zoom ?? 1, cameraData.zoom ?? 1, 1]);
        mat4.translate(projectionMatrix, projectionMatrix, [-cameraData.position.x, -cameraData.position.y, 0]);
    }
};
