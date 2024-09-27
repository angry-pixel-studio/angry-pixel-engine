import { Component, AssetManager, TextOrientation, TextRenderer, Transform, Vector2 } from "angry-pixel-engine";
import { ASSETS } from "@config/assets";
import { RENDER_LAYERS } from "@config/layers";

export const textArchetype = (
    assetManager: AssetManager,
    text: string = "",
    position: Vector2 = new Vector2(),
): Component[] => [
    new Transform({ position }),
    new TextRenderer({
        font: assetManager.getFont(ASSETS.fonts.main.name),
        text: text,
        color: "#FFFFFF",
        fontSize: 24,
        width: 1920,
        height: 32,
        layer: RENDER_LAYERS.UI,
        orientation: TextOrientation.RightCenter,
    }),
];
