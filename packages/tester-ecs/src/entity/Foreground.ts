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
} from "angry-pixel";
import { ASSETS } from "@config/assets";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";

export const foregroundArchetype: Archetype = {
    components: [
        new Transform(),
        new TiledWrapper({
            layerToRender: "Foreground",
            tilemap: require("@tilemap/tilemap.json"),
        }),
        new TilemapRenderer({
            tileset: {
                image: ASSETS.images.tileset,
                tileWidth: 16,
                tileHeight: 16,
                width: 12,
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
