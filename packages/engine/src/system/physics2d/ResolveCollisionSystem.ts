import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import {
    BroadPhaseResolver,
    Collider,
    CollisionRepository,
    CollisionMethod,
    Shape,
    CollisionResolutionPool,
} from "@angry-pixel/collisions";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { BallCollider } from "@component/physics2d/BallCollider";
import { BoxCollider } from "@component/physics2d/BoxCollider";
import { EdgeCollider } from "@component/physics2d/EdgeCollider";
import { PolygonCollider } from "@component/physics2d/PolygonCollider";
import { TilemapCollider } from "@component/physics2d/TilemapCollider";

/**
 * Array containing which layers will collide with each other.
 * @category Config
 * @public
 */
export type CollisionMatrix = [string, string][];

@injectable(SYSTEM_SYMBOLS.ResolveCollisionSystem)
export class ResolveCollisionSystem implements System {
    // auxiliars
    private colliderTypes = [BallCollider, BoxCollider, PolygonCollider, EdgeCollider, TilemapCollider];
    private colliders: Collider[] = [];
    private resolvedCollisions: Set<string> = new Set();
    private shapes: Shape[] = [];
    /** When set, O(1) layer-pair lookup instead of scanning collisionMatrix per neighbor */
    private readonly layerNeighbors: Map<string, Set<string>> | undefined;

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.CollisionBroadphaseResolver) private broadPhaseResolver: BroadPhaseResolver,
        @inject(SYMBOLS.CollisionMatrix) collisionMatrix: CollisionMatrix | undefined,
        @inject(SYMBOLS.CollisionResolutionMethod) private collisionResolutionMethod: CollisionMethod,
        @inject(SYMBOLS.CollisionRepository) private collisionRepository: CollisionRepository,
        @inject(SYMBOLS.CollisionResolutionPool) private collisionResolutionPool: CollisionResolutionPool,
    ) {
        if (collisionMatrix) {
            const map = new Map<string, Set<string>>();
            for (let i = 0; i < collisionMatrix.length; i++) {
                const [a, b] = collisionMatrix[i];
                if (!map.has(a)) map.set(a, new Set());
                if (!map.has(b)) map.set(b, new Set());
                map.get(a)!.add(b);
                map.get(b)!.add(a);
            }
            this.layerNeighbors = map;
        }
    }

    public onUpdate(): void {
        this.collisionRepository.clear();
        this.resolvedCollisions.clear();
        this.collisionResolutionPool.clear();
        this.colliders.length = 0;
        this.shapes.length = 0;

        this.colliderTypes.forEach((type) =>
            this.entityManager.search<Collider>(type, (collider, entity) => {
                this.colliders.push(collider);
                collider.shapes.forEach((shape) => {
                    shape.entity = entity;
                    shape.collider = this.colliders.length - 1;
                    shape.id = this.shapes.length;
                    shape.ignoreCollisionsWithLayers = collider.ignoreCollisionsWithLayers ?? [];
                    shape.layer = collider.layer;
                    this.shapes.push(shape);
                });
            }),
        );

        this.broadPhaseResolver.update(this.shapes);

        this.shapes
            .filter((shape) => shape.updateCollisions)
            .forEach((shape) => this.narrowPhase(shape, this.broadPhase(shape)));
    }

    // broad phase takes care of looking for possible collisions
    private broadPhase({ boundingBox, layer }: Shape): Shape[] {
        const ids = this.broadPhaseResolver.retrieve(boundingBox);
        const n = ids.length;
        const out: Shape[] = [];

        if (this.layerNeighbors) {
            const allowed = this.layerNeighbors.get(layer);
            if (!allowed) {
                return out;
            }
            for (let i = 0; i < n; i++) {
                const remote = this.shapes[ids[i]];
                if (allowed.has(remote.layer)) {
                    out.push(remote);
                }
            }
            return out;
        }

        for (let i = 0; i < n; i++) {
            out.push(this.shapes[ids[i]]);
        }
        return out;
    }

    // narrow phase takes care of checking for actual collision
    private narrowPhase(local: Shape, neighbors: Shape[]): void {
        neighbors
            .filter(
                (neighbor) =>
                    local.entity !== neighbor.entity &&
                    local.id !== neighbor.id &&
                    !local.ignoreCollisionsWithLayers.includes(neighbor.layer) &&
                    !neighbor.ignoreCollisionsWithLayers.includes(local.layer) &&
                    !this.isResolved(local, neighbor),
            )
            .forEach((neighbor) => {
                this.resolvedCollisions.add(`${local.id}-${neighbor.id}`);
                this.resolvedCollisions.add(`${neighbor.id}-${local.id}`);

                const resolution = this.collisionResolutionMethod.findCollision(local, neighbor);

                if (resolution) {
                    this.collisionRepository.persist(
                        local.entity,
                        this.colliders[local.collider],
                        neighbor.entity,
                        this.colliders[neighbor.collider],
                        resolution,
                    );
                }
            });
    }

    private isResolved(local: Shape, neighbor: Shape): boolean {
        return this.resolvedCollisions.has(`${local.id}-${neighbor.id}`);
    }
}
