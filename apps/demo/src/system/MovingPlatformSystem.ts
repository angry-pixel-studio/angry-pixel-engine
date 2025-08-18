import { GameSystem, RigidBody, Transform, Vector2 } from "angry-pixel";
import { MovingPlatform } from "@component/MovingPlatform";

export class MovingPlatformSystem extends GameSystem {
    public onEnabled(): void {
        this.entityManager.search(MovingPlatform).forEach(({ entity, component: platform }) => {
            this.entityManager.getComponent(entity, Transform).position.copy(platform.spots[0]);
            platform.nextSpot = 1;
            Vector2.unit(
                platform.direction,
                Vector2.subtract(platform.direction, platform.spots[1], platform.spots[0]),
            );
        });
    }

    public onUpdate(): void {
        this.entityManager.search(MovingPlatform).forEach(({ entity, component: platform }) => {
            const { position } = this.entityManager.getComponent(entity, Transform);
            const rigidBody = this.entityManager.getComponent(entity, RigidBody);

            let nextSpotPos = platform.spots[platform.nextSpot];

            if (this.needsToUpdatePosition(position, nextSpotPos, platform.direction)) {
                platform.nextSpot = (platform.nextSpot + 1) % platform.spots.length;
                nextSpotPos = platform.spots[platform.nextSpot];
                Vector2.unit(platform.direction, Vector2.subtract(platform.direction, nextSpotPos, position));
            }

            Vector2.scale(rigidBody.velocity, platform.direction, platform.speed);
        });
    }

    private needsToUpdatePosition(position: Vector2, nextSpotPos: Vector2, direction: Vector2): boolean {
        return (
            Math.sign(nextSpotPos.x - position.x) !== Math.sign(direction.x) ||
            Math.sign(nextSpotPos.y - position.y) !== Math.sign(direction.y)
        );
    }
}
