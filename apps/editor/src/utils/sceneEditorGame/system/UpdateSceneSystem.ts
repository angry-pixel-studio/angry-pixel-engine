import { AssetManager, EntityManager, inject, SYMBOLS, System, Transform } from "angry-pixel";
import { AppState } from "../../../stores";
import { UseBoundStore, StoreApi } from "zustand";
import { EntityIdentifier } from "../component/EntityIdentifier";
import { getComponentType } from "../utils/components";
import { BuiltInComponent } from "../../../types/component";

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
        });
    }

    onUpdate(): void {
        if (this.stateHasChanged && this.currentState) {
            if (this.currentState.componentUpdated) {
                const [entityId, componentId] = this.currentState.componentUpdated;
                const componentData = this.currentState.componentsMap
                    .get(entityId)
                    ?.find((comp) => comp.id === componentId);
                if (componentData) {
                    const { entity } = this.entityManager.search(EntityIdentifier, (comp) => comp.id === entityId)[0];
                    const componentType = getComponentType(componentData.name as BuiltInComponent);
                    if (componentType) {
                        this.entityManager.updateComponentData(entity, componentType, (component) => {
                            Object.assign(component, componentData.data);
                        });
                    }
                }
            }
            this.stateHasChanged = false;
        }
    }

    onDisabled(): void {
        this.unsubscribe();
    }
}
