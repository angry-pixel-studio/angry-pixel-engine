import {
    AudioPlayer,
    MaskRenderer,
    MaskShape,
    randomInt,
    Scene,
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
import { foregroundArchetype, slopePlatform } from "@entity/Foreground";
import { ninjaArchetype } from "@entity/Ninja";
import { movingPlatformArchetype } from "@entity/MovingPlatform";
import { textArchetype } from "@entity/Text";
import { FpsMetter } from "@component/FpsMetter";
import { RENDER_LAYERS } from "@config/layers";
import { goblinArchetype } from "@entity/Goblin";
import { GoblinMovement } from "@component/goblin/GoblinMovement";
import { MovingPlatform } from "@component/MovingPlatform";
import { mainCamera, uiCamera } from "@entity/Camera";

export class MainScene extends Scene {
    public loadAssets(): void {
        Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
        Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename));
        Object.values(ASSETS.tilemap).forEach((filename) => this.assetManager.loadJson(filename));
    }

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

    public setup(): void {
        this.setupCameras();
        this.setupGameObjects();
        this.setupUIText();
        this.setupAudioPlayer();
        // this.entitiesForTesting();
    }

    private setupCameras(): void {
        this.entityManager.createEntity(mainCamera);
        this.entityManager.createEntity(uiCamera);
    }

    private setupGameObjects(): void {
        this.entityManager.createEntity([InputController]);

        this.entityManager.createEntityFromArchetype(foregroundArchetype);

        this.entityManager.createEntity(slopePlatform);

        this.entityManager.createEntityFromArchetype(ninjaArchetype);

        const movingPlatform = this.entityManager.createEntityFromArchetype(movingPlatformArchetype);
        this.entityManager.updateComponentData(movingPlatform, MovingPlatform, (component) => {
            component.spots = [new Vector2(-112, -72), new Vector2(168, -72)];
        });

        for (let i = 0; i < 50; i++) {
            const goblin = this.entityManager.createEntityFromArchetype(goblinArchetype);
            this.entityManager.updateComponentData(goblin, Transform, (component) => {
                component.position.x = randomInt(-600, 192);
            });
            this.entityManager.updateComponentData(goblin, GoblinMovement, (component) => {
                component.walkSpeed = randomInt(20, 60);
            });
        }
    }

    private setupUIText(): void {
        const instructionText = this.entityManager.createEntityFromArchetype(textArchetype);
        this.entityManager.updateComponentData(instructionText, Transform, (component) => {
            component.position.set(-940, -450);
        });
        this.entityManager.updateComponentData(instructionText, TextRenderer, (component) => {
            component.text = "USE WASD TO MOVE AND SPACE BAR TO JUMP.";
        });

        const fpsText = this.entityManager.createEntityFromArchetype(textArchetype);
        this.entityManager.updateComponentData(fpsText, Transform, (component) => {
            component.position.set(-940, -500);
        });
        this.entityManager.addComponent(fpsText, FpsMetter);
    }

    private setupAudioPlayer(): void {
        this.entityManager.createEntity([
            new AudioPlayer({
                audioSource: this.assetManager.getAudio(ASSETS.audio.mainSong),
                loop: true,
                volume: 0.3,
                action: "play",
            }),
        ]);
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
