import { mat4 } from "gl-matrix";
import { Vector2 } from "@angry-pixel/math";

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

// unbounded: the color strings come from the game config, so the set of distinct values is expected to be small
const rgbaCache: Map<string, Readonly<RGBA> | null> = new Map();

export const hexToRgba = (hex: string): Readonly<RGBA> | null => {
    // null is a cached miss (invalid string), undefined means the string was never parsed
    const cached = rgbaCache.get(hex);
    if (cached !== undefined) return cached;

    const result: string[] = /^#?([a-f\d]{2})?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    const rgba = result
        ? Object.freeze({
              r: parseInt(result[2], 16) / 255,
              g: parseInt(result[3], 16) / 255,
              b: parseInt(result[4], 16) / 255,
              a: result[1] !== undefined ? parseInt(result[1], 16) / 255 : 1,
          })
        : null;

    rgbaCache.set(hex, rgba);

    return rgba;
};
