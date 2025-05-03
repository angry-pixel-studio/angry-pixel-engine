## Rectangle

La clase `Rectangle` representa un rectángulo alineado a los ejes (AABR) definido por su posición, ancho y alto.  
La posición representa la esquina inferior izquierda del rectángulo.  
Proporciona métodos y propiedades para manipular y consultar la geometría del rectángulo.

### Propiedades

| Propiedad  | Tipo      | Descripción                                     |
| ---------- | --------- | ----------------------------------------------- |
| `x`        | `number`  | Coordenada X de la esquina inferior izquierda.  |
| `y`        | `number`  | Coordenada Y de la esquina inferior izquierda.  |
| `x1`       | `number`  | Coordenada X del borde derecho (x + width).     |
| `y1`       | `number`  | Coordenada Y del borde superior (y + height).   |
| `width`    | `number`  | Ancho del rectángulo.                           |
| `height`   | `number`  | Alto del rectángulo.                            |
| `position` | `Vector2` | Vector que representa la posición (x, y).       |
| `center`   | `Vector2` | Vector que representa el centro del rectángulo. |

### Métodos de instancia

| Método                     | Retorno   | Descripción                                          |
| -------------------------- | --------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `set(x, y, width, height)` | `void`    | Asigna posición y dimensiones al rectángulo.         |
| `equals(rectangle)`        | `boolean` | Compara si dos rectángulos son iguales.              |
| `copy(rect)`               | `void`    | Copia las propiedades de otro rectángulo.            |
| `intersects(rect)`         | `boolean` | Comprueba si este rectángulo se solapa con otro.     |
| `contains(rect             | vector)`  | `boolean`                                            | Comprueba si contiene completamente otro rectángulo o un punto (`Vector2`). |
| `toString()`               | `string`  | Devuelve una representación en texto del rectángulo. |

### Ejemplo básico

```typescript
const rect = new Rectangle(0, 0, 100, 100);

console.log(rect.width); // 100
console.log(rect.height); // 100
console.log(rect.x); // 0
console.log(rect.y); // 0
console.log(rect.x1); // 100
console.log(rect.y1); // 100

console.log(rect.center); // Vector2 { x: 50, y: 50 }
```

### Ejemplo: intersección y contención

```typescript
const rect1 = new Rectangle(0, 0, 100, 100);
const rect2 = new Rectangle(50, 50, 100, 100);

console.log(rect1.intersects(rect2)); // true

const point = new Vector2(50, 50);
console.log(rect1.contains(point)); // true

const rect3 = new Rectangle(100, 100, 100, 100);
console.log(rect1.contains(rect3)); // false
```

### Notas

-   La posición (`x`, `y`) siempre representa la esquina inferior izquierda.
-   Los métodos `intersects` y `contains` son fundamentales para detección de colisiones en sistemas físicos y de renderizado.
-   La propiedad `center` se calcula dinámicamente en cada acceso y no genera nuevas instancias gracias al uso de una referencia privada interna.
