import {
    RigidBody,
    RigidBodyType,
    TiledWrapper,
    TilemapCollider,
    TilemapRenderer,
    Transform,
    Archetype,
    Vector2,
    PolygonCollider,
    MaskRenderer,
    MaskShape,
    TiledObjectBlueprint,
} from "angry-pixel";
import { ASSETS } from "@config/assets";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { goblinArchetype } from "@entity/Goblin";
import { ninjaArchetype } from "./Ninja";
import { movingPlatformArchetype } from "./MovingPlatform";
import { MovingPlatform } from "@component/MovingPlatform";

// entities created from the objects of the tilemap, matched by the class of the Tiled object
const tiledObjects = new Map<string, TiledObjectBlueprint>([
    ["Goblin", goblinArchetype],
    ["Ninja", ninjaArchetype],
    [
        "Slope",
        [
            new RigidBody({ type: RigidBodyType.Static }),
            new PolygonCollider({
                layer: COLLISION_LAYERS.Foreground,
                vertexModel: [new Vector2(0, 0), new Vector2(128, 64), new Vector2(128, 0)],
                offset: new Vector2(-64, -32),
            }),
            new MaskRenderer({
                shape: MaskShape.Polygon,
                vertexModel: [new Vector2(0, 0), new Vector2(128, 64), new Vector2(128, 60), new Vector2(6, 0)],
                color: "#82aa28",
                layer: RENDER_LAYERS.Foreground,
                offset: new Vector2(-64, -32),
            }),
        ],
    ],
    ["Spot", [new Transform()]],
    [
        "MovingPlatform",
        (props) => {
            const movingPlatform = movingPlatformArchetype.components.find((c) => c instanceof MovingPlatform);
            movingPlatform.spotEntities = props
                .keys()
                .filter((key) => key.startsWith("spot"))
                .map((key) => props.get(key) as number)
                .toArray();
            return movingPlatformArchetype;
        },
    ],
]);

export const foregroundArchetype: Archetype = {
    components: [
        new Transform(),
        new TiledWrapper({
            layerToRender: "Foreground",
            tilemap: ASSETS.tilemap.main,
            objects: tiledObjects,
        }),
        new TilemapRenderer({
            tileset: {
                image: ASSETS.images.tileset,
                tileWidth: 16,
                tileHeight: 16,
            },
            layer: RENDER_LAYERS.Foreground,
        }),
        new TilemapCollider({
            layer: COLLISION_LAYERS.Foreground,
            composite: true,
        }),
        new RigidBody({
            type: RigidBodyType.Static,
        }),
    ],
};
