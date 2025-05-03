## Vector2

La clase `Vector2` representa un vector bidimensional con componentes `x` e `y`.  
Proporciona métodos estáticos para realizar operaciones comunes con vectores como suma, resta, escalado, producto punto, producto cruzado, normalización y más.  
Se utiliza en todo el motor para almacenar posiciones 2D, direcciones, velocidades y otras magnitudes vectoriales.

### Propiedades

| Propiedad   | Tipo      | Descripción                     |
| ----------- | --------- | ------------------------------- |
| `x`         | `number`  | Componente X del vector.        |
| `y`         | `number`  | Componente Y del vector.        |
| `magnitude` | `number`  | Magnitud (longitud) del vector. |
| `direction` | `Vector2` | Vector de dirección unitario.   |

### Métodos de instancia

| Método             | Retorno   | Descripción                                      |
| ------------------ | --------- | ------------------------------------------------ |
| `set(x, y)`        | `void`    | Asigna los valores `x` e `y` al vector.          |
| `copy(vector)`     | `void`    | Copia los valores de otro vector.                |
| `equals(vector)`   | `boolean` | Compara si dos vectores son iguales.             |
| `clone()`          | `Vector2` | Devuelve una copia del vector.                   |
| `distance(vector)` | `number`  | Calcula la distancia con otro vector.            |
| `toString()`       | `string`  | Devuelve una representación en texto del vector. |

### Métodos estáticos

| Método                  | Retorno   | Descripción                                                        |
| ----------------------- | --------- | ------------------------------------------------------------------ |
| `add(out, a, b)`        | `Vector2` | Suma `a` y `b` y almacena el resultado en `out`.                   |
| `subtract(out, a, b)`   | `Vector2` | Resta `b` de `a` y almacena el resultado en `out`.                 |
| `unit(out, a)`          | `Vector2` | Calcula el vector unitario de `a`.                                 |
| `normal(out, a)`        | `Vector2` | Calcula el vector normal (perpendicular) de `a` y lo normaliza.    |
| `scale(out, a, scalar)` | `Vector2` | Escala el vector `a` por un factor `scalar`.                       |
| `dot(a, b)`             | `number`  | Calcula el producto punto entre `a` y `b`.                         |
| `cross(a, b)`           | `number`  | Calcula el producto cruzado entre `a` y `b` (valor escalar en 2D). |
| `round(out, a)`         | `Vector2` | Redondea las componentes de `a` al entero más cercano.             |
| `floor(out, a)`         | `Vector2` | Aplica piso (`Math.floor`) a las componentes de `a`.               |
| `ceil(out, a)`          | `Vector2` | Aplica techo (`Math.ceil`) a las componentes de `a`.               |

### Ejemplo básico

```typescript
const v1 = new Vector2(2, 1);
const v2 = new Vector2(3, 2);
const v3 = new Vector2(); // Vector (0, 0)

Vector2.add(v3, v1, v2);
console.log(v3.x); // 5
console.log(v3.y); // 3
```

### Ejemplo: vector normalizado

```typescript
const v = new Vector2(3, 0);
const unit = Vector2.unit(new Vector2(), v);
console.log(unit.x); // 1
console.log(unit.y); // 0
```

### Notas

-   Los métodos estáticos reciben un vector de salida (`out`) para evitar generar nuevas instancias y reducir el consumo de memoria.
-   La propiedad `direction` devuelve un nuevo vector unitario que representa la dirección del vector actual.
-   Esta clase es ampliamente utilizada por los sistemas de físicas, renderizado y lógica de juego dentro del motor.
