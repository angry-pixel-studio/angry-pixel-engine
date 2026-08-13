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
    Component,
    TiledObjectBlueprint,
    LightRenderer,
    TextRenderer,
    TextAlignment,
} from "angry-pixel";
import { ASSETS } from "@config/assets";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { goblinArchetype } from "@entity/Goblin";

// entities created from the objects of the tilemap, matched by the class of the Tiled object
const tiledObjects = new Map<string, TiledObjectBlueprint>([
    // an archetype
    ["Goblin", goblinArchetype],
    // a collection of components (the Transform is added by the engine)
    [
        "Torch",
        [
            new LightRenderer({
                radius: 96,
                layer: RENDER_LAYERS.Darkness,
                smooth: true,
                intensity: 0.8,
            }),
        ],
    ],
    // a factory: the "goblin" property references another Tiled object, and is received as its entity
    [
        "Sign",
        (properties) => [
            new TextRenderer({
                font: ASSETS.fonts.main.name,
                text: `${properties.get("text")} - GOBLIN ENTITY ${properties.get("goblin")}`,
                color: "#FFFFFF",
                fontSize: 8,
                width: 192,
                height: 16,
                layer: RENDER_LAYERS.Overlayer,
                alignment: TextAlignment.Center,
            }),
        ],
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

export const slopePlatform: Component[] = [
    new Transform({ position: new Vector2(128, -112) }),
    new RigidBody({ type: RigidBodyType.Static }),
    new PolygonCollider({
        layer: COLLISION_LAYERS.Foreground,
        vertexModel: [new Vector2(0, 0), new Vector2(128, 64), new Vector2(128, 0)],
    }),
    new MaskRenderer({
        shape: MaskShape.Polygon,
        vertexModel: [new Vector2(0, 0), new Vector2(128, 64), new Vector2(128, 60), new Vector2(6, 0)],
        color: "#82aa28",
        layer: RENDER_LAYERS.Foreground,
    }),
];
