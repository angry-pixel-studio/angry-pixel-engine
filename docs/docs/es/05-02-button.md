## Button

El componente `Button` crea un botón interactivo que puede hacer clic o ser presionado.  
Soporta formas rectangulares o circulares y se puede configurar con dimensiones, desplazamiento de posición, soporte para pantallas táctiles y funciones que se ejecutan al hacer clic o presionar el botón.

### Propiedades

| Propiedad                    | Tipo          | Descripción                                                                                                               |
| ---------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `shape`                      | `ButtonShape` | La forma del botón: `Rectangle` o `Circumference`.                                                                        |
| `width`                      | `number`      | Ancho en píxeles (solo para botones de forma rectangular).                                                                |
| `height`                     | `number`      | Alto en píxeles (solo para botones de forma rectangular).                                                                 |
| `radius`                     | `number`      | Radio en píxeles (solo para botones de forma circular).                                                                   |
| `touchEnabled`               | `boolean`     | Si es `true`, habilita la interacción con pantallas táctiles.                                                             |
| `offset`                     | `Vector2`     | Desplazamiento en los ejes X e Y con respecto al centro de la entidad.                                                    |
| `pressed` _(solo lectura)_   | `boolean`     | Devuelve `true` si el botón está actualmente presionado.                                                                  |
| `mouseOver` _(solo lectura)_ | `boolean`     | Devuelve `true` si el cursor del mouse está sobre el botón.                                                               |
| `onClick`                    | `() => void`  | Función que se ejecuta cuando se hace clic en el botón.                                                                   |
| `onPressed`                  | `() => void`  | Función que se ejecuta cuando el botón es presionado (mantiene el estado presionado mientras se mantiene la interacción). |

### Ejemplo

```typescript
const button = new Button({
    shape: ButtonShape.Rectangle,
    width: 100,
    height: 50,
    offset: new Vector2(0, 0),
    touchEnabled: true,
    onClick: () => console.log("¡Botón clickeado!"),
    onPressed: () => console.log("¡Botón presionado!"),
});
```

### Notas

-   Las funciones `onClick` y `onPressed` se ejecutan en respuesta a las interacciones del usuario.
-   El componente soporta tanto entrada de mouse como de pantalla táctil (`touchEnabled`).
-   La detección de interacción y la ejecución de las funciones se procesan en el sistema que maneja los componentes `Button`. El componente solo define las propiedades y callbacks, sin ejecutar lógica de interacción directamente.
