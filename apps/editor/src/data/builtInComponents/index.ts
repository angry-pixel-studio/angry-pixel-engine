import { Component } from "../../types/component";
import { camera } from "./Camera";
import { spriteRenderer } from "./SpriteRenderer";
import { tilemapRenderer } from "./TilemapRenderer";
import { transform } from "./Transform";
import { typeTest } from "./TypeTest";

export const builtInComponents: Component[] = [transform, camera, spriteRenderer, tilemapRenderer, typeTest];
