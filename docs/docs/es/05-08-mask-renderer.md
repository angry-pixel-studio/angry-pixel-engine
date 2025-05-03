## MaskRenderer

El componente `MaskRenderer` renderiza formas sólidas como rectángulos, círculos o polígonos.  
Admite diferentes tipos de formas con dimensiones configurables, colores, posicionamiento y rotación.  
Las formas pueden renderizarse con opacidad variable y asignarse a capas de renderizado específicas.  
Este componente es útil para crear elementos de interfaz de usuario (UI), efectos visuales o máscaras para otros contenidos renderizados.

### Propiedades

| Propiedad     | Tipo        | Descripción                                                        |
| ------------- | ----------- | ------------------------------------------------------------------ |
| `shape`       | `MaskShape` | Tipo de forma: `Rectangle`, `Circumference` o `Polygon`.           |
| `width`       | `number`    | Ancho de la máscara en píxeles (solo para rectángulo).             |
| `height`      | `number`    | Alto de la máscara en píxeles (solo para rectángulo).              |
| `radius`      | `number`    | Radio de la máscara en píxeles (solo para circunferencia).         |
| `vertexModel` | `Vector2[]` | Vértices del polígono (solo para polígono).                        |
| `color`       | `string`    | Color de la máscara.                                               |
| `offset`      | `Vector2`   | Desplazamiento en los ejes X e Y respecto al centro de la entidad. |
| `rotation`    | `number`    | Rotación de la máscara en radianes.                                |
| `opacity`     | `number`    | Opacidad de la máscara (valor entre 0 y 1).                        |
| `layer`       | `string`    | Capa de renderizado donde se dibujará la máscara.                  |

### Ejemplo con **rectángulo**

```typescript
const maskRenderer = new MaskRenderer({
    shape: MaskShape.Rectangle,
    width: 32,
    height: 32,
    color: "#000000",
    offset: new Vector2(0, 0),
    rotation: 0,
    opacity: 1,
    layer: "Default",
});
```

### Ejemplo con **circunferencia**

```typescript
const maskRenderer = new MaskRenderer({
    shape: MaskShape.Circumference,
    radius: 16,
    color: "#000000",
    offset: new Vector2(0, 0),
    opacity: 1,
    layer: "Default",
});
```

### Ejemplo con **polígono**

```typescript
const maskRenderer = new MaskRenderer({
    shape: MaskShape.Polygon,
    vertexModel: [new Vector2(0, 0), new Vector2(32, 0), new Vector2(32, 32), new Vector2(0, 32)],
    color: "#000000",
    offset: new Vector2(0, 0),
    opacity: 1,
    layer: "Default",
});
```

### Notas

-   Cada forma requiere diferentes propiedades:
    -   `Rectangle`: necesita `width` y `height`.
    -   `Circumference`: necesita `radius`.
    -   `Polygon`: necesita `vertexModel`.
-   La rotación (`rotation`) solo afecta a las formas rectángulo y polígono.
-   El valor de `opacity` permite crear máscaras semitransparentes si es menor a 1.
-   El sistema encargado de renderizar el componente aplicará las propiedades visuales y posicionamiento. El componente solo define los atributos de la máscara.
