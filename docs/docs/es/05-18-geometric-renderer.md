## GeometricRenderer

El componente `GeometricRenderer` dibuja formas 2D **solo contorno** (sin relleno): polígonos cerrados, segmentos de línea y contornos circulares.  
Utiliza la misma ruta WebGL que la geometría de depuración interna (`RenderDataType.Geometric`).

### Requisitos

-   La entidad debe tener un `Transform`.
-   La posición se obtiene de `Transform.localPosition` más `offset` (el offset se escala con la escala del transform y rota con la entidad cuando conviene—misma idea que `MaskRenderer`).
-   `Transform.localScale` escala los vértices de polígono/línea; en círculos, `radius` se multiplica por el mayor entre `|scale.x|` y `|scale.y|`.
-   La rotación final es `Transform.localRotation` más la `rotation` del componente.

### Propiedades

| Propiedad     | Tipo             | Descripción                                                                 |
| ------------- | ---------------- | --------------------------------------------------------------------------- |
| `shape`       | `GeometricShape` | `Polygon` (bucle cerrado), `Line` (`GL_LINES`, pares de vértices) o `Circumference`. |
| `color`       | `string`         | Color del trazo (hex, p. ej. `#RRGGBB`).                                  |
| `vertexModel` | `Vector2[]`      | Vértices en espacio local para `Polygon` / `Line`. No se usa en `Circumference`. |
| `radius`      | `number`         | Radio del círculo cuando `shape` es `Circumference`.                      |
| `offset`      | `Vector2`        | Desplazamiento respecto a la posición de la entidad en X e Y.             |
| `rotation`    | `number`         | Rotación extra en radianes (se suma a la del transform).                  |
| `layer`       | `string`         | Capa de renderizado; debe estar en la lista de capas de la `Camera`.      |

### Ejemplo: contorno de polígono

```typescript
const outline = new GeometricRenderer({
    shape: GeometricShape.Polygon,
    color: "#00FF88",
    layer: "Default",
    vertexModel: [
        new Vector2(-16, -16),
        new Vector2(16, -16),
        new Vector2(16, 16),
        new Vector2(-16, 16),
    ],
    offset: new Vector2(0, 0),
    rotation: 0,
});
```

### Ejemplo: segmentos de línea

`Line` usa pares de puntos por segmento (el número de vértices debe ser **par**).

```typescript
const segments = new GeometricRenderer({
    shape: GeometricShape.Line,
    color: "#FFFFFF",
    layer: "Default",
    vertexModel: [
        new Vector2(0, 0),
        new Vector2(100, 0), // un segmento
        new Vector2(0, 20),
        new Vector2(80, 40), // otro segmento
    ],
    offset: new Vector2(0, 0),
    rotation: 0,
});
```

### Ejemplo: contorno circular

```typescript
const ring = new GeometricRenderer({
    shape: GeometricShape.Circumference,
    color: "#FF6600",
    layer: "Default",
    radius: 32,
    offset: new Vector2(0, 0),
    rotation: 0,
});
```

### Notas

-   No se dibuja nada si la geometría no es válida:
    -   `Circumference`: `radius` debe ser positivo.
    -   `Polygon`: al menos tres vértices.
    -   `Line`: al menos dos vértices y cantidad **par**.
-   Los contornos circulares en la implementación WebGL actual no cambian visualmente con la rotación en Z (círculo simétrico); polígonos y líneas sí usan `rotation` como se espera.
-   Importa `GeometricShape` desde el paquete del motor (reexportado desde `@angry-pixel/webgl`) junto con `GeometricRenderer`.
