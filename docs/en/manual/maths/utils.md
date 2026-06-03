# Utils

The math utilities are a set of standalone helper functions for common numeric operations.

```typescript
import { clamp, randomInt, degreesToRadians } from "angry-pixel";
```

## Functions

| Function | Description |
|----------|-------------|
| `clamp(value, min, max)` | Restricts `value` to the range `[min, max]`. |
| `randomInt(min, max)` | Returns a random integer between `min` and `max` (inclusive). |
| `randomFloat(min, max, decimals?)` | Returns a random float between `min` and `max`. `decimals` defaults to `2`. |
| `fixedRound(value, decimals)` | Rounds `value` to the given number of decimals. |
| `range(start, end, steps?)` | Returns an array of numbers from `start` to `end` (inclusive). `steps` defaults to `1`. |
| `between(value, min, max)` | Returns `true` if `value` is within `[min, max]` (inclusive). |
| `radiansToDegrees(radians)` | Converts radians to degrees. |
| `degreesToRadians(degrees)` | Converts degrees to radians. |
| `rgbToHex({ r, g, b }, prefix?)` | Converts RGB values (0–255) to a hex color string. `prefix` defaults to `"#"`. |

## Examples

```typescript
clamp(15, 0, 10); // 10
randomInt(1, 6); // a random integer from 1 to 6
range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
between(5, 0, 10); // true
radiansToDegrees(Math.PI); // 180
rgbToHex({ r: 255, g: 255, b: 255 }); // "#ffffff"
```
