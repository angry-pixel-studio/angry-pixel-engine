/**
 * Clamps the given value between the given minimum and maximum values.
 * @category Math
 * @public
 * @param value number to clamp
 * @param min min value
 * @param max max value
 * @returns clamped value
 * @example
 * ```js
 * clamp(10, 0, 5); // 5
 * clamp(10, 0, 15); // 10
 * ```
 */
export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * Returns a random integer number between the given minimum and maximum values.
 * @category Math
 * @public
 * @param min min value
 * @param max max value
 * @returns the random int value
 * @example
 * ```js
 * randomInt(0, 10); // 5
 * ```
 */
export const randomInt = (min: number, max: number): number => Math.round(Math.random() * (max - min)) + min;

/**
 * Returns a random float number between the given minimum and maximum values.
 * @category Math
 * @public
 * @param min min value
 * @param max max value
 * @returns the random float value
 * @example
 * ```js
 * randomFloat(0, 10); // 5.23
 * randomFloat(0, 10, 4); // 5.2345
 * ```
 */
export const randomFloat = (min: number, max: number, decimals: number = 2): number =>
    fixedRound(Math.random() * (max - min) + min, decimals);

/**
 * Corrects a floating number to a given number of decimal places.
 * @category Math
 * @public
 * @param value the value to round
 * @param decimals the number of decimals
 * @returns the rounded value
 * @example
 * ```js
 * fixedRound(5.2345, 2); // 5.23
 * ```
 */
export const fixedRound = (value: number, decimals: number): number =>
    Math.round(value * 10 ** decimals) / 10 ** decimals;

/**
 * Generate an array with a range of numbers.
 * @category Math
 * @public
 * @param start the starting value
 * @param end the end value
 * @param steps the steps to move
 * @returns number range
 * @example
 * ```js
 * range(0, 5); // [0, 1, 2, 3, 4, 5]
 * range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
 * ```
 */
export const range = (start: number, end: number, steps: number = 1): number[] => {
    const range: number[] = [];
    for (let i = start; i <= end; i += steps) {
        range.push(i);
    }
    return range;
};

/**
 * Evaluates whether the given value is between the minimum and the maximum (both inclusive).
 * @category Math
 * @public
 * @param value number to compare
 * @param min min value
 * @param max max value
 * @returns true if the number is between the min and the max, false instead
 * @example
 * ```js
 * between(5, 0, 10); // true
 * between(5, 0, 4); // false
 * ```
 */
export const between = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

/**
 * Converts the given radians to degrees.
 * @param radians
 * @returns degrees
 * @category Math
 * @public
 * @example
 * ```js
 * radiansToDegrees(Math.PI); // 180
 * ```
 */
export const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI);

/**
 * Converts the given degrees to radians.
 * @param degrees
 * @returns radians
 * @category Math
 * @public
 * @example
 * ```js
 * degreesToRadians(180); // 3.141592653589793
 * ```
 */
export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

/**
 * Convert RGB to HEX as string
 * @param rgb
 * @param prefix default is "#"
 * @returns string
 * @public
 * @category Math
 * @example
 * ```js
 * // default prefix "#"
 * rgbToHex({ r: 255, g: 255, b: 255 }); // #ffffff
 * ```
 * @example
 * ```js
 * // no prefix
 * rgbToHex({ r: 0, g: 255, b: 0 }, ""); // 00ff00
 * ```
 */
export const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }, prefix: string = "#"): string => {
    const hex = (x: number) => x.toString(16).padStart(2, "0");
    return `${prefix}${hex(r)}${hex(g)}${hex(b)}`;
};
