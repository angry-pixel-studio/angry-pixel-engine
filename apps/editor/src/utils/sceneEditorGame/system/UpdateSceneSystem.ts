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
                case SceneStateAction.EntityDeleted:
                    this.deleteEntity();
                    break;
                case SceneStateAction.EntityCreated:
                    this.createEntity();
                    break;
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

    private deleteEntity(): void {
        if (!this.currentState || !this.currentState.entityUpdated) return;
        const entityId = this.currentState.entityUpdated;
        const { entity } = this.entityManager.search(EntityIdentifier, (comp) => comp.id === entityId)[0];
        this.entityManager.removeEntity(entity);
    }

    private createEntity(): void {
        if (!this.currentState || !this.currentState.entityUpdated) return;
        const entityId = this.currentState.entityUpdated;
        const name = this.currentState.entitiesMap.get(entityId)?.name;
        const parentId = this.currentState.entitiesMap.get(entityId)?.parent;

        const components = this.currentState.componentsMap
            .get(entityId)
            ?.map((componentData) => {
                const componentType = getComponentType(componentData.name as BuiltInComponent);
                if (componentType) {
                    return new componentType(mapComponentData(componentData.data ?? {}));
                }
                return undefined;
            })
            .filter((component) => component !== undefined);

        const entity = this.entityManager.createEntity([
            new EntityIdentifier({ id: entityId, name }),
            ...(components ?? []),
        ]);

        if (parentId) {
            const parentEntity = this.entityManager.search(EntityIdentifier, (comp) => comp.id === parentId)[0]?.entity;
            if (parentEntity) this.entityManager.setParent(entity, parentEntity);
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
