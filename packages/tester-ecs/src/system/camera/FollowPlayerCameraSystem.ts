import {
    EntityManager,
    Rectangle,
    Symbols,
    System,
    TilemapRenderer,
    Transform,
    Vector2,
    clamp,
    inject,
} from "angry-pixel-ecs";
import { FollowPlayerCamera } from "@component/camera/FollowPlayerCamera";
import { NinjaMovement } from "@component/ninja/NinjaMovement";

const maxOffset = 40;

export class FollowPlayerCameraSystem implements System {
    // cache
    private playerOffset: Vector2 = new Vector2();
    private cachePosition: Vector2 = new Vector2();

    @inject(Symbols.EntityManager) private readonly entityManager: EntityManager;

    public onUpdate(): void {
        this.entityManager.search(FollowPlayerCamera).forEach(({ entity, component }) => {
            if (!component.playerTransform || !component.boundaries) this.initialize(component);

            const transform = this.entityManager.getComponent(entity, Transform);

            this.followPlayer(transform, component.playerTransform);
            this.clampToBoundaries(transform, component.boundaries);
        });
    }

    private initialize(component: FollowPlayerCamera): void {
        const player = this.entityManager.search(NinjaMovement)[0];
        component.playerTransform = this.entityManager.getComponent(player.entity, Transform);

        const foreground = this.entityManager.search(TilemapRenderer)[0];
        const transform = this.entityManager.getComponent(foreground.entity, Transform);
        const width = foreground.component.width * foreground.component.tileWidth;
        const height = foreground.component.height * foreground.component.tileHeight;

        component.boundaries = new Rectangle(
            transform.position.x - width / 2,
            transform.position.y - height / 2,
            width,
            height,
        );
    }

    private followPlayer(cameraTransform: Transform, playerTransform: Transform): void {
        Vector2.subtract(this.playerOffset, playerTransform.localPosition, cameraTransform.position);

        this.cachePosition.x = playerTransform.localPosition.x - clamp(this.playerOffset.x, -maxOffset, maxOffset);
        this.cachePosition.y = playerTransform.localPosition.y - clamp(this.playerOffset.y, -maxOffset, maxOffset);

        cameraTransform.position.copy(this.cachePosition);
    }

    private clampToBoundaries(cameraTransform: Transform, boundaries: Rectangle): void {
        cameraTransform.position.x = clamp(cameraTransform.position.x, boundaries.x + 240, boundaries.x1 - 240);
        cameraTransform.position.y = clamp(cameraTransform.position.y, boundaries.y + 135, boundaries.y1 - 135);
    }
}
