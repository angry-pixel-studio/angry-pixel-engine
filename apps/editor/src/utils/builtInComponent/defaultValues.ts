import {
    MaskRendererOptions,
    MaskShape,
    TextAlignment,
    TextRendererOptions,
    TransformOptions,
    defaultRenderLayer,
} from "angry-pixel";
import { BuiltInComponent } from "../../types/component";

export interface Vector2DefaultValues {
    x: number;
    y: number;
}

export interface MaskRendererDefaultValues extends Omit<MaskRendererOptions, "offset" | "vertexModel"> {
    offset: Vector2DefaultValues;
    vertexModel: Vector2DefaultValues[];
}

export interface TextRendererDefaultValues extends Omit<Partial<TextRendererOptions>, "offset"> {
    offset: Vector2DefaultValues;
}

export interface TransformDefaultValues extends Omit<Partial<TransformOptions>, "position" | "scale"> {
    position: Vector2DefaultValues;
    scale: Vector2DefaultValues;
}

const transformDefaultValues: TransformDefaultValues = {
    position: { x: 0, y: 0 },
    rotation: 0,
    scale: { x: 1, y: 1 },
};

const maskRendererDefaultValues: MaskRendererDefaultValues = {
    shape: MaskShape.Rectangle,
    width: 32,
    height: 32,
    layer: defaultRenderLayer,
    color: "#000000",
    radius: 16,
    vertexModel: [
        { x: -16, y: -16 },
        { x: 0, y: 16 },
        { x: 16, y: -16 },
        { x: -16, y: -16 },
    ],
    offset: { x: 0, y: 0 },
    rotation: 0,
    opacity: 1,
};

const textRendererDefaultValues: TextRendererDefaultValues = {
    layer: defaultRenderLayer,
    font: "Arial",
    text: "Hello World!",
    fontSize: 16,
    color: "#000000",
    width: 192,
    height: 32,
    alignment: TextAlignment.Center,
    opacity: 1,
    offset: { x: 0, y: 0 },
    rotation: 0,
    smooth: true,
    textureAtlas: {},
    flipHorizontally: false,
    flipVertically: false,
    letterSpacing: 0,
    lineHeight: undefined,
    shadow: undefined,
};

export const defaultValues: Record<BuiltInComponent, unknown> = {
    [BuiltInComponent.MaskRenderer]: maskRendererDefaultValues,
    [BuiltInComponent.Transform]: transformDefaultValues,
    [BuiltInComponent.Camera]: undefined,
    [BuiltInComponent.SpriteRenderer]: undefined,
    [BuiltInComponent.TextRenderer]: textRendererDefaultValues,
    [BuiltInComponent.VideoRenderer]: undefined,
    [BuiltInComponent.Button]: undefined,
    [BuiltInComponent.TiledWrapper]: undefined,
    [BuiltInComponent.BoxCollider]: undefined,
    [BuiltInComponent.BallCollider]: undefined,
    [BuiltInComponent.PolygonCollider]: undefined,
    [BuiltInComponent.EdgeCollider]: undefined,
    [BuiltInComponent.TilemapCollider]: undefined,
    [BuiltInComponent.DarknessRenderer]: undefined,
    [BuiltInComponent.LightRenderer]: undefined,
    [BuiltInComponent.TilemapRenderer]: undefined,
};
