# Entidades

Las **entidades** son los objetos fundamentales que componen cualquier juego creado con Angry Pixel Engine.  
Cada entidad es simplemente un identificador único (ID numérico) que agrupa uno o más **componentes** que definen su comportamiento y atributos.

> 📝 **Nota:** Las entidades por sí solas no tienen datos ni lógica. Todo su comportamiento y estado se define a través de los componentes que contienen.

## Creación de entidades

El motor proporciona el `EntityManager` para crear y administrar entidades.

### Crear una entidad vacía

```typescript
const entity = entityManager.createEntity();
```

### Crear una entidad con componentes

```typescript
const entity = entityManager.createEntity([
    new Player({ health: 100 }),
    new Transform({ position: new Vector2(0, 0) }),
]);
```

> 📝 Puedes pasar tanto instancias de componentes como clases de componentes (el motor instanciará automáticamente la clase si no pasas una instancia).

### Crear una entidad a partir de un arquetipo

Un **arquetipo** es una plantilla reutilizable que define qué componentes tendrá la entidad y sus hijos.

```typescript
const playerArchetype = {
    components: [new Player({ health: 100 }), new Transform({ position: new Vector2(0, 0) })],
    enabled: true,
};

const entity = entityManager.createEntityFromArchetype(playerArchetype);
```

## Relaciones padre-hijo

Puedes establecer jerarquías entre entidades:

```typescript
const parent = entityManager.createEntity([Transform]);
const child = entityManager.createEntity([Transform]);

entityManager.setParent(child, parent);
```

Esto es útil para agrupar entidades lógicamente (por ejemplo, un enemigo con varias partes, o un personaje y su espada).

> 🔎 **Importante:** Si ambas entidades tienen un componente `Transform`, el sistema automáticamente generará una relación entre esos `Transform` para que las posiciones de los hijos se actualicen en relación al padre.

## Activar y desactivar entidades

Puedes habilitar o deshabilitar entidades completas:

```typescript
entityManager.disableEntity(entity);
entityManager.enableEntity(entity);
```

> 🔎 Las entidades y componentes deshabilitados no son procesados por los sistemas (no aparecen en los resultados de `search`).

## Buscar entidades

El método `search` permite encontrar entidades que tengan un componente específico:

```typescript
const result = entityManager.search(Player);

result.forEach(({ entity, component }) => {
    console.log(`Entidad: ${entity}, HP: ${component.health}`);
});
```

También puedes buscar por atributos específicos:

```typescript
const alivePlayers = entityManager.search(Player, { status: "alive" });
```

## Modificar componentes de una entidad

Para modificar los datos de un componente de una entidad:

```typescript
entityManager.updateComponentData(entity, Player, { health: 80 });
```

## Eliminar entidades y componentes

Eliminar una entidad (se eliminan también sus componentes e hijos):

```typescript
entityManager.removeEntity(entity);
```

Eliminar un componente:

```typescript
entityManager.removeComponent(entity, Player);
```

---

## Ejemplos de arquetipos

Los **arquetipos** son plantillas reutilizables que definen:

-   Qué componentes tendrá la entidad.
-   Si estará habilitada o deshabilitada al crearse.
-   Si tendrá entidades hijas con sus propios componentes.

Son ideales para crear entidades complejas o repetibles (por ejemplo: enemigos, pickups, obstáculos).

### 1️⃣ Arquetipo básico

```typescript
const playerArchetype = {
    components: [
        new Player({ health: 100, speed: 50 }),
        new Transform({ position: new Vector2(0, 0) }),
        SpriteRenderer,
    ],
    enabled: true,
};

const entity = entityManager.createEntityFromArchetype(playerArchetype);
```

**Resultado:**  
Se crea una entidad con los componentes `Player`, `Transform` y `SpriteRenderer`, y queda habilitada.

---

### 2️⃣ Arquetipo con componentes deshabilitados

```typescript
const stealthEnemyArchetype = {
    components: [
        new Enemy({ aggression: 80 }),
        new Transform({ position: new Vector2(100, 200) }),
        disableComponent(new BoxCollider()), // El enemigo empieza sin colisión
    ],
    enabled: true,
};

const enemy = entityManager.createEntityFromArchetype(stealthEnemyArchetype);
```

**Resultado:**  
El enemigo se crea con colisionador deshabilitado. Luego se puede activar con:

```typescript
entityManager.enableComponent(enemy, BoxCollider);
```

---

### 3️⃣ Arquetipo con jerarquía padre-hijo

```typescript
const bossArchetype = {
    components: [new Enemy({ health: 1000 }), new Transform({ position: new Vector2(500, 300) }), SpriteRenderer],
    children: [
        {
            components: [new WeaponMount(), SpriteRenderer],
            enabled: true,
        },
        {
            components: [new Shield({ durability: 200 }), SpriteRenderer],
            enabled: false, // El escudo empieza deshabilitado
        },
    ],
    enabled: true,
};

const boss = entityManager.createEntityFromArchetype(bossArchetype);
```

**Resultado:**  
Se crea un jefe con dos entidades hijas:

-   Un arma activa.
-   Un escudo deshabilitado que se puede activar más adelante con `entityManager.enableEntity(shieldEntity)`.

> 🔎 **Nota:** Si las entidades hijas y el padre tienen `Transform`, se creará una relación jerárquica de posiciones automáticamente.

---

### Nota importante

Cuando creas entidades a partir de arquetipos:

-   Los **componentes son clonados**, por lo que puedes usar el mismo arquetipo muchas veces sin que las instancias de componentes se mezclen.
-   Los **componentes deshabilitados** no serán procesados por los sistemas hasta que se habiliten.
-   Los **hijos** heredan las relaciones parentales y puedes buscarlos o modificarlos con métodos como `getChildren` o `searchInChildren`.

## Resumen

✅ Las entidades son simples identificadores que agrupan componentes.  
✅ El `EntityManager` permite toda la gestión de entidades y componentes.  
✅ Los arquetipos son una herramienta poderosa para definir plantillas de entidades complejas.
