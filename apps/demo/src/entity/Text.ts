import { TextRenderer, Transform, Vector2, Archetype, TextAlignment } from "angry-pixel";
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
            width: 1880,
            height: 32,
            layer: RENDER_LAYERS.UI,
            shadow: {
                color: "#00FF00",
                offset: new Vector2(3, -3),
                opacity: 0.5,
            },
            alignment: TextAlignment.Left,
        }),
    ],
};
