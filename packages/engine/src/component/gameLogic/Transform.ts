import { Vector2 } from "@angry-pixel/math";

/**
 * Transform component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const transform = new Transform({
 *   position: new Vector2(100, 100),
 *   scale: new Vector2(2, 2),
 *   rotation: Math.PI / 4
 *   ignoreParentPosition: false,
 *   ignoreParentScale: false,
 *   ignoreParentRotation: false
 * });
 * ```
 */
export interface TransformOptions {
    position: Vector2;
    scale: Vector2;
    rotation: number;
    ignoreParentPosition: boolean;
    ignoreParentScale: boolean;
    ignoreParentRotation: boolean;
}

/**
 * The Transform component defines an entity's position, scale and rotation in the game world.\
 * It can be nested under a parent transform to create hierarchical relationships, where child
 * transforms inherit and combine with their parent's transformations.\
 * The component provides both local and world-space values, and allows selectively ignoring parent transformations.
 * @public
 * @category Components
 * @example
 * ```js
 * const transform = new Transform({
 *   position: new Vector2(100, 100),
 *   scale: new Vector2(2, 2),
 *   rotation: Math.PI / 4
 * });
 * ```
 */
export class Transform {
    /** Position relative to the zero point of the simulated world, or relative to the parent if it has one */
    position: Vector2 = new Vector2();
    /** Scale on x-axis and y-axis */
    scale: Vector2 = new Vector2(1, 1);
    /** Rotation expressed in radians */
    rotation: number = 0;
    /** If TRUE, the parent position will be ignored */
    ignoreParentPosition: boolean = false;
    /** If TRUE, the parent scale will be ignored */
    ignoreParentScale: boolean = false;
    /** If TRUE, the parent rotation will be ignored */
    ignoreParentRotation: boolean = false;

    /** READONLY: The real position in the simulated world. It has the same value as `position` property if there is no parent */
    localPosition: Vector2 = new Vector2();
    /** READONLY: The real scale in the simulated world. It has the same value as `scale` property if there is no parent */
    localScale: Vector2 = new Vector2(1, 1);
    /** READONLY: The real rotation in the simulated world. It has the same value as `rotation` property if there is no parent */
    localRotation: number = 0;

    /** @internal */
    _awake: boolean = false;
    /** @internal */
    _parent: Transform = undefined;
    /** @internal */
    static componentName: string = "Transform";

    constructor(options?: Partial<TransformOptions>) {
        Object.assign(this, options);
    }
}
