[angry-pixel](../README.md) / [Exports](../modules.md) / IGameObjectManager

# Interface: IGameObjectManager

Used to create, retrieve and destroy GameObject instances.

## Table of contents

### Methods

- [addGameObject](IGameObjectManager.md#addgameobject)
- [destroyAllGameObjects](IGameObjectManager.md#destroyallgameobjects)
- [destroyGameObject](IGameObjectManager.md#destroygameobject)
- [findGameObject](IGameObjectManager.md#findgameobject)
- [findGameObjectById](IGameObjectManager.md#findgameobjectbyid)
- [findGameObjectByParent](IGameObjectManager.md#findgameobjectbyparent)
- [findGameObjects](IGameObjectManager.md#findgameobjects)
- [findGameObjectsByParent](IGameObjectManager.md#findgameobjectsbyparent)
- [findGameObjectsByTag](IGameObjectManager.md#findgameobjectsbytag)

## Methods

### addGameObject

▸ **addGameObject**<`T`\>(`gameObjectClass`, `options?`, `parent?`, `name?`): `T`

Instantiates a new game object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class. |
| `options?` | [`InitOptions`](InitOptions.md) | [optional] Options for the Init method. |
| `parent?` | [`GameObject`](../classes/GameObject.md) | [optional] The parent game object. |
| `name?` | `string` | [optional] The name associated to the game object. |

#### Returns

`T`

The game object instance.

#### Defined in

[src/core/managers/GameObjectManager.ts:19](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L19)

___

### destroyAllGameObjects

▸ **destroyAllGameObjects**(`ignoreKeep?`): `void`

Destroy all game objets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ignoreKeep?` | `boolean` | [optional] If TRUE, it also destroys objects with the "keep" property set to TRUE. |

#### Returns

`void`

#### Defined in

[src/core/managers/GameObjectManager.ts:81](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L81)

___

### destroyGameObject

▸ **destroyGameObject**(`gameObject`): `void`

Destroy the given game object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObject` | [`GameObject`](../classes/GameObject.md) | The game object to destory. |

#### Returns

`void`

#### Defined in

[src/core/managers/GameObjectManager.ts:86](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L86)

___

### findGameObject

▸ **findGameObject**<`T`\>(`gameObjectClass`): `T`

Returns the first game object found for the given class, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class to find. |

#### Returns

`T`

The found game object.

#### Defined in

[src/core/managers/GameObjectManager.ts:42](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L42)

▸ **findGameObject**<`T`\>(`name`): `T`

Returns the first game object found for the given name, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the game object to find. |

#### Returns

`T`

The found game object.

#### Defined in

[src/core/managers/GameObjectManager.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L48)

▸ **findGameObject**<`T`\>(`filter`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `string` \| `GameObjectClass`<`T`\> |

#### Returns

`T`

#### Defined in

[src/core/managers/GameObjectManager.ts:49](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L49)

___

### findGameObjectById

▸ **findGameObjectById**<`T`\>(`id`): `T`

Returns the first game object found for the given id, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The game object id to find. |

#### Returns

`T`

The found game object.

#### Defined in

[src/core/managers/GameObjectManager.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L36)

___

### findGameObjectByParent

▸ **findGameObjectByParent**<`T`\>(`parent`, `gameObjectClass`): `T`

Returns the first child game object for the given parent object and filtered by the given game object class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | [`GameObject`](../classes/GameObject.md) | The parent game object. |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class to find. |

#### Returns

`T`

The found game object.

#### Defined in

[src/core/managers/GameObjectManager.ts:62](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L62)

▸ **findGameObjectByParent**<`T`\>(`parent`, `name`): `T`

Returns the first child game object for the given parent object and filtered by the given name.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | [`GameObject`](../classes/GameObject.md) | The parent game object. |
| `name` | `string` | The name of the game object to find. |

#### Returns

`T`

The found game object.

#### Defined in

[src/core/managers/GameObjectManager.ts:69](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L69)

▸ **findGameObjectByParent**<`T`\>(`parent`, `filter`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`GameObject`](../classes/GameObject.md) |
| `filter` | `string` \| `GameObjectClass`<`T`\> |

#### Returns

`T`

#### Defined in

[src/core/managers/GameObjectManager.ts:70](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L70)

___

### findGameObjects

▸ **findGameObjects**<`T`\>(`gameObjectClass?`): `T`[]

Returns a collection of found game objects for the given class, or all the game objects if there is no class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass?` | `GameObjectClass`<`T`\> | [optional] The game object class to find. |

#### Returns

`T`[]

The found game objects.

#### Defined in

[src/core/managers/GameObjectManager.ts:30](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L30)

___

### findGameObjectsByParent

▸ **findGameObjectsByParent**<`T`\>(`parent`): `T`[]

Returns a collection of children game objects for the given parent object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | [`GameObject`](../classes/GameObject.md) | The parent game object. |

#### Returns

`T`[]

The found game objects.

#### Defined in

[src/core/managers/GameObjectManager.ts:55](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L55)

___

### findGameObjectsByTag

▸ **findGameObjectsByTag**<`T`\>(`tag`): `T`[]

Returns a collection of game objects found for the given tag.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag of the game objects to find. |

#### Returns

`T`[]

The found game objects.

#### Defined in

[src/core/managers/GameObjectManager.ts:76](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/GameObjectManager.ts#L76)
