## Funciones matemáticas utilitarias

La librería matemática del motor Angry Pixel incluye varias funciones auxiliares para realizar operaciones numéricas comunes como límites, números aleatorios, redondeos, conversiones angulares y manipulación de colores.  
Estas funciones se usan extensamente en cálculos físicos, generación de niveles, interpolaciones y otras áreas del motor.

### Funciones

| Función                            | Retorno    | Descripción                                                                              |
| ---------------------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| `clamp(value, min, max)`           | `number`   | Restringe un valor dentro de un rango.                                                   |
| `randomInt(min, max)`              | `number`   | Devuelve un entero aleatorio entre `min` y `max` (inclusive).                            |
| `randomFloat(min, max, decimals?)` | `number`   | Devuelve un número flotante aleatorio entre `min` y `max` con una cantidad de decimales. |
| `fixedRound(value, decimals)`      | `number`   | Redondea un número flotante a una cantidad específica de decimales.                      |
| `range(start, end, steps?)`        | `number[]` | Genera un array con una secuencia de números desde `start` hasta `end`.                  |
| `between(value, min, max)`         | `boolean`  | Comprueba si un número está dentro de un rango (inclusive).                              |
| `radiansToDegrees(radians)`        | `number`   | Convierte un ángulo de radianes a grados.                                                |
| `degreesToRadians(degrees)`        | `number`   | Convierte un ángulo de grados a radianes.                                                |
| `rgbToHex({r, g, b}, prefix?)`     | `string`   | Convierte un color RGB a una cadena hexadecimal.                                         |

### Ejemplos

#### clamp

```typescript
clamp(10, 0, 5); // 5
clamp(10, 0, 15); // 10
```

#### randomInt y randomFloat

```typescript
randomInt(0, 10); // Ejemplo: 5

randomFloat(0, 10); // Ejemplo: 5.23
randomFloat(0, 10, 4); // Ejemplo: 5.2345
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

#### Conversiones de ángulos

```typescript
radiansToDegrees(Math.PI); // 180
degreesToRadians(180); // 3.141592653589793
```

#### rgbToHex

```typescript
rgbToHex({ r: 255, g: 255, b: 255 }); // "#ffffff"
rgbToHex({ r: 0, g: 255, b: 0 }, ""); // "00ff00"
```

### Notas

-   `clamp` es útil para limitar valores, por ejemplo, coordenadas o parámetros de física.
-   `randomInt` y `randomFloat` son ideales para generación de niveles aleatorios o mecánicas de azar.
-   `fixedRound` evita errores de precisión en operaciones con decimales.
-   `range` facilita la creación de secuencias para iteraciones.
-   `between` simplifica verificaciones de límites.
-   `radiansToDegrees` y `degreesToRadians` permiten trabajar fácilmente con sistemas angulares diferentes.
-   `rgbToHex` convierte componentes RGB a valores compatibles con CSS o HTML.
