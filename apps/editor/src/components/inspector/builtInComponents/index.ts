import { Component } from "../../../types/component";
import { camera } from "./Camera";
import { darknessRenderer } from "./DarknessRenderer";
import { lightRenderer } from "./LightRenderer";
import { maskRenderer } from "./MaskRenderer";
import { spriteRenderer } from "./SpriteRenderer";
import { textRenderer } from "./TextRenderer";
import { tilemapRenderer } from "./TilemapRenderer";
import { transform } from "./Transform";
import { typeTest } from "./TypeTest";
import { videoRenderer } from "./VideoRenderer";

export const builtInComponents: Component[] = [
    transform,
    camera,
    spriteRenderer,
    textRenderer,
    tilemapRenderer,
    videoRenderer,
    maskRenderer,
    lightRenderer,
    darknessRenderer,
    typeTest,
];
