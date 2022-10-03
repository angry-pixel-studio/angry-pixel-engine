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
