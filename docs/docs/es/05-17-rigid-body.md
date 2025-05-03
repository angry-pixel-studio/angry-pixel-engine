## RigidBody

El componente `RigidBody` habilita la simulación física para una entidad, permitiendo que interactúe con otros objetos que también tengan física en el mundo del juego.  
Define cómo se comporta la entidad bajo fuerzas como gravedad, colisiones y velocidades aplicadas.  
El componente admite tres tipos de cuerpos:

-   **Dynamic:** Cuerpos completamente simulados físicamente que responden a fuerzas, colisiones, gravedad y pueden ser movidos por otros cuerpos rígidos.  
    Ideal para objetos que requieren un comportamiento físico realista como personajes, proyectiles o ítems.

-   **Kinematic:** Cuerpos que pueden moverse con velocidades aplicadas pero no se ven afectados por la gravedad ni por colisiones de otros cuerpos.  
    Perfecto para plataformas móviles, enemigos con rutas predefinidas o objetos que necesitan movimiento controlado sin simulación física completa.  
    Más eficiente en rendimiento que los cuerpos Dynamic.

-   **Static:** Cuerpos inmóviles que actúan como obstáculos sólidos. No responden a fuerzas ni colisiones.  
    La opción más eficiente en rendimiento, ya que requieren cálculos físicos mínimos.

### Propiedades

| Propiedad      | Tipo            | Descripción                                                                                                    |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| `type`         | `RigidBodyType` | Tipo de cuerpo: `Dynamic`, `Kinematic` o `Static`.                                                             |
| `velocity`     | `Vector2`       | Velocidad en los ejes X e Y expresada en píxeles por segundo. Para cuerpos `Dynamic` y `Kinematic`.            |
| `gravity`      | `number`        | Gravedad expresada en píxeles por segundo cuadrado. Solo para cuerpos `Dynamic`.                               |
| `acceleration` | `Vector2`       | Aceleración en los ejes X e Y expresada en píxeles por segundo cuadrado. Para cuerpos `Dynamic` y `Kinematic`. |

### Ejemplo: cuerpo Dynamic

```typescript
const rigidBody = new RigidBody({
    type: RigidBodyType.Dynamic,
    gravity: 10,
    velocity: new Vector2(1, 0),
    acceleration: new Vector2(1, 0),
});
```

### Ejemplo: cuerpo Kinematic

```typescript
const rigidBody = new RigidBody({
    type: RigidBodyType.Kinematic,
    velocity: new Vector2(1, 0),
    acceleration: new Vector2(1, 0),
});
```

### Ejemplo: cuerpo Static

```typescript
const rigidBody = new RigidBody({
    type: RigidBodyType.Static,
});
```

### Notas

-   Los cuerpos `Dynamic` son ideales para objetos que necesitan responder a fuerzas físicas reales.
-   Los cuerpos `Kinematic` permiten movimiento controlado sin influencia de fuerzas externas.
-   Los cuerpos `Static` ofrecen la mejor eficiencia para geometría fija o elementos del entorno.
-   Para que el componente `physics` de los colisionadores tenga efecto, la entidad debe tener también un `RigidBody` con tipo `Dynamic` o `Kinematic`. Los cuerpos `Static` no se desplazan pero sí pueden recibir colisiones.
