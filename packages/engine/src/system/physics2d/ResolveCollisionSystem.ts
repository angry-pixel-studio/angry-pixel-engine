import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { Vector2 } from "@math";
import { BroadPhaseResolver, Collider, CollisionRepository, CollisionMethod, Shape } from "@collisions2d";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
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

@injectable(SYSTEM_TYPES.ResolveCollisionSystem)
export class ResolveCollisionSystem implements System {
    // auxiliars
    private colliderTypes = [BallCollider, BoxCollider, PolygonCollider, EdgeCollider, TilemapCollider];
    private colliders: Collider[] = [];
    private collisions: Set<string> = new Set();
    private shapes: Shape[] = [];

    constructor(
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.CollisionBroadphaseResolver) private broadPhaseResolver: BroadPhaseResolver,
        @inject(DEPENDENCY_TYPES.CollisionMatrix) private collisionMatrix: CollisionMatrix,
        @inject(DEPENDENCY_TYPES.CollisionResolutionMethod) private collisionResolutionMethod: CollisionMethod,
        @inject(DEPENDENCY_TYPES.CollisionRepository) private collisionRepository: CollisionRepository,
    ) {}

    public onUpdate(): void {
        this.collisionRepository.removeAll();
        this.colliders = [];
        this.collisions.clear();
        this.shapes = [];

        this.colliderTypes.forEach((type) =>
            this.entityManager.search<Collider>(type).forEach(({ component: collider, entity }) => {
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
        return this.collisionMatrix
            ? this.broadPhaseResolver
                  .retrieve(boundingBox)
                  .map<Shape>((id) => this.shapes[id])
                  .filter((remote) =>
                      this.collisionMatrix.some(
                          (row) =>
                              (row[0] === layer && row[1] === remote.layer) ||
                              (row[1] === layer && row[0] === remote.layer),
                      ),
                  )
            : this.broadPhaseResolver.retrieve(boundingBox).map<Shape>((id) => this.shapes[id]);
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
                const resolution = this.collisionResolutionMethod.findCollision(local, neighbor);

                if (resolution) {
                    this.collisionRepository.persist({
                        localCollider: this.colliders[local.collider],
                        localEntity: local.entity,
                        remoteCollider: this.colliders[neighbor.collider],
                        remoteEntity: neighbor.entity,
                        resolution,
                    });

                    this.collisionRepository.persist({
                        localCollider: this.colliders[neighbor.collider],
                        localEntity: neighbor.entity,
                        remoteCollider: this.colliders[local.collider],
                        remoteEntity: local.entity,
                        resolution: {
                            direction: Vector2.scale(new Vector2(), resolution.direction, -1),
                            penetration: resolution.penetration,
                        },
                    });

                    this.collisions.add(`${local.id}-${neighbor.id}`);
                    this.collisions.add(`${neighbor.id}-${local.id}`);
                }
            });
    }

    private isResolved(local: Shape, neighbor: Shape): boolean {
        return this.collisions.has(`${local.id}-${neighbor.id}`);
    }
}
