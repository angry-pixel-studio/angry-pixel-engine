import { EntityIdentifier } from "@component/EntityIdentifier";
import { SceneData } from "@types";
import {
    AssetManager,
    Camera,
    EntityManager,
    inject,
    MaskRenderer,
    SpriteRenderer,
    SYMBOLS,
    System,
    TimeManager,
    Transform,
} from "angry-pixel";

export class LoadSceneSystem implements System {
    constructor(
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject("SceneData") private readonly sceneData: SceneData,
    ) {}

    onCreate(): void {
        this.timeManager.timeScale = 0;

        this.loadAssets();
        this.createEntities();
    }

    private loadAssets(): void {
        const { images, fonts, audio, video } = this.sceneData.assets;
        Object.values(images).forEach((filename) => this.assetManager.loadImage(filename));
        Object.values(fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        Object.values(audio).forEach((filename) => this.assetManager.loadAudio(filename));
        Object.values(video).forEach((filename) => this.assetManager.loadVideo(filename));
    }

    private createEntities(): void {
        this.sceneData.entities.forEach(({ id, name, components }) => {
            this.entityManager.createEntity([
                new EntityIdentifier({ id, name }),
                ...components
                    .map((component) => {
                        switch (component.name) {
                            case "Transform":
                                return new Transform(component.data);
                            case "Camera":
                                return new Camera(component.data);
                            case "SpriteRenderer":
                                return new SpriteRenderer(component.data);
                            case "MaskRenderer":
                                return new MaskRenderer(component.data);
                            default:
                                return undefined;
                        }
                    })
                    .filter((component) => component !== undefined),
            ]);
        });
    }

    onUpdate(): void {}
}
