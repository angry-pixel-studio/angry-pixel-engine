import { mat4 } from "gl-matrix";
import { Vector2 } from "@math";

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

export type RGBA = { r: number; g: number; b: number; a?: number };

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

/**
 * Convert RGB to HEX as string (including #)
 * @param rgb
 * @returns string
 * @public
 * @category Math
 * @example
 * ```js
 * rgbToHex({ r: 255, g: 255, b: 255 }); // #ffffff
 * ```
 * @example
 * ```js
 * rgbToHex({ r: 0, g: 0, b: 0 }); // #000000
 * ```
 */
export const rgbToHex = ({ r, g, b }: RGBA): string => {
    const hex = (x: number) => x.toString(16).padStart(2, "0");
    return `#${hex(r)}${hex(g)}${hex(b)}`;
};
