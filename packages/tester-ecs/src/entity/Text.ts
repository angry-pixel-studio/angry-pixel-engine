import { TextOrientation, TextRenderer, Transform, Vector2, Archetype } from "angry-pixel";
import { ASSETS } from "@config/assets";
import { RENDER_LAYERS } from "@config/layers";

export const textArchetype: Archetype = {
    components: [
        new Transform({ position: new Vector2() }),
        new TextRenderer({
            font: ASSETS.fonts.main.name,
            text: "",
            color: "#FFFFFF",
            fontSize: 24,
            width: 1920,
            height: 32,
            layer: RENDER_LAYERS.UI,
            orientation: TextOrientation.RightCenter,
            shadow: {
                color: "#00FF00",
                offset: new Vector2(3, -3),
                opacity: 0.5,
            },
        }),
    ],
};
