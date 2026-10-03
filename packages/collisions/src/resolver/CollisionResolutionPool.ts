import { Vector2 } from "@angry-pixel/math";
import { CollisionResolution } from "./CollisionResolver";
import { SYMBOLS } from "../symbols";
import { injectable } from "@angry-pixel/ioc";

@injectable(SYMBOLS.CollisionResolutionPool)
export class CollisionResolutionPool {
    private pool: CollisionResolution[] = [];
    private index: number = 0;

    public get(): CollisionResolution {
        if (this.index >= this.pool.length) {
            this.pool.push({ direction: new Vector2(), penetration: 0 });
        }

        return this.pool[this.index++];
    }

    public clear(): void {
        this.index = 0;
    }
}
