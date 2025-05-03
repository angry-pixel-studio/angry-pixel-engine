# Componentes

Los **componentes** son estructuras de datos que definen las propiedades y el estado de una entidad.  
Cada componente contiene datos específicos y NO contiene lógica (la lógica se maneja en los sistemas).

Por ejemplo, un componente `Player` puede definir los puntos de vida, velocidad o estado del jugador.

> 📝 **Nota:** Cada entidad puede tener solo una instancia de cada tipo de componente.

## Definir componentes personalizados

Puedes definir componentes personalizados como clases simples:

```typescript
class Player {
    health = 100;
    speed = 50;
}
```

Luego puedes usarlos al crear entidades:

```typescript
const entity = entityManager.createEntity([new Player(), new Transform({ position: new Vector2(0, 0) })]);
```

## Acceder y modificar componentes

Obtener un componente de una entidad:

```typescript
const player = entityManager.getComponent(entity, Player);
```

Actualizar datos de un componente:

```typescript
entityManager.updateComponentData(entity, Player, { health: 80 });
```

> 📝 También puedes comprobar si una entidad tiene un componente usando `hasComponent`:

```typescript
if (entityManager.hasComponent(entity, Player)) {
    // La entidad tiene el componente Player
}
```

## Deshabilitar y habilitar componentes

Puedes deshabilitar o habilitar componentes de una entidad:

```typescript
entityManager.disableComponent(entity, Player);
entityManager.enableComponent(entity, Player);
```

Los componentes deshabilitados no serán procesados por los sistemas hasta que se habiliten.

## Crear componentes deshabilitados al inicio

Puedes crear componentes deshabilitados desde el inicio usando `disableComponent`:

```typescript
const archetype = {
    components: [disableComponent(new BoxCollider())],
};
```

## Buscar entidades por componentes

Puedes buscar todas las entidades que tengan un componente específico:

```typescript
const result = entityManager.search(Player);

result.forEach(({ entity, component }) => {
    console.log(`Entidad ${entity} tiene vida: ${component.health}`);
});
```

También puedes buscar filtrando por atributos del componente:

```typescript
const fastPlayers = entityManager.search(Player, { speed: 100 });
```

---

## Componentes Built-in

Angry Pixel Engine incluye **19 componentes built-in** listos para usar.  
Estos componentes cubren aspectos generales, físicas y renderizado.

### 📦 Componentes de uso general

-   **Transform**: Define la posición, rotación y escala de la entidad.
-   **TiledWrapper**: Permite integrar objetos provenientes de Tiled.
-   **Button**: Crea áreas clicables y botones de interfaz.
-   **AudioPlayer**: Permite reproducir sonidos y música.

### ⚙️ Componentes de físicas

-   **TilemapCollider**: Colisionador para mapas de tiles.
-   **RigidBody**: Define propiedades físicas como velocidad y aceleración.
-   **EdgeCollider**: Colisionador en forma de borde o línea.
-   **BoxCollider**: Colisionador rectangular.
-   **BallCollider**: Colisionador circular.
-   **PolygonCollider**: Colisionador de polígonos convexos.

### 🎨 Componentes de renderizado

-   **Animator**: Controla animaciones de sprites.
-   **VideoRenderer**: Permite renderizar videos como parte del juego.
-   **TilemapRenderer**: Renderiza mapas de tiles.
-   **TextRenderer**: Muestra texto en pantalla.
-   **SpriteRenderer**: Renderiza sprites.
-   **DarknessRenderer**: Genera una capa de oscuridad que puede ser iluminada con el _LightRenderer_.
-   **MaskRenderer**: Aplica máscaras de recorte a la entidad.
-   **LightRenderer**: Renderiza luces.
-   **Camera**: Define la cámara que observa la escena.

> 📝 **Nota:** Puedes combinar componentes built-in y personalizados en una misma entidad.

---

## Nota importante

-   Los componentes deben ser clases (no objetos literales).
-   No deben contener lógica (la lógica se maneja en los sistemas).
-   Puedes deshabilitar componentes temporalmente si quieres que la entidad deje de usar cierta funcionalidad sin eliminarla.

### Resumen

✅ Los componentes definen datos y estado de una entidad.  
✅ No contienen lógica.  
✅ Se gestionan y buscan a través del `EntityManager`.  
✅ Puedes usar componentes built-in o crear los tuyos propios.
