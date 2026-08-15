import { AudioPlayer, Scene, TextRenderer, Transform } from "angry-pixel";
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
import { foregroundArchetype } from "@entity/Foreground";
import { textArchetype } from "@entity/Text";
import { FpsMetter } from "@component/FpsMetter";
import { mainCameraArchetype, uiCameraArchetype } from "@entity/Camera";

export class MainScene extends Scene {
    public loadAssets(): void {
        Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
        Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename));
        Object.values(ASSETS.tilemap).forEach((filename) => this.assetManager.loadJson(filename));
    }

    public registerSystems(): void {
        this.addSystems([
            InputControllerSystem,
            MovingPlatformSystem,
            NinjaMovementSystem,
            NinjaAnimationSystem,
            NinjaSfxSystem,
            GoblinMovementSystem,
            FollowPlayerCameraSystem,
            FpsMetterSystem,
        ]);
    }

    public createEntities(): void {
        this.setupCameras();
        this.setupGameObjects();
        this.setupUIText();
        this.setupAudioPlayer();
    }

    private setupCameras(): void {
        this.entityManager.createEntity(mainCameraArchetype);
        this.entityManager.createEntity(uiCameraArchetype);
    }

    private setupGameObjects(): void {
        this.entityManager.createEntity([InputController]);

        this.entityManager.createEntity(foregroundArchetype);
    }

    private setupUIText(): void {
        const instructionText = this.entityManager.createEntity(textArchetype);
        this.entityManager.updateComponentData(instructionText, Transform, (component) => {
            component.position.set(0, -450);
        });
        this.entityManager.updateComponentData(instructionText, TextRenderer, (component) => {
            component.text = "USE WASD TO MOVE AND SPACE BAR TO JUMP.";
        });

        const fpsText = this.entityManager.createEntity(textArchetype);
        this.entityManager.updateComponentData(fpsText, Transform, (component) => {
            component.position.set(0, -500);
        });
        this.entityManager.addComponent(fpsText, FpsMetter);
    }

    private setupAudioPlayer(): void {
        this.entityManager.createEntity([
            new AudioPlayer({
                audioSource: ASSETS.audio.mainSong,
                loop: true,
                volume: 0.3,
                action: "play",
            }),
        ]);
    }
}
