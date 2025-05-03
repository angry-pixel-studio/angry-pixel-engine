## Vector2

The `Vector2` class represents a two-dimensional vector with `x` and `y` components.  
It provides static methods for common vector operations like addition, subtraction, scaling, dot product, cross product, normalization, and more.  
It is used throughout the engine to store 2D positions, directions, velocities, and other vector quantities.

### Properties

| Property    | Type      | Description                           |
| ----------- | --------- | ------------------------------------- |
| `x`         | `number`  | X component of the vector.            |
| `y`         | `number`  | Y component of the vector.            |
| `magnitude` | `number`  | The magnitude (length) of the vector. |
| `direction` | `Vector2` | Unit direction vector.                |

### Instance methods

| Method             | Returns   | Description                                  |
| ------------------ | --------- | -------------------------------------------- |
| `set(x, y)`        | `void`    | Sets the vector’s `x` and `y` values.        |
| `copy(vector)`     | `void`    | Copies the values from another vector.       |
| `equals(vector)`   | `boolean` | Compares if two vectors are equal.           |
| `clone()`          | `Vector2` | Returns a copy of the vector.                |
| `distance(vector)` | `number`  | Calculates the distance to another vector.   |
| `toString()`       | `string`  | Returns a text representation of the vector. |

### Static methods

| Method                  | Returns   | Description                                                               |
| ----------------------- | --------- | ------------------------------------------------------------------------- |
| `add(out, a, b)`        | `Vector2` | Adds vectors `a` and `b` and stores the result in `out`.                  |
| `subtract(out, a, b)`   | `Vector2` | Subtracts vector `b` from `a` and stores the result in `out`.             |
| `unit(out, a)`          | `Vector2` | Calculates the unit vector of `a`.                                        |
| `normal(out, a)`        | `Vector2` | Calculates the normal (perpendicular) vector of `a` and normalizes it.    |
| `scale(out, a, scalar)` | `Vector2` | Scales vector `a` by a `scalar` factor.                                   |
| `dot(a, b)`             | `number`  | Calculates the dot product of vectors `a` and `b`.                        |
| `cross(a, b)`           | `number`  | Calculates the cross product of vectors `a` and `b` (scalar value in 2D). |
| `round(out, a)`         | `Vector2` | Rounds the components of `a` to the nearest integer.                      |
| `floor(out, a)`         | `Vector2` | Applies `Math.floor` to the components of `a`.                            |
| `ceil(out, a)`          | `Vector2` | Applies `Math.ceil` to the components of `a`.                             |

### Basic example

```typescript
const v1 = new Vector2(2, 1);
const v2 = new Vector2(3, 2);
const v3 = new Vector2(); // Vector (0, 0)

Vector2.add(v3, v1, v2);
console.log(v3.x); // 5
console.log(v3.y); // 3
```

### Example: normalized vector

```typescript
const v = new Vector2(3, 0);
const unit = Vector2.unit(new Vector2(), v);
console.log(unit.x); // 1
console.log(unit.y); // 0
```

### Notes

-   Static methods receive an output vector (`out`) to avoid creating new instances and reduce memory usage.
-   The `direction` property returns a new unit vector representing the current vector’s direction.
-   This class is widely used by the physics, rendering, and game logic systems within the engine.
