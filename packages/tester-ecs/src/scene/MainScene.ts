import {
    Camera,
    defaultRenderLayer,
    randomInt,
    Scene,
    ShadowRenderer,
    System,
    SystemType,
    Transform,
    Vector2,
} from "angry-pixel-ecs";
import { FpsMetterSystem } from "@system/FpsMetterSystem";
import { InputControllerSystem } from "@system/InputControllerSystem";
import { MovingPlatformSystem } from "@system/MovingPlatformSystem";
import { FollowPlayerCameraSystem } from "@system/camera/FollowPlayerCameraSystem";
import { GoblinMovementSystem } from "@system/goblin/GoblinMovementSystem";
import { NinjaAnimationSystem } from "@system/ninja/NinjaAnimationSystem";
import { NinjaMovementSystem } from "@system/ninja/NinjaMovementSystem";
import { NinjaSfxSystem } from "@system/ninja/NinjaSfxSystem";
import { ASSETS } from "@config/assets";
import { InputController } from "@component/InputController";
import { foregroundArchetype } from "@archetype/Foreground";
import { ninjaArchetypes } from "@archetype/Ninja";
import { movingPlatformArchetype } from "@archetype/MovingPlatform";
import { goblinArchetype } from "@archetype/Goblin";
import { textArchetype } from "@archetype/Text";
import { FpsMetter } from "@component/FpsMetter";
import { RENDER_LAYERS } from "@config/layers";
import { FollowPlayerCamera } from "@component/camera/FollowPlayerCamera";

export class MainScene extends Scene {
    public systems: SystemType<System>[] = [
        InputControllerSystem,
        MovingPlatformSystem,
        NinjaMovementSystem,
        NinjaAnimationSystem,
        NinjaSfxSystem,
        GoblinMovementSystem,
        FollowPlayerCameraSystem,
        FpsMetterSystem,
    ];

    public loadAssets(): void {
        Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
    }

    public setup(): void {
        this.setupMainCamera();
        this.setupUiCamera();

        this.entityManager.createEntity([InputController]);
        this.entityManager.createEntity(foregroundArchetype(this.assetManager));

        ninjaArchetypes(this.assetManager, new Vector2(0, 0)).forEach((archetype) =>
            this.entityManager.createEntity(archetype),
        );

        this.entityManager.createEntity(movingPlatformArchetype(this.assetManager));

        for (let i = 0; i < 20; i++) {
            this.entityManager.createEntity(goblinArchetype(this.assetManager, new Vector2(randomInt(-600, 192), 0)));
        }

        this.entityManager.createEntity(
            textArchetype(this.assetManager, "USE WASD TO MOVE AND SPACE BAR TO JUMP.", new Vector2(-940, -450)),
        );

        const fpsMetter = this.entityManager.createEntity(
            textArchetype(this.assetManager, "", new Vector2(-940, -500)),
        );
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
