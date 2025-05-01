/**
 * Constrains a number to be within a specified range by clamping it between a minimum and maximum value.\
 * If the value is less than the minimum, returns the minimum. If greater than the maximum, returns the maximum.\
 * Otherwise returns the original value unchanged.
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
 * Returns a random integer number between the given minimum (inclusive) and maximum (inclusive) values.\
 * Uses Math.random() internally to generate the random number, then rounds and scales it to fit the desired range.
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
 * Returns a random floating point number between the given minimum (inclusive) and maximum (inclusive) values.\
 * Uses Math.random() internally to generate the random number and can be rounded to a specified number of decimal places.
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
 * Rounds a floating point number to a specified number of decimal places.\
 * Uses Math.round() internally to avoid floating point precision errors that can occur with direct decimal arithmetic.\
 * For example, 5.2345 rounded to 2 decimal places becomes 5.23.
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
 * Generates an array containing a sequence of numbers from start to end (inclusive) with optional step size.\
 * For example, range(0,5) produces [0,1,2,3,4,5] and range(0,10,2) produces [0,2,4,6,8,10].\
 * Useful for creating numeric sequences and iteration ranges.
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
 * Checks if a number falls within a specified range (inclusive of both minimum and maximum bounds).\
 * Returns true if the value is greater than or equal to the minimum and less than or equal to the maximum.\
 * Useful for range checking, input validation, and boundary testing.
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
 * Converts an angle from radians to degrees by multiplying by (180/π).\
 * Useful for converting between angular measurement systems and displaying angles in a more human-readable format.
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
 * Converts an angle from degrees to radians by multiplying by (π/180).\
 * Useful for converting between angular measurement systems and performing trigonometric calculations.
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
 * Converts RGB color values to a hexadecimal color string.\
 * Takes red, green and blue color components (0-255) and returns a hex color code.\
 * Useful for converting between color formats and generating color strings for CSS/HTML.
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
