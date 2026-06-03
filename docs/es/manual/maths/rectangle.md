# Rectangle

`Rectangle` representa un rectángulo alineado con los ejes, definido por una posición (`x`, `y`) y un tamaño (`width`, `height`). Se usa para cajas delimitadoras y comprobaciones de área.

```typescript
import { Rectangle } from "angry-pixel";

const rect = new Rectangle(0, 0, 32, 32);
```

## Propiedades

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `x` | `number` | La coordenada x. |
| `y` | `number` | La coordenada y. |
| `width` | `number` | El ancho. |
| `height` | `number` | El alto. |
| `position` | `Vector2` | La posición como vector. |
| `center` | `Vector2` | El punto central (solo lectura). |

## Métodos

| Método | Descripción |
|--------|-------------|
| `set(x, y, width, height)` | Establece los cuatro valores a la vez. |
| `copy(rectangle)` | Copia los valores de otro rectángulo. |
| `equals(rectangle)` | Devuelve `true` si ambos rectángulos tienen los mismos valores. |
| `intersects(rectangle)` | Devuelve `true` si este rectángulo se solapa con otro. |
| `contains(rectangle)` | Devuelve `true` si este rectángulo contiene por completo a otro rectángulo. |
| `contains(vector)` | Devuelve `true` si este rectángulo contiene un punto. |

```typescript
const area = new Rectangle(0, 0, 100, 100);
const point = new Vector2(50, 50);

area.contains(point); // true
```
