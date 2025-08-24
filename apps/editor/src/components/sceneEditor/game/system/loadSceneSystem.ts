import { EntityIdentifier } from "../component/EntityIdentifier";
import { AssetType, Scene } from "../../../../types/scene";
import {
    AssetManager,
    Camera,
    Component,
    EntityManager,
    inject,
    SpriteRenderer,
    SYMBOLS,
    System,
    TimeManager,
    Transform,
} from "angry-pixel";
import { SceneState } from "../../../../stores/sceneStore";
import { StoreApi, UseBoundStore } from "zustand";

export class LoadSceneSystem implements System {
    private sceneData: Scene | undefined;
    private assetsLoaded: boolean = false;
    private initialized: boolean = false;
    private entitiesCreated: boolean = false;

    constructor(
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject("useSceneStore") private readonly useSceneStore: UseBoundStore<StoreApi<SceneState>>,
    ) {}

    onCreate(): void {
        this.timeManager.timeScale = 0;
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
            const entity: Component[] = components
                .map((component) => {
                    switch (component.name) {
                        case "Transform":
                            return new Transform(component.data);
                        case "Camera":
                            return new Camera(component.data);
                        case "SpriteRenderer":
                            return new SpriteRenderer(component.data);
                        default:
                            return undefined;
                    }
                })
                .filter((component) => component !== undefined);

            entity.push(new EntityIdentifier({ id, name }));
            console.log("entity", entity);
            this.entityManager.createEntity(entity);
        });
    }

    onUpdate(): void {
        this.sceneData = this.useSceneStore.getState().scene;
        if (!this.sceneData) return;

        if (!this.initialized) {
            this.loadAssets();
            this.initialized = true;
        }

        if (this.initialized && !this.assetsLoaded) {
            this.assetsLoaded = this.assetManager.getAssetsLoaded();
        }

        if (this.assetsLoaded && !this.entitiesCreated) {
            this.createEntities();
            this.entitiesCreated = true;
        }
    }
}
