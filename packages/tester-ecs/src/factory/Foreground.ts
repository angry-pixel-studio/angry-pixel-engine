import {
    Component,
    IAssetManager,
    RigidBody,
    RigidBodyType,
    TiledWrapper,
    TilemapCollider,
    TilemapRenderer,
    Transform,
} from "angry-pixel-ecs";
import { ASSETS } from "../config/assets";
import { COLLISION_LAYERS, RENDER_LAYERS } from "../config/layers";

export const foregroundFactory = (assetManager: IAssetManager): Component[] => {
    const tiledWrapper = new TiledWrapper();
    tiledWrapper.layerToRender = "Foreground";
    tiledWrapper.tilemap = require("../tilemap/tilemap.json");

    const tilemapRenderer = new TilemapRenderer();
    tilemapRenderer.tileset = {
        image: assetManager.getImage(ASSETS.images.tileset),
        tileWidth: 16,
        tileHeight: 16,
        width: 12,
    };
    tilemapRenderer.layer = RENDER_LAYERS.Foreground;

    const tilemapCollider = new TilemapCollider();
    tilemapCollider.layer = COLLISION_LAYERS.Foreground;
    tilemapCollider.composite = true;

    const rigidBody = new RigidBody();
    rigidBody.type = RigidBodyType.Static;

    return [new Transform(), tiledWrapper, tilemapRenderer, tilemapCollider, rigidBody];
};
