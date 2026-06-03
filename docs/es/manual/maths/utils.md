# Funciones útiles

Las utilidades matemáticas son un conjunto de funciones auxiliares independientes para operaciones numéricas comunes.

```typescript
import { clamp, randomInt, degreesToRadians } from "angry-pixel";
```

## Funciones

| Función | Descripción |
|----------|-------------|
| `clamp(value, min, max)` | Restringe `value` al rango `[min, max]`. |
| `randomInt(min, max)` | Devuelve un entero aleatorio entre `min` y `max` (ambos incluidos). |
| `randomFloat(min, max, decimals?)` | Devuelve un número decimal aleatorio entre `min` y `max`. `decimals` por defecto es `2`. |
| `fixedRound(value, decimals)` | Redondea `value` al número de decimales indicado. |
| `range(start, end, steps?)` | Devuelve un array de números desde `start` hasta `end` (ambos incluidos). `steps` por defecto es `1`. |
| `between(value, min, max)` | Devuelve `true` si `value` está dentro de `[min, max]` (ambos incluidos). |
| `radiansToDegrees(radians)` | Convierte radianes a grados. |
| `degreesToRadians(degrees)` | Convierte grados a radianes. |
| `rgbToHex({ r, g, b }, prefix?)` | Convierte valores RGB (0–255) a una cadena de color hexadecimal. `prefix` por defecto es `"#"`. |

## Ejemplos

```typescript
clamp(15, 0, 10); // 10
randomInt(1, 6); // un entero aleatorio de 1 a 6
range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
between(5, 0, 10); // true
radiansToDegrees(Math.PI); // 180
rgbToHex({ r: 255, g: 255, b: 255 }); // "#ffffff"
```
