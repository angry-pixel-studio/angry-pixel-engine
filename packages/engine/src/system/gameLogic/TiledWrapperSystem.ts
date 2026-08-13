import { Archetype, Entity, EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { Vector2 } from "@angry-pixel/math";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import {
    TiledLayer,
    TiledObject,
    TiledObjectLayer,
    TiledObjectProperties,
    TiledTilemap,
    TiledWrapper,
} from "@component/gameLogic/TiledWrapper";
import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { AssetManager } from "@manager/AssetManager";

@injectable(SYSTEM_SYMBOLS.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper, (tiledWrapper, entity) => {
            const tilemap = this.resolveTilemap(tiledWrapper);

            this.renderLayer(tiledWrapper, tilemap, entity);

            if (!tiledWrapper._objectsCreated && tiledWrapper.objects?.size > 0) {
                this.createObjects(tiledWrapper, tilemap, entity);
                tiledWrapper._objectsCreated = true;
            }
        });
    }

    private resolveTilemap(tiledWrapper: TiledWrapper): TiledTilemap {
        if (typeof tiledWrapper.tilemap === "string") {
            const tilemap = this.assetManager.getJson<TiledTilemap>(tiledWrapper.tilemap);
            if (!tilemap) throw new Error(`Tilemap ${tiledWrapper.tilemap} not found`);

            tiledWrapper.tilemap = tilemap;
        }

        return tiledWrapper.tilemap;
    }

    private renderLayer(tiledWrapper: TiledWrapper, tilemap: TiledTilemap, entity: Entity): void {
        const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);
        if (!tilemapRenderer) return;

        const layer = tilemap.layers.find(
            (l) => l.name === tiledWrapper.layerToRender && l.type === "tilelayer",
        ) as TiledLayer;

        if (!layer) return;

        if (tilemap.infinite) tilemapRenderer.chunks = layer.chunks;
        else tilemapRenderer.data = layer.data;

        tilemapRenderer.width = tilemap.width;
    }

    private createObjects(tiledWrapper: TiledWrapper, tilemap: TiledTilemap, entity: Entity): void {
        const objects = this.collectObjects(tiledWrapper, tilemap);

        // the entities are created before building the components, so the object properties
        // that reference other Tiled objects can be resolved to their entities
        const entitiesByObjectId = new Map<number, Entity>(
            objects.map((object) => [object.id, this.entityManager.createEntity()]),
        );

        const transform = this.entityManager.getComponent(entity, Transform);
        const origin = transform ? transform.position : new Vector2();

        objects.forEach((object) => {
            const blueprint = tiledWrapper.objects.get(objectClass(object));
            const objectEntity = entitiesByObjectId.get(object.id);

            const result =
                typeof blueprint === "function"
                    ? blueprint(this.mapProperties(object, entitiesByObjectId), object)
                    : blueprint;

            if (!result) {
                throw new Error(`The blueprint for the Tiled object class ${objectClass(object)} returned nothing`);
            }

            const archetype: Archetype = Array.isArray(result) ? { components: result } : result;
            this.entityManager.addArchetype(objectEntity, archetype);

            const objectTransform =
                this.entityManager.getComponent(objectEntity, Transform) ??
                this.entityManager.addComponent<Transform>(objectEntity, Transform);

            setObjectPosition(objectTransform, tilemap, object, origin);
        });
    }

    private collectObjects(tiledWrapper: TiledWrapper, tilemap: TiledTilemap): TiledObject[] {
        const objects: TiledObject[] = [];

        tilemap.layers.forEach((layer) => {
            if (layer.type !== "objectgroup" || (layer as TiledObjectLayer).visible === false) return;

            (layer as TiledObjectLayer).objects.forEach((object) => {
                if (object.visible !== false && tiledWrapper.objects.has(objectClass(object))) objects.push(object);
            });
        });

        return objects;
    }

    private mapProperties(object: TiledObject, entitiesByObjectId: Map<number, Entity>): TiledObjectProperties {
        const properties: TiledObjectProperties = new Map();

        if (object.properties) {
            object.properties.forEach(({ name, type, value }) =>
                properties.set(name, type === "object" ? entitiesByObjectId.get(value as number) : value),
            );
        }

        return properties;
    }
}

const objectClass = (object: TiledObject): string => object.class ?? object.type;

/**
 * Translates the Tiled coordinates of an object (top-left origin, y-axis pointing down)\
 * into the position of its center within the simulated world, relative to the center of the tilemap.
 */
const setObjectPosition = (transform: Transform, tilemap: TiledTilemap, object: TiledObject, origin: Vector2): void => {
    // tile objects have their origin at the bottom-left corner, the rest at the top-left corner
    const centerY = object.gid !== undefined ? object.y - object.height / 2 : object.y + object.height / 2;

    transform.position.set(
        origin.x + object.x + object.width / 2 - (tilemap.width * tilemap.tilewidth) / 2,
        origin.y + (tilemap.height * tilemap.tileheight) / 2 - centerY,
    );
};
