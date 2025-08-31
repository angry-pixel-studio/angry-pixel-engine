import { AssetManager, EntityManager, inject, SYMBOLS, System, Transform } from "angry-pixel";
import { AppState } from "../../../stores";
import { UseBoundStore, StoreApi } from "zustand";
import { EntityIdentifier } from "../component/EntityIdentifier";

export class UpdateSceneSystem implements System {
    private unsubscribe: () => void = () => {};
    private stateHasChanged: boolean = false;
    private currentState: AppState | undefined;
    private prevState: AppState | undefined;

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
        @inject("useAppStore") private readonly useAppStore: UseBoundStore<StoreApi<AppState>>,
    ) {}

    onEnabled(): void {
        this.unsubscribe = this.useAppStore.subscribe((state: AppState, prevState: AppState) => {
            this.stateHasChanged = true;
            this.currentState = state;
            this.prevState = prevState;
        });
    }

    onUpdate(): void {
        if (this.stateHasChanged && this.currentState) {
            console.log("stateHasChanged", this.currentState.entityUpdated, this.currentState.componentUpdated);
            if (this.currentState.componentUpdated) {
                const [entityId, componentId] = this.currentState.componentUpdated;
                const componentData = this.currentState.componentsMap
                    .get(entityId)
                    ?.find((comp) => comp.id === componentId);
                if (componentData) {
                    const entity = this.entityManager.search(EntityIdentifier, (comp) => comp.id === entityId)[0]
                        .entity;

                    // TODO: pick the propper component type based on the componentData.name
                    this.entityManager.updateComponentData(entity, Transform, (component) => {
                        Object.assign(component, componentData.data);
                    });
                }
            }
            this.stateHasChanged = false;
        }
    }

    onDisabled(): void {
        this.unsubscribe();
    }
}
