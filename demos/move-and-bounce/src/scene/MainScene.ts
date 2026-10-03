import { Scene } from "angry-pixel";
import { camera } from "@entity/Camera";
import { logo } from "@entity/Logo";
import { MoveAndBounceSystem } from "@system/MoveAndBounceSystem";

export class MainScene extends Scene {
    loadAssets(): void {
        this.assetManager.loadImage("image/angry-pixel.png");
    }

    setup(): void {
        this.systems = [MoveAndBounceSystem];

        this.entityManager.createEntity(camera);
        this.entityManager.createEntity(logo);
    }
}
