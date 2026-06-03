# Vector2

`Vector2` represents a two-dimensional vector with `x` and `y` components. It is used throughout the engine for positions, directions, velocities, and other 2D quantities.

```typescript
import { Vector2 } from "angry-pixel";

const position = new Vector2(100, 50);
const zero = new Vector2(); // (0, 0)
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | `number` | The x component. |
| `y` | `number` | The y component. |
| `magnitude` | `number` | The length of the vector. |
| `direction` | `Vector2` | The unit vector pointing in the same direction. |

## Instance methods

| Method | Description |
|--------|-------------|
| `set(x, y)` | Sets the x and y components. |
| `copy(vector)` | Copies the components from another vector. |
| `clone()` | Returns a new vector with the same components. |
| `equals(vector)` | Returns `true` if both vectors have the same components. |
| `distance(vector)` | Returns the distance to another vector. |

## Static methods

The static operations write their result into an output vector passed as the first argument and return it. Reusing an output vector avoids allocating a new one each frame.

| Method | Description |
|--------|-------------|
| `Vector2.add(out, a, b)` | Adds `a` and `b`. |
| `Vector2.subtract(out, a, b)` | Subtracts `b` from `a`. |
| `Vector2.scale(out, a, scalar)` | Scales `a` by a scalar. |
| `Vector2.unit(out, a)` | The unit (normalized) vector of `a`. |
| `Vector2.normal(out, a)` | The normal (perpendicular) vector of `a`. |
| `Vector2.round(out, a)` | Rounds the components of `a`. |
| `Vector2.floor(out, a)` | Floors the components of `a`. |
| `Vector2.ceil(out, a)` | Ceils the components of `a`. |
| `Vector2.dot(a, b)` | Returns the dot product of `a` and `b`. |
| `Vector2.cross(a, b)` | Returns the cross product of `a` and `b`. |

```typescript
const a = new Vector2(2, 1);
const b = new Vector2(3, 2);
const result = new Vector2();

Vector2.add(result, a, b);
// result.x === 5, result.y === 3
```
