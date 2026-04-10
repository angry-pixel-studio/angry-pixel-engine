import { Vector2 } from "@angry-pixel/math";
import { defaultRenderLayer } from "./Camera";
import { GeometricRenderData, GeometricShape, RenderDataType } from "@angry-pixel/webgl";

/**
 * GeometricRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const outline = new GeometricRenderer({
 *   shape: GeometricShape.Polygon,
 *   color: "#00FF88",
 *   layer: "Default",
 *   vertexModel: [
 *     new Vector2(-16, -16),
 *     new Vector2(16, -16),
 *     new Vector2(16, 16),
 *     new Vector2(-16, 16),
 *   ],
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 * });
 * ```
 * @example
 * ```js
 * const segments = new GeometricRenderer({
 *   shape: GeometricShape.Line,
 *   color: "#FFFFFF",
 *   layer: "Default",
 *   vertexModel: [new Vector2(0, 0), new Vector2(100, 0)],
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 * });
 * ```
 * @example
 * ```js
 * const ring = new GeometricRenderer({
 *   shape: GeometricShape.Circumference,
 *   color: "#FF6600",
 *   layer: "Default",
 *   radius: 32,
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 * });
 * ```
 */
export interface GeometricRendererOptions {
    /** Outline type: closed polygon, line segments, or circle */
    shape: GeometricShape;
    /** Stroke color as a hex string (e.g. `#RRGGBB`) */
    color: string;
    /** Render layer name; must match a layer seen by the {@link Camera} */
    layer: string;
    /**
     * Vertices in local space relative to the entity.\
     * For {@link GeometricShape.Polygon}, at least three points; drawn as a closed `LINE_LOOP`.\
     * For {@link GeometricShape.Line}, an even number of points (pairs) for `GL_LINES`.\
     * Ignored when `shape` is {@link GeometricShape.Circumference}.
     */
    vertexModel: Vector2[];
    /** Radius in pixels when `shape` is {@link GeometricShape.Circumference} */
    radius: number;
    /** Offset from the entity position, scaled by the entity `Transform`'s scale like other renderers */
    offset: Vector2;
    /** Extra rotation in radians, added to the entity `Transform`'s rotation */
    rotation: number;
}

/**
 * The GeometricRenderer component draws hollow (stroke-only) 2D geometry: polygon outlines,\
 * polylines, and circle outlines. It feeds the same path as debug collider drawing (`RenderDataType.Geometric`).\
 *\
 * The entity must have a {@link Transform}. World position is `Transform.localPosition` plus `offset` (with the\
 * same rotated-offset behavior as {@link MaskRenderer}). `Transform.localScale` scales `vertexModel` and,\
 * for circles, scales `radius` by the larger of `|scale.x|` and `|scale.y|`.\
 *\
 * Nothing is drawn if geometry is invalid: circumference requires `radius > 0`; polygon requires at least three\
 * vertices; line mode requires at least two vertices and an even count.
 * @public
 * @category Components
 * @example
 * ```js
 * const outline = new GeometricRenderer({
 *   shape: GeometricShape.Polygon,
 *   color: "#00FF88",
 *   layer: "Default",
 *   vertexModel: [
 *     new Vector2(-16, -16),
 *     new Vector2(16, -16),
 *     new Vector2(16, 16),
 *     new Vector2(-16, 16),
 *   ],
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 * });
 * ```
 * @example
 * ```js
 * const segments = new GeometricRenderer({
 *   shape: GeometricShape.Line,
 *   color: "#FFFFFF",
 *   layer: "Default",
 *   vertexModel: [new Vector2(0, 0), new Vector2(100, 0)],
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 * });
 * ```
 * @example
 * ```js
 * const ring = new GeometricRenderer({
 *   shape: GeometricShape.Circumference,
 *   color: "#FF6600",
 *   layer: "Default",
 *   radius: 32,
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 * });
 * ```
 */
export class GeometricRenderer {
    /** Outline type: {@link GeometricShape.Polygon}, {@link GeometricShape.Line}, or {@link GeometricShape.Circumference} */
    shape: GeometricShape = GeometricShape.Polygon;
    /** Stroke color (hex) */
    color: string = "#FFFFFF";
    /** Render layer */
    layer: string = defaultRenderLayer;
    /** Local-space vertices for polygon or line mode */
    vertexModel: Vector2[] = [];
    /** Radius in pixels for {@link GeometricShape.Circumference} */
    radius: number = 0;
    /** X/Y offset from the entity position */
    offset: Vector2 = new Vector2();
    /** Additional rotation in radians (added to the Transform) */
    rotation: number = 0;

    /** @internal */
    _renderData: GeometricRenderData = {
        type: RenderDataType.Geometric,
        position: new Vector2(),
        layer: defaultRenderLayer,
        color: "#FFFFFF",
        shape: GeometricShape.Polygon,
        vertexModel: [],
        rotation: 0,
        radius: 0,
    };

    /** @internal */
    static componentName: string = "GeometricRenderer";

    constructor(options?: Partial<GeometricRendererOptions>) {
        Object.assign(this, options);
    }
}
