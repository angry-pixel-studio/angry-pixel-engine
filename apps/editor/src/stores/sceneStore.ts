import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import {
    Scene,
    Entity,
    EntityComponent,
    EntityWithComponentsAndChildren,
    System,
    EntityWithParent,
    Asset,
    AssetType,
} from "../types/scene";
import { exampleScene } from "../data/example-scene";

// Enable MapSet support for Immer
enableMapSet();

export interface SceneState {
    // Scene data
    scene: Scene;

    // Internal Maps for better performance
    assetsMap: Map<string, Asset>;
    entitiesMap: Map<string, EntityWithParent>;
    componentsMap: Map<string, EntityComponent[]>;
    systemsMap: Map<string, System>;

    // what has been changed
    entityUpdated?: string;
    componentUpdated?: [string, string];

    // Scene actions
    updateEntity: (entityId: string, updates: Partial<Entity>) => void;
    updateComponent: (entityId: string, componentId: string, updates: Partial<EntityComponent>) => void;
    updateScene: (updates: Partial<Scene>) => void;

    // System actions
    addSystem: (system: System) => void;
    removeSystem: (systemId: string) => void;
    updateSystem: (systemId: string, updates: Partial<System>) => void;
    updateSystems: (systems: System[]) => void;

    // Utility functions
    getSceneJson: () => string;
    getEntityById: (id: string) => EntityWithParent | null;
    getComponentById: (entityId: string, componentId: string) => EntityComponent | null;
    getSystemById: (id: string) => System | null;
    getFontAssets: () => Asset[];

    // Helper to sync Maps with scene data
    syncMapsWithScene: () => void;
}

// Helper function to create Maps from scene data
const createMapsFromScene = (scene: Scene) => {
    const assetsMap = new Map<string, Asset>(); // asset id -> asset
    const entitiesMap = new Map<string, EntityWithParent>(); // entity id -> entity
    const componentsMap = new Map<string, EntityComponent[]>(); // entity -> array of components
    const systemsMap = new Map<string, System>(); // system id -> system

    const processEntity = (
        entity: EntityWithComponentsAndChildren,
        parent: string | null = null,
        level: number = 0,
    ) => {
        entitiesMap.set(entity.id, {
            id: entity.id,
            name: entity.name,
            enabled: entity.enabled,
            parent,
            level,
        });
        componentsMap.set(entity.id, entity.components);

        entity.children.forEach((child) =>
            processEntity(child as EntityWithComponentsAndChildren, entity.id, level + 1),
        );
    };

    scene.entities.forEach((entity) => processEntity(entity));
    scene.systems.forEach((system) => systemsMap.set(system.id, system));
    scene.assets.forEach((asset) => assetsMap.set(asset.id, asset));

    return { entitiesMap, componentsMap, systemsMap, assetsMap };
};

export const useSceneStore = create<SceneState>()(
    devtools(
        immer((set, get) => {
            const { entitiesMap, componentsMap, systemsMap, assetsMap } = createMapsFromScene(exampleScene);

            const entityUpdated: string | undefined = undefined;
            const componentUpdated: [string, string] | undefined = undefined;

            return {
                scene: exampleScene,
                entitiesMap,
                componentsMap,
                systemsMap,
                assetsMap,
                entityUpdated,
                componentUpdated,

                syncMapsWithScene: () => {
                    set((state) => {
                        const { entitiesMap, componentsMap, systemsMap } = createMapsFromScene(state.scene);
                        state.entitiesMap = entitiesMap;
                        state.componentsMap = componentsMap;
                        state.systemsMap = systemsMap;
                    });
                },

                updateEntity: (entityId, updates) => {
                    set((state) => {
                        const entity = state.entitiesMap.get(entityId);
                        if (entity) Object.assign(entity, updates);
                        state.entityUpdated = entityId;
                        state.componentUpdated = undefined;
                    });
                },

                updateComponent: (entityId, componentId, updates) => {
                    set((state) => {
                        const entityComponents = state.componentsMap.get(entityId);
                        if (entityComponents) {
                            const component = entityComponents.find((comp) => comp.id === componentId);
                            if (component) Object.assign(component, updates);

                            state.entityUpdated = undefined;
                            state.componentUpdated = [entityId, componentId];
                        }
                    });
                },

                updateScene: (updates) => {
                    set((state) => {
                        Object.assign(state.scene, updates);
                        get().syncMapsWithScene();
                    });
                },

                addSystem: (system) => {
                    set((state) => {
                        state.systemsMap.set(system.id, system);
                    });
                },

                removeSystem: (systemId) => {
                    set((state) => {
                        state.systemsMap.delete(systemId);
                    });
                },

                updateSystem: (systemId, updates) => {
                    set((state) => {
                        const mapSystem = state.systemsMap.get(systemId);
                        if (mapSystem) {
                            Object.assign(mapSystem, updates);
                        }
                    });
                },

                updateSystems: (systems) => {
                    set((state) => {
                        state.systemsMap = new Map(systems.map((system) => [system.id, system]));
                    });
                },

                // Utility functions
                getSceneJson: () => {
                    const state = get();
                    return JSON.stringify(state.scene, null, 2);
                },

                getEntityById: (id) => {
                    const state = get();
                    return state.entitiesMap.get(id) || null;
                },

                getComponentById: (entityId, componentId) => {
                    const entityComponents = get().componentsMap.get(entityId);
                    if (!entityComponents) return null;

                    return entityComponents.find((comp) => comp.id === componentId) || null;
                },

                getSystemById: (id) => {
                    const state = get();
                    return state.systemsMap.get(id) || null;
                },

                getFontAssets: () => {
                    const state = get();
                    return Array.from(state.assetsMap.values()).filter((asset) => asset.type === AssetType.Font);
                },
            };
        }),
        {
            name: "scene-store",
        },
    ),
);
