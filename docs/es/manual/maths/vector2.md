# Vector2

`Vector2` representa un vector bidimensional con componentes `x` e `y`. Se usa en todo el motor para posiciones, direcciones, velocidades y otras magnitudes 2D.

```typescript
import { Vector2 } from "angry-pixel";

const position = new Vector2(100, 50);
const zero = new Vector2(); // (0, 0)
```

## Propiedades

| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `x` | `number` | La componente x. |
| `y` | `number` | La componente y. |
| `magnitude` | `number` | La longitud del vector. |
| `direction` | `Vector2` | El vector unitario que apunta en la misma dirección. |

## Métodos de instancia

| Método | Descripción |
|--------|-------------|
| `set(x, y)` | Establece las componentes x e y. |
| `copy(vector)` | Copia las componentes de otro vector. |
| `clone()` | Devuelve un nuevo vector con las mismas componentes. |
| `equals(vector)` | Devuelve `true` si ambos vectores tienen las mismas componentes. |
| `distance(vector)` | Devuelve la distancia a otro vector. |

## Métodos estáticos

Las operaciones estáticas escriben su resultado en un vector de salida pasado como primer argumento y lo devuelven. Reutilizar un vector de salida evita reservar uno nuevo en cada frame.

| Método | Descripción |
|--------|-------------|
| `Vector2.add(out, a, b)` | Suma `a` y `b`. |
| `Vector2.subtract(out, a, b)` | Resta `b` de `a`. |
| `Vector2.scale(out, a, scalar)` | Escala `a` por un escalar. |
| `Vector2.unit(out, a)` | El vector unitario (normalizado) de `a`. |
| `Vector2.normal(out, a)` | El vector normal (perpendicular) de `a`. |
| `Vector2.round(out, a)` | Redondea las componentes de `a`. |
| `Vector2.floor(out, a)` | Aplica el suelo (floor) a las componentes de `a`. |
| `Vector2.ceil(out, a)` | Aplica el techo (ceil) a las componentes de `a`. |
| `Vector2.dot(a, b)` | Devuelve el producto escalar de `a` y `b`. |
| `Vector2.cross(a, b)` | Devuelve el producto vectorial de `a` y `b`. |

```typescript
const a = new Vector2(2, 1);
const b = new Vector2(3, 2);
const result = new Vector2();

Vector2.add(result, a, b);
// result.x === 5, result.y === 3
```
