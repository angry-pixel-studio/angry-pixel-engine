import { Archetype, Entity, EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { degreesToRadians, Vector2 } from "@angry-pixel/math";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { TiledObject, TiledObjectProperties, TiledTilemap, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { forEachTiledLayer } from "@utils/tiled";

/** The size of the tilemap as it is rendered, used to translate the coordinates of the Tiled objects */
type TilemapBounds = {
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
};

/** A Tiled object with the offset of the layer that contains it */
type LayerObject = {
    object: TiledObject;
    offsetX: number;
    offsetY: number;
};

@injectable(SYSTEM_SYMBOLS.TiledObjectSystem)
export class TiledObjectSystem implements System {
    constructor(@inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper, (tiledWrapper, entity) => {
            if (tiledWrapper._objectsCreated || !(tiledWrapper.objects?.size > 0)) return;
            // the tilemap is resolved by the TiledWrapperSystem, which runs first
            if (typeof tiledWrapper.tilemap === "string") return;

            this.createObjects(tiledWrapper, tiledWrapper.tilemap, entity);
            tiledWrapper._objectsCreated = true;
        });
    }

    private createObjects(tiledWrapper: TiledWrapper, tilemap: TiledTilemap, entity: Entity): void {
        const objects = this.collectObjects(tiledWrapper, tilemap);

        // the entities are created before building the components, so the object properties
        // that reference other Tiled objects can be resolved to their entities
        const entitiesByObjectId = new Map<number, Entity>(
            objects.map(({ object }) => [object.id, this.entityManager.createEntity()]),
        );

        const transform = this.entityManager.getComponent(entity, Transform);
        const position = transform ? transform.position : new Vector2();
        const bounds = this.getBounds(tilemap, entity);

        objects.forEach((layerObject) => {
            const { object } = layerObject;
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

            setObjectTransform(objectTransform, tilemap, layerObject, position, tiledWrapper._origin, bounds);
        });
    }

    /**
     * The tilemap is rendered with the size resolved by the TilemapPreProcessingSystem, which does not\
     * match the size declared by Tiled in infinite tilemaps, and with the tile size of its tileset,\
     * which does not need to match the tile size of the tilemap.
     */
    private getBounds(tilemap: TiledTilemap, entity: Entity): TilemapBounds {
        const { width, height, tileWidth, tileHeight, _processed } =
            this.entityManager.getComponent(entity, TilemapRenderer) ?? ({} as TilemapRenderer);

        return _processed && width > 0 && height > 0
            ? { width, height, tileWidth, tileHeight }
            : {
                  width: tilemap.width,
                  height: tilemap.height,
                  tileWidth: tilemap.tilewidth,
                  tileHeight: tilemap.tileheight,
              };
    }

    private collectObjects(tiledWrapper: TiledWrapper, tilemap: TiledTilemap): LayerObject[] {
        const objects: LayerObject[] = [];

        forEachTiledLayer(tilemap.layers, (layer, offsetX, offsetY, visible) => {
            if (layer.type !== "objectgroup" || !visible) return;

            layer.objects.forEach((object) => {
                if (object.visible !== false && tiledWrapper.objects.has(objectClass(object))) {
                    objects.push({ object, offsetX, offsetY });
                }
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

const setObjectTransform = (
    transform: Transform,
    tilemap: TiledTilemap,
    { object, offsetX, offsetY }: LayerObject,
    position: Vector2,
    tileOrigin: Vector2,
    { width, height, tileWidth, tileHeight }: TilemapBounds,
): void => {
    // tile objects have their origin at the bottom-left corner, the rest at the top-left corner
    const centerX = object.width / 2;
    const centerY = object.gid !== undefined ? -object.height / 2 : object.height / 2;

    // the object rotates around its origin, so the position of its center rotates with it
    const rotation = degreesToRadians(object.rotation ?? 0);
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    // the coordinates of the object are in the pixel space of the tilemap, relative to the origin
    // of the rendered layer, and the tilemap is rendered centered on the entity that contains it
    const tileX = (object.x + offsetX + centerX * cos - centerY * sin) / tilemap.tilewidth - tileOrigin.x;
    const tileY = (object.y + offsetY + centerX * sin + centerY * cos) / tilemap.tileheight - tileOrigin.y;

    transform.position.set(
        position.x + (tileX - width / 2) * tileWidth,
        position.y + (height / 2 - tileY) * tileHeight,
    );

    // Tiled rotates clockwise, and the y axis of the engine points upwards.
    // A rotation of zero is left untouched, so the blueprint can define its own.
    if (rotation !== 0) transform.rotation = -rotation;
};
