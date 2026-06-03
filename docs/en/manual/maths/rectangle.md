# Rectangle

`Rectangle` represents an axis-aligned rectangle defined by a position (`x`, `y`) and a size (`width`, `height`). It is used for bounding boxes and area checks.

```typescript
import { Rectangle } from "angry-pixel";

const rect = new Rectangle(0, 0, 32, 32);
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | `number` | The x coordinate. |
| `y` | `number` | The y coordinate. |
| `width` | `number` | The width. |
| `height` | `number` | The height. |
| `position` | `Vector2` | The position as a vector. |
| `center` | `Vector2` | The center point (read-only). |

## Methods

| Method | Description |
|--------|-------------|
| `set(x, y, width, height)` | Sets all four values at once. |
| `copy(rectangle)` | Copies the values from another rectangle. |
| `equals(rectangle)` | Returns `true` if both rectangles have the same values. |
| `intersects(rectangle)` | Returns `true` if this rectangle overlaps another. |
| `contains(rectangle)` | Returns `true` if this rectangle fully contains another rectangle. |
| `contains(vector)` | Returns `true` if this rectangle contains a point. |

```typescript
const area = new Rectangle(0, 0, 100, 100);
const point = new Vector2(50, 50);

area.contains(point); // true
```
