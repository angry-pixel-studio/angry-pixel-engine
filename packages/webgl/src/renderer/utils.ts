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

/** The vertex buffers owned by a single render data object. */
export type VertexBuffers = { positionBuffer: WebGLBuffer; textureBuffer: WebGLBuffer };

/**
 * Deletes the vertex buffers of a render data object once it is garbage collected.
 * The held value must only reference the buffers, never the render data, or it would never be collected.
 */
export const createVertexBuffersRegistry = (gl: WebGL2RenderingContext): FinalizationRegistry<VertexBuffers> =>
    new FinalizationRegistry<VertexBuffers>(({ positionBuffer, textureBuffer }) => {
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(textureBuffer);
    });

/** Returns an array with room for at least `length` elements, keeping the first `keep` elements of the given one. */
export const growFloat32Array = (array: Float32Array, length: number, keep: number = 0): Float32Array => {
    if (array.length >= length) return array;

    const grown = new Float32Array(Math.max(length, array.length * 2));
    if (keep > 0) grown.set(array.subarray(0, keep));

    return grown;
};

/** Writes the two triangles of a quad (12 values) into the array, starting at the given offset. */
export const writeQuad = (
    array: Float32Array,
    offset: number,
    left: number,
    bottom: number,
    right: number,
    top: number,
): void => {
    array[offset] = left;
    array[offset + 1] = bottom;
    array[offset + 2] = right;
    array[offset + 3] = bottom;
    array[offset + 4] = left;
    array[offset + 5] = top;
    array[offset + 6] = left;
    array[offset + 7] = top;
    array[offset + 8] = right;
    array[offset + 9] = bottom;
    array[offset + 10] = right;
    array[offset + 11] = top;
};
