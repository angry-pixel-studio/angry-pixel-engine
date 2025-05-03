## Camera

El componente `Camera` controla qué capas y objetos se renderizan en pantalla.  
Permite configurar múltiples capas de renderizado, controlar el nivel de zoom y establecer el orden de profundidad cuando se utilizan varias cámaras.  
También puede habilitar la visualización de datos de depuración para propósitos de desarrollo.

### Propiedades

| Propiedad | Tipo       | Descripción                                                                                                  |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `layers`  | `string[]` | Capas que serán renderizadas por esta cámara. Se renderizan en orden ascendente.                             |
| `zoom`    | `number`   | Nivel de zoom de la cámara. El valor por defecto es `1`.                                                     |
| `depth`   | `number`   | En caso de usar más de una cámara, determina cuál se renderiza primero. Valores menores se renderizan antes. |
| `debug`   | `boolean`  | Si es `true`, permite que esta cámara renderice información de depuración. Valor por defecto: `false`.       |

### Ejemplo

```typescript
const camera = new Camera({
    layers: ["Default", "UI", "Background"],
    zoom: 1.5,
    depth: 0,
    debug: true,
});
```

### Notas

-   Las capas (`layers`) determinan qué entidades y componentes de renderizado serán visibles para esta cámara.
-   Si se usan múltiples cámaras, su orden de renderizado se controla con la propiedad `depth`.
-   La opción `debug` permite mostrar información adicional útil durante el desarrollo (por ejemplo, colisionadores o límites de cámara).
-   El componente solo define las propiedades de la cámara. La lógica de renderizado y la actualización de posición se gestionan por el sistema encargado de procesar las cámaras.
