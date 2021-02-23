export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result: string[] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? {
              r: parseInt(result[1], 16) / 256,
              g: parseInt(result[2], 16) / 256,
              b: parseInt(result[3], 16) / 256,
          }
        : null;
};
