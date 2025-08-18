import { Component, ComponentType, DisabledComponent } from "./types";

export const deepClone = <T>(value: T): T => {
    if (value === null || typeof value !== "object") {
        return value; // primitives
    }

    // avoid cloning DOM elements
    if (typeof Node !== "undefined" && value instanceof Node) {
        return value;
    }

    // avoid cloning FontFace instances
    if (typeof FontFace !== "undefined" && value instanceof FontFace) {
        return value;
    }

    if (value instanceof Date) {
        return new Date(value.getTime()) as any;
    }

    if (value instanceof Array) {
        return value.map((item) => deepClone(item)) as any;
    }

    if (value instanceof Map) {
        const result = new Map();
        for (const [k, v] of value) {
            result.set(deepClone(k), deepClone(v));
        }
        return result as any;
    }

    if (value instanceof Set) {
        const result = new Set();
        for (const item of value) {
            result.add(deepClone(item));
        }
        return result as any;
    }

    // creates an empty object with the same prototype as the original value
    const proto = Object.getPrototypeOf(value);
    const clone = Object.create(proto);

    // clone all properties of the original value
    for (const key of Object.keys(value)) {
        clone[key] = deepClone((value as any)[key]);
    }

    return clone;
};

/**
 * Creates a disabled component
 * @param component The component to disable
 * @returns The disabled component
 * @category Entity-Component-System
 * @public
 * @example
 * ```js
 * const disabledTransform = disableComponent(Transform);
 * ```
 */
export const disableComponent = (component: Component | ComponentType): DisabledComponent => ({
    enabled: false,
    component,
});
