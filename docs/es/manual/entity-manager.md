# El Entity Manager

El Entity Manager es el registro central de entidades y componentes. Crea y elimina entidades, asocia y quita componentes, busca entidades por sus componentes, gestiona relaciones padre-hijo y activa o desactiva entidades y componentes.

Dentro de una escena está disponible como `this.entityManager`. En los sistemas se obtiene mediante inyección de dependencias. Consulta [Componentes y sistemas personalizados](custom-components-and-systems.md).

Una entidad es un identificador numérico; los componentes son los datos asociados a ella. Consulta [Arquitectura](../welcome/architecture.md).

## Crear entidades

`createEntity` devuelve el identificador de la nueva entidad. Acepta una lista de componentes, que pueden ser instancias o clases de componentes. Las clases se instancian sin argumentos; las instancias se clonan.

```typescript
import { Transform, SpriteRenderer } from "angry-pixel";
import { Player } from "../component/Player";

// a partir de instancias de componentes
const entity = this.entityManager.createEntity([
    new Transform({ position: new Vector2(100, 100) }),
    new Player(),
]);

// a partir de clases de componentes
const other = this.entityManager.createEntity([Transform, SpriteRenderer]);

// una entidad vacía
const empty = this.entityManager.createEntity();
```

Una entidad puede crearse como hija de otra pasando un padre como segundo argumento:

```typescript
const child = this.entityManager.createEntity([new Transform()], parent);
```

## Acceder a los componentes

| Método | Descripción |
|--------|-------------|
| `getComponent(entity, ComponentType)` | Devuelve el componente del tipo indicado de la entidad. |
| `getComponents(entity)` | Devuelve todos los componentes de la entidad. |
| `hasComponent(entity, ComponentType)` | Devuelve `true` si la entidad tiene el componente. |
| `getEntityForComponent(component)` | Devuelve la entidad a la que pertenece una instancia de componente. |
| `updateComponentData(entity, ComponentType, callback)` | Actualiza un componente mediante una función de callback. |

```typescript
const transform = this.entityManager.getComponent(entity, Transform);

this.entityManager.updateComponentData(entity, Transform, (transform) => {
    transform.position = new Vector2(200, 200);
});
```

## Agregar y quitar componentes

`addComponent` asocia un componente (instancia o clase) a una entidad existente. `removeComponent` acepta o bien una entidad y un tipo de componente, o bien una instancia de componente.

```typescript
this.entityManager.addComponent(entity, new SpriteRenderer());

this.entityManager.removeComponent(entity, SpriteRenderer);
// o, dada la instancia
this.entityManager.removeComponent(spriteRenderer);
```

## Buscar entidades

`search` encuentra las entidades que tienen un tipo de componente dado. Tiene dos formas:

- **Forma con callback (recomendada en los sistemas):** invoca el callback para cada coincidencia sin reservar un array intermedio. Úsala en `onUpdate` y otros bucles por frame.
- **Forma con array:** devuelve un array de objetos `SearchResult` (`{ entity, component }`), útil cuando necesitas ordenar, recortar o filtrar los resultados.

```typescript
// forma con callback
this.entityManager.search(Enemy, (enemy, entity) => {
    // hacer algo con cada enemigo
});

// forma con array
const enemies = this.entityManager.search(Enemy);
const alive = enemies.filter(({ component }) => component.status === "alive");
```

Ambas formas aceptan un argumento final `includeDisabled` (por defecto `false`) para incluir entidades y componentes desactivados.

> **Nota:** No agregues ni quites entidades/componentes del mismo tipo de componente dentro de un callback de `search`.

Otros métodos de búsqueda:

| Método | Descripción |
|--------|-------------|
| `searchEntitiesByComponents([ComponentType, ...])` | Devuelve las entidades que tienen todos los tipos de componente indicados. |
| `searchInChildren(parent, ComponentType, includeDisabled?)` | Devuelve objetos `SearchResult` de los hijos de `parent` que coincidan. |

## Activar y desactivar

Las entidades y los componentes desactivados son omitidos por los sistemas (y quedan excluidos de las búsquedas a menos que se indique `includeDisabled`).

| Método | Descripción |
|--------|-------------|
| `enableEntity(entity)` / `disableEntity(entity)` | Activa o desactiva una entidad. |
| `isEntityEnabled(entity)` | Indica si la entidad está activada. |
| `enableComponent(...)` / `disableComponent(...)` | Activa o desactiva un componente, por instancia o por entidad + tipo. |
| `isComponentEnabled(...)` | Indica si un componente está activado. |
| `enableEntitiesByComponent(ComponentType)` / `disableEntitiesByComponent(ComponentType)` | Activa o desactiva todas las entidades que tienen un tipo de componente. |

## Relaciones padre-hijo

Las entidades pueden organizarse en jerarquías.

| Método | Descripción |
|--------|-------------|
| `setParent(child, parent)` | Establece el padre de una entidad. |
| `getParent(child)` | Devuelve el padre de una entidad. |
| `getChildren(parent)` | Devuelve los hijos de una entidad. |
| `removeParent(child)` | Quita la relación con el padre de una entidad. |
| `removeChild(parent, child)` | Quita un hijo concreto de un padre. |
| `getComponentFromParent(parent, ComponentType)` | Devuelve un componente del tipo indicado del padre. |

## Eliminar entidades

| Método | Descripción |
|--------|-------------|
| `removeEntity(entity)` | Elimina una sola entidad. |
| `removeAllEntities(preserveComponentType?)` | Elimina todas las entidades, conservando opcionalmente las que tienen un tipo de componente dado. |
| `isEntity(entity)` | Indica si el identificador corresponde a una entidad existente. |

```typescript
this.entityManager.removeEntity(entity);
```
