import { Component, IAssetManager, TextOrientation, TextRenderer, Transform, Vector2 } from "angry-pixel-ecs";
import { ASSETS } from "../config/assets";
import { RENDER_LAYERS } from "../config/layers";

export const textFactory = (
    assetManager: IAssetManager,
    text: string = "",
    position: Vector2 = new Vector2(),
): Component[] => {
    const transform = new Transform();
    transform.position = position;

    const textRenderer = new TextRenderer();
    textRenderer.font = assetManager.getFont(ASSETS.fonts.main.name);
    textRenderer.text = text;
    textRenderer.color = "#FFFFFF";
    textRenderer.fontSize = 24;
    textRenderer.width = 1920;
    textRenderer.height = 32;
    textRenderer.layer = RENDER_LAYERS.UI;
    textRenderer.orientation = TextOrientation.RightCenter;

    return [transform, textRenderer];
};
