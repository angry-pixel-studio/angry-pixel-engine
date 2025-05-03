## DarknessRenderer & LightRenderer

El sistema de iluminación del motor se compone de dos componentes que trabajan conjuntamente:  
`DarknessRenderer` y `LightRenderer`.

`DarknessRenderer` dibuja una máscara de oscuridad que puede cubrir parcial o totalmente una zona de la pantalla.  
`LightRenderer` define fuentes de luz que iluminan áreas específicas dentro de esa oscuridad.

### DarknessRenderer

El componente `DarknessRenderer` crea una máscara de oscuridad con forma rectangular.  
Puede configurarse con color, opacidad, dimensiones y capa de renderizado.

#### Propiedades

| Propiedad | Tipo     | Descripción                       |
| --------- | -------- | --------------------------------- |
| `width`   | `number` | Ancho de la oscuridad en píxeles. |
| `height`  | `number` | Alto de la oscuridad en píxeles.  |
| `color`   | `string` | Color de la oscuridad.            |
| `opacity` | `number` | Opacidad entre 0 y 1.             |
| `layer`   | `string` | Capa de renderizado.              |

#### Ejemplo

```typescript
const darknessRenderer = new DarknessRenderer({
    width: 100,
    height: 50,
    color: "#000000",
    opacity: 0.5,
    layer: "Default",
});
```

---

### LightRenderer

El componente `LightRenderer` define una fuente de luz circular.  
Estas luces afectan visualmente a los `DarknessRenderer` que compartan la misma capa.

#### Propiedades

| Propiedad   | Tipo      | Descripción                                                         |
| ----------- | --------- | ------------------------------------------------------------------- |
| `radius`    | `number`  | Radio de la luz.                                                    |
| `smooth`    | `boolean` | Si `true`, suaviza los bordes de la luz.                            |
| `layer`     | `string`  | Capa de renderizado (debe coincidir con la del `DarknessRenderer`). |
| `intensity` | `number`  | Intensidad de la luz entre 0 y 1.                                   |

#### Ejemplo

```typescript
const lightRenderer = new LightRenderer({
    radius: 100,
    smooth: true,
    layer: "Default",
    intensity: 0.8,
});
```

---

### Ejemplo combinado

```typescript
const darkness = new DarknessRenderer({
    width: 500,
    height: 500,
    color: "#000000",
    opacity: 0.7,
    layer: "Game",
});

const light = new LightRenderer({
    radius: 120,
    smooth: true,
    layer: "Game",
    intensity: 1,
});
```

---

### Notas

-   Para que una luz afecte a una oscuridad, ambos componentes deben compartir el mismo valor de `layer`.
-   Puedes tener múltiples `LightRenderer` iluminando un mismo `DarknessRenderer`.
-   El parámetro `smooth` en `LightRenderer` permite transiciones suaves entre luz y sombra.
-   La intensidad (`intensity`) controla qué tan fuerte es el efecto de la luz sobre la oscuridad.
-   Todo el cálculo de iluminación (mezcla de luces con la oscuridad) es gestionado por el sistema de renderizado. Los componentes solo definen atributos visuales.
