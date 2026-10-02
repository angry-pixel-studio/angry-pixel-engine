import { AudioPlayer, randomInt, Scene, TextRenderer, Transform } from "angry-pixel";
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
import { goblinArchetype } from "@entity/Goblin";
import { GoblinMovement } from "@component/goblin/GoblinMovement";

export class MainScene extends Scene {
    public loadAssets(): void {
        Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
        Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename));
        Object.values(ASSETS.tilemap).forEach((filename) => this.assetManager.loadJson(filename));
    }

    public setup(): void {
        this.systems = [
            InputControllerSystem,
            MovingPlatformSystem,
            NinjaMovementSystem,
            NinjaAnimationSystem,
            NinjaSfxSystem,
            GoblinMovementSystem,
            FollowPlayerCameraSystem,
            FpsMetterSystem,
        ];

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

        this.benchmarkGoblins(0);
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

    private benchmarkGoblins(amount: number): void {
        if (amount <= 0) return;

        for (let i = 0; i <= 350; i++) {
            const entity = this.entityManager.createEntity(goblinArchetype);
            this.entityManager.updateComponentData(entity, Transform, ({ position }) =>
                position.set(randomInt(-400, 400), 0),
            );

            this.entityManager.updateComponentData(entity, GoblinMovement, (c) => (c.walkSpeed = randomInt(40, 80)));
        }
    }
}
