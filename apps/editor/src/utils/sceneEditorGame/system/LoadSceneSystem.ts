import { EntityIdentifier } from "../component/EntityIdentifier";
import { AssetType, Scene } from "../../../types/scene";
import {
    AssetManager,
    Camera,
    EntityManager,
    inject,
    SpriteRenderer,
    SYMBOLS,
    System,
    SystemManager,
    TilemapRenderer,
    Tileset,
    TimeManager,
    Transform,
} from "angry-pixel";
import { SceneState } from "../../../stores/sceneStore";
import { StoreApi, UseBoundStore } from "zustand";

export class LoadSceneSystem implements System {
    private sceneData: Scene | undefined;
    private assetsLoaded: boolean = false;
    private initialized: boolean = false;

    constructor(
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.SystemManager) private readonly systemManager: SystemManager,
        @inject("useSceneStore") private readonly useSceneStore: UseBoundStore<StoreApi<SceneState>>,
    ) {}

    onCreate(): void {
        this.timeManager.timeScale = 0;
    }

    onUpdate(): void {
        if (!this.sceneData) {
            this.sceneData = this.useSceneStore.getState().scene;
            if (!this.sceneData) return;
        }

        if (!this.initialized) {
            this.loadAssets();
            this.initialized = true;
        }

        if (this.initialized && !this.assetsLoaded) {
            this.assetsLoaded = this.assetManager.getAssetsLoaded();
        }

        if (this.assetsLoaded) {
            this.createEntities();
            this.systemManager.disableSystem(LoadSceneSystem);
        }
    }

    private loadAssets(): void {
        this.sceneData?.assets.forEach(({ name, url, type }) => {
            switch (type) {
                case AssetType.Image:
                    this.assetManager.loadImage(url, name);
                    break;
                case AssetType.Audio:
                    this.assetManager.loadAudio(url, name);
                    break;
                case AssetType.Video:
                    this.assetManager.loadVideo(url, name);
                    break;
                case AssetType.Font:
                    this.assetManager.loadFont(name, url);
                    break;
                case AssetType.Json:
                    this.assetManager.loadJson(url, name);
                    break;
            }
        });
    }

    private createEntities(): void {
        this.sceneData?.entities.forEach(({ id, name, components }) => {
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
                            case "TilemapRenderer":
                                return new TilemapRenderer({
                                    ...component.data,
                                    tileset: { ...(component.data?.tileset as Tileset) },
                                });
                            default:
                                return undefined;
                        }
                    })
                    .filter((component) => component !== undefined),
            ]);
        });
    }
}
