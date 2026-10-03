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

const MAX_CACHED_COLORS = 1024;
const rgbaCache: Map<string, Readonly<RGBA>> = new Map();

export const hexToRgba = (hex: string): Readonly<RGBA> => {
    const cached = rgbaCache.get(hex);
    if (cached !== undefined) return cached;

    const result: string[] = /^#?([a-f\d]{2})?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error(`Invalid hex color: ${hex}`);

    const rgba = Object.freeze({
        r: parseInt(result[2], 16) / 255,
        g: parseInt(result[3], 16) / 255,
        b: parseInt(result[4], 16) / 255,
        a: result[1] !== undefined ? parseInt(result[1], 16) / 255 : 1,
    });

    if (rgbaCache.size >= MAX_CACHED_COLORS) rgbaCache.clear();
    rgbaCache.set(hex, rgba);

    return rgba;
};
