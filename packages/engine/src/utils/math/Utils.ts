/**
 * Clamps the given value between the given minimum and maximum values.
 * @category Math
 * @public
 * @param value number to clamp
 * @param min min value
 * @param max max value
 * @returns clamped value
 */
export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * Returns a random integer number between the given minimum and maximum values.
 * @category Math
 * @public
 * @param min min value
 * @param max max value
 * @returns the random int value
 */
export const randomInt = (min: number, max: number): number => Math.round(Math.random() * (max - min)) + min;

/**
 * Returns a random float number between the given minimum and maximum values.
 * @category Math
 * @public
 * @param min min value
 * @param max max value
 * @returns the random float value
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
 */
export const between = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};
