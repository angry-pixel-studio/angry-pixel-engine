## Math Utility Functions

The Angry Pixel engine’s math library includes various helper functions for common numeric operations like clamping, random number generation, rounding, angle conversions, and color manipulation.  
These functions are extensively used in physics calculations, level generation, interpolation, and other engine systems.

### Functions

| Function                           | Returns    | Description                                                                             |
| ---------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `clamp(value, min, max)`           | `number`   | Restricts a value within a range.                                                       |
| `randomInt(min, max)`              | `number`   | Returns a random integer between `min` and `max` (inclusive).                           |
| `randomFloat(min, max, decimals?)` | `number`   | Returns a random floating-point number between `min` and `max` with specified decimals. |
| `fixedRound(value, decimals)`      | `number`   | Rounds a floating-point number to a specific number of decimal places.                  |
| `range(start, end, steps?)`        | `number[]` | Generates an array containing a numeric sequence from `start` to `end`.                 |
| `between(value, min, max)`         | `boolean`  | Checks if a number falls within a specified range (inclusive).                          |
| `radiansToDegrees(radians)`        | `number`   | Converts an angle from radians to degrees.                                              |
| `degreesToRadians(degrees)`        | `number`   | Converts an angle from degrees to radians.                                              |
| `rgbToHex({r, g, b}, prefix?)`     | `string`   | Converts an RGB color to a hexadecimal string.                                          |

### Examples

#### clamp

```typescript
clamp(10, 0, 5); // 5
clamp(10, 0, 15); // 10
```

#### randomInt and randomFloat

```typescript
randomInt(0, 10); // Example: 5

randomFloat(0, 10); // Example: 5.23
randomFloat(0, 10, 4); // Example: 5.2345
```

#### fixedRound

```typescript
fixedRound(5.2345, 2); // 5.23
```

#### range

```typescript
range(0, 5); // [0, 1, 2, 3, 4, 5]
range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
```

#### between

```typescript
between(5, 0, 10); // true
between(5, 0, 4); // false
```

#### Angle conversions

```typescript
radiansToDegrees(Math.PI); // 180
degreesToRadians(180); // 3.141592653589793
```

#### rgbToHex

```typescript
rgbToHex({ r: 255, g: 255, b: 255 }); // "#ffffff"
rgbToHex({ r: 0, g: 255, b: 0 }, ""); // "00ff00"
```

### Notes

-   `clamp` is useful for constraining values, such as coordinates or physics parameters.
-   `randomInt` and `randomFloat` are ideal for random level generation or chance mechanics.
-   `fixedRound` avoids precision errors in decimal operations.
-   `range` simplifies creating numeric sequences for iteration.
-   `between` is helpful for boundary checks.
-   `radiansToDegrees` and `degreesToRadians` enable working easily between different angle systems.
-   `rgbToHex` converts RGB components to values compatible with CSS or HTML.
