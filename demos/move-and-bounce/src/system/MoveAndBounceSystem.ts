import { MoveAndBounce } from '@component/MoveAndBounce';
import { GameSystem, randomInt, rgbToHex, Transform } from 'angry-pixel';

const randomColor = (): string =>
  rgbToHex({
    r: randomInt(0, 255),
    g: randomInt(0, 255),
    b: randomInt(0, 255),
  });

export class MoveAndBounceSystem extends GameSystem {
  onUpdate(): void {
    this.entityManager.search(MoveAndBounce).forEach(({ component, entity }) => {
      const transform = this.entityManager.getComponent(entity, Transform);
      const { boundaries, direction, speed } = component;

      if (transform.position.y >= boundaries[0] || transform.position.y <= boundaries[1]) {
        direction.y *= -1;
        this.gameConfig.canvasColor = randomColor();
      }

      if (transform.position.x >= boundaries[2] || transform.position.x <= boundaries[3]) {
        direction.x *= -1;
        this.gameConfig.canvasColor = randomColor();
      }

      transform.position.x += direction.x * speed * this.timeManager.deltaTime;
      transform.position.y += direction.y * speed * this.timeManager.deltaTime;
    });
  }
}
