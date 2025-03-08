import {
    AudioPlayer,
    Camera,
    defaultRenderLayer,
    MaskRenderer,
    MaskShape,
    PolygonCollider,
    randomInt,
    RigidBody,
    RigidBodyType,
    Scene,
    ShadowRenderer,
    TextOrientation,
    TextRenderer,
    Transform,
    Vector2,
    VideoRenderer,
} from "angry-pixel";
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
import { foregroundFactory } from "@factory/Foreground";
import { ninjaArchetype } from "@factory/Ninja";
import { movingPlatformFactory } from "@factory/MovingPlatform";
import { goblinFactory } from "@factory/Goblin";
import { textFactory } from "@factory/Text";
import { FpsMetter } from "@component/FpsMetter";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { FollowPlayerCamera } from "@component/camera/FollowPlayerCamera";

export class MainScene extends Scene {
    public loadSystems(): void {
        this.systems.push(
            InputControllerSystem,
            MovingPlatformSystem,
            NinjaMovementSystem,
            NinjaAnimationSystem,
            NinjaSfxSystem,
            GoblinMovementSystem,
            FollowPlayerCameraSystem,
            FpsMetterSystem,
        );
    }

    public loadAssets(): void {
        Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
        Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename));
    }

    public setup(): void {
        this.setupMainCamera();
        this.setupUiCamera();

        this.entityManager.createEntity([InputController]);
        this.entityManager.createEntity(foregroundFactory(this.assetManager));

        this.entityManager.createEntity(ninjaArchetype(this.assetManager, new Vector2(0, -40)));
        this.entityManager.createEntity(
            movingPlatformFactory(this.assetManager, [new Vector2(-112, -72), new Vector2(168, -72)]),
        );

        for (let i = 0; i < 50; i++) {
            this.entityManager.createEntity(goblinFactory(this.assetManager, new Vector2(randomInt(-600, 192), 0)));
        }

        this.entityManager.createEntity(
            textFactory(this.assetManager, "USE WASD TO MOVE AND SPACE BAR TO JUMP.", new Vector2(-940, -450)),
        );

        this.entityManager.createEntity([...textFactory(this.assetManager, "", new Vector2(-940, -500)), FpsMetter]);

        this.entityManager.createEntity([
            new Transform({ position: new Vector2(128, -112) }),
            new RigidBody({ type: RigidBodyType.Static }),
            new PolygonCollider({
                layer: COLLISION_LAYERS.Foreground,
                vertexModel: [new Vector2(0, 0), new Vector2(128, 64), new Vector2(128, 0)],
            }),
            new MaskRenderer({
                shape: MaskShape.Polygon,
                vertexModel: [new Vector2(0, 0), new Vector2(128, 64), new Vector2(128, 60), new Vector2(6, 0)],
                color: "#82aa28",
                layer: RENDER_LAYERS.Foreground,
            }),
        ]);

        this.entityManager.createEntity([
            new AudioPlayer({
                audioSource: this.assetManager.getAudio(ASSETS.audio.mainSong),
                loop: true,
                volume: 0.3,
                action: "play",
            }),
        ]);

        // this.entitiesForTesting();
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
        camera.debug = true;

        const shadowRenderer = new ShadowRenderer();
        shadowRenderer.color = "#000000";
        shadowRenderer.width = 1920 / camera.zoom;
        shadowRenderer.height = 1080 / camera.zoom;
        shadowRenderer.layer = RENDER_LAYERS.Shadow;
        shadowRenderer.opacity = 0;

        this.entityManager.createEntity([Transform, camera, FollowPlayerCamera, shadowRenderer]);
    }

    private setupUiCamera(): void {
        const camera = new Camera();
        camera.depth = 1;
        camera.layers = [RENDER_LAYERS.UI];

        this.entityManager.createEntity([Transform, camera]);
    }

    private entitiesForTesting(): void {
        this.entityManager.createEntity([
            new Transform({ position: new Vector2(0, 0) }),
            new VideoRenderer({
                video: this.assetManager.getVideo(ASSETS.video.example),
                loop: true,
                volume: 0.3,
                action: "play",
                layer: RENDER_LAYERS.Foreground,
                width: 1920 / 9,
                height: 1080 / 9,
            }),
        ]);

        this.entityManager.createEntity([
            new Transform({ position: new Vector2(128, -112) }),
            new MaskRenderer({
                shape: MaskShape.Circumference,
                radius: 64,
                color: "#597f1e",
                layer: RENDER_LAYERS.Foreground,
            }),
        ]);

        this.entityManager.createEntity([
            new Transform({ position: new Vector2(0, 0) }),
            new TextRenderer({
                text: "Ranma ½: らんま½",
                color: "#FF0000",
                fontSize: 64,
                width: 1920,
                height: 400,
                opacity: 1,
                layer: RENDER_LAYERS.UI,
                font: "Arial",
                orientation: TextOrientation.Center,
                textureAtlas: {
                    charRanges: [32, 126, 161, 255, 0x3040, 0x309f],
                    fontSize: 64,
                    spacing: 0,
                },
            }),
        ]);
    }
}
