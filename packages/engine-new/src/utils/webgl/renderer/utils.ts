import { mat4 } from "gl-matrix";
import { Vector2 } from "math";

export const setProjectionMatrix = (
    projectionMatrix: mat4,
    gl: WebGL2RenderingContext,
    cameraZoom: number,
    cameraPosition: Vector2,
): void => {
    projectionMatrix = mat4.identity(projectionMatrix);

    mat4.ortho(
        projectionMatrix,
        -gl.canvas.width / 2,
        gl.canvas.width / 2,
        -gl.canvas.height / 2,
        gl.canvas.height / 2,
        -1,
        1,
    );

    mat4.scale(projectionMatrix, projectionMatrix, [cameraZoom ?? 1, cameraZoom ?? 1, 1]);
    mat4.translate(projectionMatrix, projectionMatrix, [-cameraPosition.x, -cameraPosition.y, 0]);
};

export type RGBA = { r: number; g: number; b: number; a: number };

export const hexToRgba = (hex: string): RGBA | null => {
    const result: string[] = /^#?([a-f\d]{2})?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? {
              r: parseInt(result[2], 16) / 256,
              g: parseInt(result[3], 16) / 256,
              b: parseInt(result[4], 16) / 256,
              a: result[1] !== undefined ? parseInt(result[1], 16) / 256 : 1,
          }
        : null;
};
