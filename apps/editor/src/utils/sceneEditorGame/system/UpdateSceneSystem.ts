import { EntityManager, inject, SYMBOLS, System } from "angry-pixel";
import { SceneState, SceneStateAction } from "../../../stores/sceneStore";
import { UseBoundStore, StoreApi } from "zustand";
import { EntityIdentifier } from "../component/EntityIdentifier";
import { getComponentType, mapComponentData } from "../utils/components";
import { BuiltInComponent } from "../../../types/component";

export class UpdateSceneSystem implements System {
    private unsubscribe: () => void = () => {};
    private stateHasChanged: boolean = false;
    private currentState?: SceneState;

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject("useSceneStore") private readonly useSceneStore: UseBoundStore<StoreApi<SceneState>>,
    ) {}

    onEnabled(): void {
        this.unsubscribe = this.useSceneStore.subscribe((state: SceneState) => {
            this.stateHasChanged = true;
            this.currentState = state;
        });
    }

    onUpdate(): void {
        if (this.stateHasChanged && this.currentState) {
            switch (this.currentState.action) {
                case SceneStateAction.ComponentCreated:
                    this.createComponent();
                    break;
                case SceneStateAction.ComponentUpdated:
                    this.updateComponent();
                    break;
            }
            this.stateHasChanged = false;
        }
    }

    private createComponent(): void {
        if (!this.currentState || !this.currentState.componentUpdated) return;

        const [entityId, componentId] = this.currentState.componentUpdated;
        const componentData = this.currentState.componentsMap.get(entityId)?.find((comp) => comp.id === componentId);

        if (componentData) {
            const { entity } = this.entityManager.search(EntityIdentifier, (comp) => comp.id === entityId)[0];
            const componentType = getComponentType(componentData.name as BuiltInComponent);
            if (componentType) {
                this.entityManager.addComponent(entity, new componentType(mapComponentData(componentData.data ?? {})));
            }
        }
    }

    private updateComponent(): void {
        if (!this.currentState || !this.currentState.componentUpdated) return;

        const [entityId, componentId] = this.currentState.componentUpdated;
        const componentData = this.currentState.componentsMap.get(entityId)?.find((comp) => comp.id === componentId);

        if (componentData) {
            const { entity } = this.entityManager.search(EntityIdentifier, (comp) => comp.id === entityId)[0];
            const componentType = getComponentType(componentData.name as BuiltInComponent);
            if (componentType) {
                if (componentData.enabled && !this.entityManager.isComponentEnabled(entity, componentType)) {
                    this.entityManager.enableComponent(entity, componentType);
                } else if (!componentData.enabled && this.entityManager.isComponentEnabled(entity, componentType)) {
                    this.entityManager.disableComponent(entity, componentType);
                }

                // TODO: find a better way to handle this
                /*if (componentData.name === BuiltInComponent.TilemapRenderer && componentData.data) {
                    componentData.data = {
                        ...componentData.data,
                        _processed: false,
                        chunks: [],
                    };
                }*/

                this.entityManager.updateComponentData(entity, componentType, (component) => {
                    Object.assign(component, mapComponentData(componentData.data ?? {}));
                });
            }
        }
    }

    onDisabled(): void {
        this.unsubscribe();
    }
}
