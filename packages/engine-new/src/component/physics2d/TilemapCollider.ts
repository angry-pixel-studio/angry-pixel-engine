import { Vector2 } from "math";
import { Collider, Shape } from "physics2d";

export interface TilemapColliderOptions {
    /** Generate colliders that represent the outer lines of the tile map */
    composite: boolean;
    /** Collision layer */
    layer: string;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
    /** X-Y axis offset */
    offset: Vector2;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
}

export class TilemapCollider implements Collider {
    /** Generate colliders that represent the outer lines of the tile map */
    composite: boolean = true;
    /** Collision layer */
    layer: string = "";
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[] = [];
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** @internal */
    shapes: Shape[] = [];
    /** @internal */
    updateCollisions: boolean = false;

    constructor(options: Partial<TilemapColliderOptions>) {
        Object.assign(this, options);
    }
}
