import { GameSystem, Transform, Vector2 } from "angry-pixel";
import { MovingPlatform } from "@component/MovingPlatform";

export class MovingPlatformSystem extends GameSystem {
    //cache
    private position: Vector2 = new Vector2();

    public onEnabled(): void {
        this.entityManager.search(MovingPlatform).forEach(({ entity, component: movingPlatform }) => {
            this.entityManager
                .getComponent(entity, Transform)
                .position.copy(movingPlatform.positions[movingPlatform.nextPositionIndex]);
        });
    }

    public onUpdate(): void {
        this.entityManager.search(MovingPlatform).forEach(({ entity, component: movingPlatform }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            let nextPosition = movingPlatform.positions[movingPlatform.nextPositionIndex];

            if (transform.position.equals(nextPosition)) {
                movingPlatform.nextPositionIndex =
                    (movingPlatform.nextPositionIndex + 1) % movingPlatform.positions.length;
                nextPosition = movingPlatform.positions[movingPlatform.nextPositionIndex];
            }

            Vector2.unit(
                movingPlatform.direction,
                Vector2.subtract(movingPlatform.direction, nextPosition, transform.position),
            );

            this.position.x =
                transform.position.x + movingPlatform.direction.x * movingPlatform.speed * this.timeManager.deltaTime;
            this.position.y =
                transform.position.y + movingPlatform.direction.y * movingPlatform.speed * this.timeManager.deltaTime;

            transform.position.x =
                transform.position.x < nextPosition.x
                    ? Math.min(this.position.x, nextPosition.x)
                    : Math.max(this.position.x, nextPosition.x);

            transform.position.y =
                transform.position.y < nextPosition.y
                    ? Math.min(this.position.y, nextPosition.y)
                    : Math.max(this.position.y, nextPosition.y);

            // console.log(transform.position);
        });
    }
}
