## Rectangle

The `Rectangle` class represents an axis-aligned bounding rectangle (AABR) defined by position, width, and height.  
The position represents the bottom-left corner of the rectangle.  
It provides methods and properties for manipulating and querying the rectangle's geometry.

### Properties

| Property   | Type      | Description                                      |
| ---------- | --------- | ------------------------------------------------ |
| `x`        | `number`  | X coordinate of the bottom-left corner.          |
| `y`        | `number`  | Y coordinate of the bottom-left corner.          |
| `x1`       | `number`  | X coordinate of the right edge (`x + width`).    |
| `y1`       | `number`  | Y coordinate of the top edge (`y + height`).     |
| `width`    | `number`  | Rectangle’s width.                               |
| `height`   | `number`  | Rectangle’s height.                              |
| `position` | `Vector2` | Vector representing the position (`x`, `y`).     |
| `center`   | `Vector2` | Vector representing the center of the rectangle. |

### Instance methods

| Method                     | Returns   | Description                                                                      |
| -------------------------- | --------- | -------------------------------------------------------------------------------- |
| `set(x, y, width, height)` | `void`    | Sets the position and dimensions of the rectangle.                               |
| `equals(rectangle)`        | `boolean` | Compares if two rectangles are equal.                                            |
| `copy(rect)`               | `void`    | Copies the properties from another rectangle.                                    |
| `intersects(rect)`         | `boolean` | Checks if this rectangle overlaps with another rectangle.                        |
| `contains(rect or vector)` | `boolean` | Checks if the rectangle fully contains another rectangle or a point (`Vector2`). |
| `toString()`               | `string`  | Returns a string representation of the rectangle.                                |

### Basic example

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

### Example: intersection and containment

```typescript
const rect1 = new Rectangle(0, 0, 100, 100);
const rect2 = new Rectangle(50, 50, 100, 100);

console.log(rect1.intersects(rect2)); // true

const point = new Vector2(50, 50);
console.log(rect1.contains(point)); // true

const rect3 = new Rectangle(100, 100, 100, 100);
console.log(rect1.contains(rect3)); // false
```

### Notes

-   The `x` and `y` position always represents the bottom-left corner.
-   The `intersects` and `contains` methods are essential for collision detection in physics and rendering systems.
-   The `center` property is dynamically calculated on each access and does not create new instances thanks to using an internal reference.
