[angry-pixel](../README.md) / [Exports](../modules.md) / EdgeCollider

# Class: EdgeCollider

## Hierarchy

- `BaseCollider`

  ↳ **`EdgeCollider`**

## Table of contents

### Properties

- [allowMultiple](EdgeCollider.md#allowmultiple)
- [assetManager](EdgeCollider.md#assetmanager)
- [colliders](EdgeCollider.md#colliders)
- [debug](EdgeCollider.md#debug)
- [domManager](EdgeCollider.md#dommanager)
- [gameConfig](EdgeCollider.md#gameconfig)
- [gameObject](EdgeCollider.md#gameobject)
- [gameObjectManager](EdgeCollider.md#gameobjectmanager)
- [inputManager](EdgeCollider.md#inputmanager)
- [layer](EdgeCollider.md#layer)
- [name](EdgeCollider.md#name)
- [offsetX](EdgeCollider.md#offsetx)
- [offsetY](EdgeCollider.md#offsety)
- [physics](EdgeCollider.md#physics)
- [physicsManager](EdgeCollider.md#physicsmanager)
- [renderManager](EdgeCollider.md#rendermanager)
- [renderer](EdgeCollider.md#renderer)
- [rotation](EdgeCollider.md#rotation)
- [sceneManager](EdgeCollider.md#scenemanager)
- [timeManager](EdgeCollider.md#timemanager)
- [updateEvent](EdgeCollider.md#updateevent)
- [vertexModel](EdgeCollider.md#vertexmodel)

### Accessors

- [active](EdgeCollider.md#active)

### Methods

- [addGameObject](EdgeCollider.md#addgameobject)
- [collidesWithLayer](EdgeCollider.md#collideswithlayer)
- [destroyGameObject](EdgeCollider.md#destroygameobject)
- [findGameObject](EdgeCollider.md#findgameobject)
- [findGameObjects](EdgeCollider.md#findgameobjects)
- [findGameObjectsByTag](EdgeCollider.md#findgameobjectsbytag)
- [getCollisionWithLayer](EdgeCollider.md#getcollisionwithlayer)
- [getCollisionsWithLayer](EdgeCollider.md#getcollisionswithlayer)
- [getComponent](EdgeCollider.md#getcomponent)
- [getComponents](EdgeCollider.md#getcomponents)
- [getCurrentScene](EdgeCollider.md#getcurrentscene)
- [getGameObject](EdgeCollider.md#getgameobject)
- [hasComponent](EdgeCollider.md#hascomponent)
- [init](EdgeCollider.md#init)
- [onActiveChange](EdgeCollider.md#onactivechange)
- [onDestroy](EdgeCollider.md#ondestroy)
- [removeComponent](EdgeCollider.md#removecomponent)
- [start](EdgeCollider.md#start)
- [update](EdgeCollider.md#update)
- [updateColliders](EdgeCollider.md#updatecolliders)
- [updatePosition](EdgeCollider.md#updateposition)
- [updateRealSize](EdgeCollider.md#updaterealsize)

## Properties

### allowMultiple

• `Readonly` **allowMultiple**: `boolean` = `true`

TRUE if several instances of this component are allowed in the same object.

#### Inherited from

BaseCollider.allowMultiple

#### Defined in

[src/core/Component.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L52)

___

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

BaseCollider.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L29)

___

### colliders

• `Readonly` **colliders**: [`ICollider`](../interfaces/ICollider.md)[] = `[]`

#### Inherited from

BaseCollider.colliders

#### Defined in

[src/component/collider/Collider.ts:24](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L24)

___

### debug

• **debug**: `boolean` = `false`

#### Defined in

[src/component/collider/EdgeCollider.ts:20](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L20)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

BaseCollider.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

BaseCollider.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

BaseCollider.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

BaseCollider.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L35)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

BaseCollider.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L33)

___

### layer

• **layer**: `string`

#### Inherited from

BaseCollider.layer

#### Defined in

[src/component/collider/Collider.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L25)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

BaseCollider.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L48)

___

### offsetX

• **offsetX**: `number` = `0`

#### Defined in

[src/component/collider/EdgeCollider.ts:22](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L22)

___

### offsetY

• **offsetY**: `number` = `0`

#### Defined in

[src/component/collider/EdgeCollider.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L23)

___

### physics

• **physics**: `boolean` = `true`

#### Inherited from

BaseCollider.physics

#### Defined in

[src/component/collider/Collider.ts:26](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L26)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

BaseCollider.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

BaseCollider.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L39)

___

### renderer

• `Protected` **renderer**: `RenderComponent` = `null`

#### Inherited from

BaseCollider.renderer

#### Defined in

[src/component/collider/Collider.ts:22](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L22)

___

### rotation

• **rotation**: [`Rotation`](Rotation.md)

#### Defined in

[src/component/collider/EdgeCollider.ts:24](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L24)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

BaseCollider.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L41)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

BaseCollider.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L43)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateCollider`

#### Inherited from

BaseCollider.updateEvent

#### Defined in

[src/core/Component.ts:181](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L181)

___

### vertexModel

• **vertexModel**: [`Vector2`](Vector2.md)[]

#### Defined in

[src/component/collider/EdgeCollider.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L21)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

BaseCollider.active

#### Defined in

[src/core/Component.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L66)

• `set` **active**(`active`): `void`

TRUE for enabled object, FALSE for disabled object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`

#### Inherited from

BaseCollider.active

#### Defined in

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L71)

## Methods

### addGameObject

▸ **addGameObject**<`T`\>(`gameObjectClass`): `T`

Adds a new game object to the scene.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class |

#### Returns

`T`

The added game object

#### Inherited from

BaseCollider.addGameObject

#### Defined in

[src/core/GameActor.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L110)

▸ **addGameObject**<`T`\>(`gameObjectClass`, `name`): `T`

Adds a new game object to the scene.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class |
| `name` | `string` | The name of the game object |

#### Returns

`T`

The added game object

#### Inherited from

BaseCollider.addGameObject

#### Defined in

[src/core/GameActor.ts:117](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L117)

▸ **addGameObject**<`T`\>(`gameObjectClass`, `options`): `T`

Adds a new game object to the scene.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class |
| `options` | [`InitOptions`](../interfaces/InitOptions.md) | This options will be passed to the init method |

#### Returns

`T`

The added game object

#### Inherited from

BaseCollider.addGameObject

#### Defined in

[src/core/GameActor.ts:124](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L124)

▸ **addGameObject**<`T`\>(`gameObjectClass`, `options?`, `name?`): `T`

Adds a new game object to the scene.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class |
| `options?` | `string` \| [`InitOptions`](../interfaces/InitOptions.md) | [optional] This options will be passed to the init method |
| `name?` | `string` | [optional] The name of the game object |

#### Returns

`T`

The added game object

#### Inherited from

BaseCollider.addGameObject

#### Defined in

[src/core/GameActor.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L132)

___

### collidesWithLayer

▸ **collidesWithLayer**(`layer`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `string` |

#### Returns

`boolean`

#### Inherited from

BaseCollider.collidesWithLayer

#### Defined in

[src/component/collider/Collider.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L45)

___

### destroyGameObject

▸ **destroyGameObject**(`gameObject`): `void`

Destroy the given game object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObject` | [`GameObject`](GameObject.md) | The game object to destory |

#### Returns

`void`

#### Inherited from

BaseCollider.destroyGameObject

#### Defined in

[src/core/GameActor.ts:200](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L200)

___

### findGameObject

▸ **findGameObject**<`T`\>(`gameObjectClass`): `T`

Returns the first game object found for the given class, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class to find |

#### Returns

`T`

The found game object

#### Inherited from

BaseCollider.findGameObject

#### Defined in

[src/core/GameActor.ts:174](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L174)

▸ **findGameObject**<`T`\>(`name`): `T`

Returns the first game object found for the given name, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the game object to find |

#### Returns

`T`

The found game object

#### Inherited from

BaseCollider.findGameObject

#### Defined in

[src/core/GameActor.ts:180](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L180)

___

### findGameObjects

▸ **findGameObjects**(): [`GameObject`](GameObject.md)[]

Returns all the game objects in the scene.

#### Returns

[`GameObject`](GameObject.md)[]

The found game objects

#### Inherited from

BaseCollider.findGameObjects

#### Defined in

[src/core/GameActor.ts:154](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L154)

▸ **findGameObjects**<`T`\>(`gameObjectClass`): `T`[]

Returns a collection of found game objects for the given class

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The game object class to find |

#### Returns

`T`[]

The found game objects

#### Inherited from

BaseCollider.findGameObjects

#### Defined in

[src/core/GameActor.ts:160](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L160)

___

### findGameObjectsByTag

▸ **findGameObjectsByTag**<`T`\>(`tag`): `T`[]

Returns a collection of game objects found for the given tag

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag of the game objects to find |

#### Returns

`T`[]

The found game objects

#### Inherited from

BaseCollider.findGameObjectsByTag

#### Defined in

[src/core/GameActor.ts:192](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L192)

___

### getCollisionWithLayer

▸ **getCollisionWithLayer**(`layer`): [`CollisionData`](../interfaces/CollisionData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `string` |

#### Returns

[`CollisionData`](../interfaces/CollisionData.md)

#### Inherited from

BaseCollider.getCollisionWithLayer

#### Defined in

[src/component/collider/Collider.ts:49](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L49)

___

### getCollisionsWithLayer

▸ **getCollisionsWithLayer**(`layer`): [`CollisionData`](../interfaces/CollisionData.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `string` |

#### Returns

[`CollisionData`](../interfaces/CollisionData.md)[]

#### Inherited from

BaseCollider.getCollisionsWithLayer

#### Defined in

[src/component/collider/Collider.ts:62](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L62)

___

### getComponent

▸ **getComponent**<`T`\>(`componentClass`): `T`

Returns the first component found for the given class, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`T`\> | The class of the component |

#### Returns

`T`

The found component

#### Inherited from

BaseCollider.getComponent

#### Defined in

[src/core/Component.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L122)

▸ **getComponent**<`T`\>(`name`): `T`

Returns the first component found for the given name, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the component |

#### Returns

`T`

The found component

#### Inherited from

BaseCollider.getComponent

#### Defined in

[src/core/Component.ts:128](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L128)

___

### getComponents

▸ **getComponents**(): [`Component`](Component.md)[]

Returns all the components in the game object.

#### Returns

[`Component`](Component.md)[]

The found components

#### Inherited from

BaseCollider.getComponents

#### Defined in

[src/core/Component.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L104)

▸ **getComponents**<`T`\>(`componentClass`): `T`[]

Returns all the components for the given class in the game object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`T`\> | The class of the components |

#### Returns

`T`[]

The found components

#### Inherited from

BaseCollider.getComponents

#### Defined in

[src/core/Component.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L110)

___

### getCurrentScene

▸ **getCurrentScene**<`T`\>(): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Scene`](Scene.md) |

#### Returns

`T`

The current loaded scene

#### Inherited from

BaseCollider.getCurrentScene

#### Defined in

[src/core/Component.ts:89](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L89)

___

### getGameObject

▸ **getGameObject**<`T`\>(): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Returns

`T`

The GameObject to which this component is attached

#### Inherited from

BaseCollider.getGameObject

#### Defined in

[src/core/Component.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L96)

___

### hasComponent

▸ **hasComponent**<`T`\>(`componentClass`): `boolean`

Returns TRUE if the game object has a component for the given class, or FALSE otherwise

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`T`\> | The class of the component to find |

#### Returns

`boolean`

boolean

#### Inherited from

BaseCollider.hasComponent

#### Defined in

[src/core/Component.ts:142](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L142)

▸ **hasComponent**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the component to find |

#### Returns

`boolean`

boolean

#### Inherited from

BaseCollider.hasComponent

#### Defined in

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L147)

___

### init

▸ **init**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EdgeColliderOptions`](../interfaces/EdgeColliderOptions.md) |

#### Returns

`void`

#### Overrides

BaseCollider.init

#### Defined in

[src/component/collider/EdgeCollider.ts:32](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L32)

___

### onActiveChange

▸ **onActiveChange**(): `void`

#### Returns

`void`

#### Inherited from

BaseCollider.onActiveChange

#### Defined in

[src/component/collider/Collider.ts:88](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L88)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

BaseCollider.onDestroy

#### Defined in

[src/component/collider/Collider.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L93)

___

### removeComponent

▸ **removeComponent**(`component`): `void`

Removes the given component in the GameObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `component` | [`Component`](Component.md) | The class of the component to remnove |

#### Returns

`void`

#### Inherited from

BaseCollider.removeComponent

#### Defined in

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

BaseCollider.start

#### Defined in

[src/core/GameActor.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/core/GameActor.ts#L93)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Inherited from

BaseCollider.update

#### Defined in

[src/component/collider/Collider.ts:34](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/Collider.ts#L34)

___

### updateColliders

▸ **updateColliders**(): `void`

#### Returns

`void`

#### Overrides

BaseCollider.updateColliders

#### Defined in

[src/component/collider/EdgeCollider.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L104)

___

### updatePosition

▸ **updatePosition**(): `void`

#### Returns

`void`

#### Overrides

BaseCollider.updatePosition

#### Defined in

[src/component/collider/EdgeCollider.ts:85](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L85)

___

### updateRealSize

▸ **updateRealSize**(): `void`

#### Returns

`void`

#### Overrides

BaseCollider.updateRealSize

#### Defined in

[src/component/collider/EdgeCollider.ts:72](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/6176278/src/component/collider/EdgeCollider.ts#L72)
