import { inject, injectable } from "@angry-pixel/ioc";
import { EntityManager, System } from "@angry-pixel/ecs";
import { Vector2 } from "@angry-pixel/math";
import { CollisionRepository } from "@angry-pixel/collisions";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { Transform } from "@component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";
import { TransformSystem } from "@system/gameLogic/TransformSystem";

@injectable(SYSTEM_SYMBOLS.ApplyRepositionSystem)
export class ApplyRepositionSystem implements System {
    // auxiliars
    private correction: Vector2 = new Vector2();
    private maxCorrection: Vector2 = new Vector2();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.CollisionRepository) private collisionRepository: CollisionRepository,
        @inject(SYSTEM_SYMBOLS.TransformSystem) private readonly transformSystem: TransformSystem,
    ) {}

    public onUpdate(): void {
        const collisions = this.collisionRepository
            .findAll()
            .filter(
                ({ localCollider, remoteCollider, remoteEntity, localEntity }) =>
                    localCollider.physics &&
                    remoteCollider.physics &&
                    this.entityManager.hasComponent(localEntity, RigidBody) &&
                    this.entityManager.hasComponent(remoteEntity, RigidBody),
            );

        if (collisions.length === 0) return;

        this.entityManager.search(RigidBody, (rigidBody, entity) => {
            if (rigidBody.type !== RigidBodyType.Dynamic) return;

            this.maxCorrection.set(0, 0);

            collisions
                .filter(({ localEntity }) => entity === localEntity)
                .forEach(({ remoteEntity, localCollider, remoteCollider, resolution: { direction, penetration } }) => {
                    const remoteRigidBody = this.entityManager.getComponent(remoteEntity, RigidBody);

                    // this body behaves as static for a colliding Dynamic body's layer, so it is not repositioned
                    // by this collision (the other Dynamic body takes the whole correction). Static/Kinematic
                    // remotes are never repositioned, so this body must still take the full correction against them.
                    if (
                        remoteRigidBody.type === RigidBodyType.Dynamic &&
                        rigidBody.staticForLayers.includes(remoteCollider.layer)
                    ) {
                        return;
                    }

                    // the remote body is treated as static toward this body when it is not dynamic, or when it
                    // behaves as static for this body's collider layer
                    const remoteActsAsStatic =
                        remoteRigidBody.type !== RigidBodyType.Dynamic ||
                        remoteRigidBody.staticForLayers.includes(localCollider.layer);

                    // if both bodies move, the correction distance is split so each is displaced by half the penetration
                    if (!remoteActsAsStatic) penetration /= 2;

                    Vector2.scale(this.correction, direction, -penetration);

                    if (this.correction.magnitude > this.maxCorrection.magnitude) {
                        this.maxCorrection.copy(this.correction);
                    }
                });

            if (this.maxCorrection.x === 0 && this.maxCorrection.y === 0) return;

            const { position } = this.entityManager.getComponent(entity, Transform);
            Vector2.add(position, position, this.maxCorrection);

            // due to gravity, we need to stop vertical velocity if it's direction is inverse to the correction direction
            if (rigidBody.gravity > 0 && this.maxCorrection.y * rigidBody.velocity.y < 0) {
                rigidBody.velocity.y = 0;
            }
        });

        this.transformSystem.onUpdate();
    }
}
