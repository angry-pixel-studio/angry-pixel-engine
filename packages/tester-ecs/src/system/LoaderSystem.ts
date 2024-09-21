import { Camera, GameSystem, ShadowRenderer, Transform, Vector2, defaultRenderLayer, randomInt } from "angry-pixel-ecs";
import { ASSETS } from "../config/assets";
import { foregroundFactory } from "../factory/Foreground";
import { ninjaFactory } from "../factory/Ninja";
import { InputController } from "../component/InputController";
import { movingPlatformFactory } from "../factory/MovingPlatform";
import { goblinFactory } from "../factory/Goblin";
import { RENDER_LAYERS } from "../config/layers";
import { FollowPlayerCamera } from "../component/camera/FollowPlayerCamera";
import { textFactory } from "../factory/Text";
import { FpsMetter } from "../component/FpsMetter";

export class LoaderSystem extends GameSystem {
    public onCreate(): void {
        Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
    }

    public onEnabled(): void {
        this.setupMainCamera();
        this.setupUiCamera();

        this.entityManager.createEntity([InputController]);
        this.entityManager.createEntity(foregroundFactory(this.assetManager));
        this.entityManager.createEntity(ninjaFactory(this.assetManager, this.entityManager, new Vector2(-300, 0)));
        this.entityManager.createEntity(movingPlatformFactory(this.assetManager));

        for (let i = 0; i < 10; i++) {
            this.entityManager.createEntity(
                goblinFactory(this.assetManager, this.entityManager, new Vector2(randomInt(-600, 192), 0)),
            );
        }

        this.entityManager.createEntity(
            textFactory(this.assetManager, "USE WASD TO MOVE AND SPACE BAR TO JUMP.", new Vector2(-940, -450)),
        );

        const fpsMetter = this.entityManager.createEntity(textFactory(this.assetManager, "", new Vector2(-940, -500)));
        this.entityManager.addComponent(fpsMetter, FpsMetter);
    }

    private setupMainCamera(): void {
        const camera = new Camera();
        camera.layers = [
            RENDER_LAYERS.Foreground,
            RENDER_LAYERS.Goblin,
            RENDER_LAYERS.Ninja,
            RENDER_LAYERS.Shadow,
            defaultRenderLayer,
        ];
        camera.zoom = 4;

        const shadowRenderer = new ShadowRenderer();
        shadowRenderer.color = "#000000";
        shadowRenderer.width = 1920 / camera.zoom;
        shadowRenderer.height = 1080 / camera.zoom;
        shadowRenderer.layer = RENDER_LAYERS.Shadow;
        shadowRenderer.opacity = 1;

        this.entityManager.createEntity([Transform, camera, FollowPlayerCamera, shadowRenderer]);
    }

    private setupUiCamera(): void {
        const camera = new Camera();
        camera.depth = 1;
        camera.layers = [RENDER_LAYERS.UI];

        this.entityManager.createEntity([Transform, camera]);
    }
}
