[angry-pixel](../README.md) / [Exports](../modules.md) / RigidBody

# Class: RigidBody

The RigidBody component puts the object under simulation of the physics engine, where it will interact with other objects that have a RigidBody.
The RigidBody component requires the object to have at least one collider.

There are three types of bodies:
- Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
- Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
- Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.

**`Example`**

```js
 const body = this.addComponent(RigidBody, {
   rigidBodyType: RigidBodyType.Dynamic,
   gravity: 10
 });
 body.velocity = 200;
```

**`Example`**

```js
 const body = this.addComponent(RigidBody, {
   rigidBodyType: RigidBodyType.Kinematic,
 });
 body.velocity = 200;
```

**`Example`**

```js
 const body = this.addComponent(RigidBody, {
   rigidBodyType: RigidBodyType.Static,
 });
```

## Hierarchy

- `EngineComponent`

  ↳ **`RigidBody`**

## Table of contents

### Properties

- [assetManager](RigidBody.md#assetmanager)
- [domManager](RigidBody.md#dommanager)
- [gameConfig](RigidBody.md#gameconfig)
- [gameObject](RigidBody.md#gameobject)
- [gameObjectManager](RigidBody.md#gameobjectmanager)
- [inputManager](RigidBody.md#inputmanager)
- [name](RigidBody.md#name)
- [physicsManager](RigidBody.md#physicsmanager)
- [renderManager](RigidBody.md#rendermanager)
- [sceneManager](RigidBody.md#scenemanager)
- [timeManager](RigidBody.md#timemanager)
- [updateEvent](RigidBody.md#updateevent)

### Accessors

- [active](RigidBody.md#active)
- [gravity](RigidBody.md#gravity)
- [rigidBodyType](RigidBody.md#rigidbodytype)
- [velocity](RigidBody.md#velocity)

### Methods

- [addGameObject](RigidBody.md#addgameobject)
- [destroyGameObject](RigidBody.md#destroygameobject)
- [findGameObject](RigidBody.md#findgameobject)
- [findGameObjects](RigidBody.md#findgameobjects)
- [findGameObjectsByTag](RigidBody.md#findgameobjectsbytag)
- [getComponent](RigidBody.md#getcomponent)
- [getComponents](RigidBody.md#getcomponents)
- [getCurrentScene](RigidBody.md#getcurrentscene)
- [getGameObject](RigidBody.md#getgameobject)
- [hasComponent](RigidBody.md#hascomponent)
- [init](RigidBody.md#init)
- [onActiveChange](RigidBody.md#onactivechange)
- [onDestroy](RigidBody.md#ondestroy)
- [removeComponent](RigidBody.md#removecomponent)
- [start](RigidBody.md#start)
- [update](RigidBody.md#update)

## Properties

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

EngineComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L29)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

EngineComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

EngineComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

EngineComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

EngineComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L35)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

EngineComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L33)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

EngineComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L48)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

EngineComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

EngineComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

EngineComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L41)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

EngineComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L43)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateEngine`

#### Inherited from

EngineComponent.updateEvent

#### Defined in

[src/core/Component.ts:176](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L176)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

EngineComponent.active

#### Defined in

[src/core/Component.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L66)

• `set` **active**(`active`): `void`

TRUE for enabled object, FALSE for disabled object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`

#### Inherited from

EngineComponent.active

#### Defined in

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L71)

___

### gravity

• `get` **gravity**(): `number`

Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies

#### Returns

`number`

#### Defined in

[src/component/RigidBody.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L71)

• `set` **gravity**(`gravity`): `void`

Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies

#### Parameters

| Name | Type |
| :------ | :------ |
| `gravity` | `number` |

#### Returns

`void`

#### Defined in

[src/component/RigidBody.ts:76](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L76)

___

### rigidBodyType

• `get` **rigidBodyType**(): [`RigidBodyType`](../enums/RigidBodyType.md)

The type determines how it will respond to physics and collisions.
  - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
  - Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
  - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.

#### Returns

[`RigidBodyType`](../enums/RigidBodyType.md)

#### Defined in

[src/component/RigidBody.ts:86](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L86)

___

### velocity

• `get` **velocity**(): [`Vector2`](Vector2.md)

Velocity applied to the x-axis and y-axis expressed in pixels per second.

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/component/RigidBody.ts:61](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L61)

• `set` **velocity**(`velocity`): `void`

Velocity applied to the x-axis and y-axis expressed in pixels per second.

#### Parameters

| Name | Type |
| :------ | :------ |
| `velocity` | [`Vector2`](Vector2.md) |

#### Returns

`void`

#### Defined in

[src/component/RigidBody.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L66)

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

EngineComponent.addGameObject

#### Defined in

[src/core/GameActor.ts:111](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L111)

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

EngineComponent.addGameObject

#### Defined in

[src/core/GameActor.ts:118](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L118)

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

EngineComponent.addGameObject

#### Defined in

[src/core/GameActor.ts:125](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L125)

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

EngineComponent.addGameObject

#### Defined in

[src/core/GameActor.ts:133](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L133)

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

EngineComponent.destroyGameObject

#### Defined in

[src/core/GameActor.ts:201](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L201)

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

EngineComponent.findGameObject

#### Defined in

[src/core/GameActor.ts:175](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L175)

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

EngineComponent.findGameObject

#### Defined in

[src/core/GameActor.ts:181](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L181)

___

### findGameObjects

▸ **findGameObjects**(): [`GameObject`](GameObject.md)[]

Returns all the game objects in the scene.

#### Returns

[`GameObject`](GameObject.md)[]

The found game objects

#### Inherited from

EngineComponent.findGameObjects

#### Defined in

[src/core/GameActor.ts:155](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L155)

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

EngineComponent.findGameObjects

#### Defined in

[src/core/GameActor.ts:161](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L161)

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

EngineComponent.findGameObjectsByTag

#### Defined in

[src/core/GameActor.ts:193](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L193)

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

EngineComponent.getComponent

#### Defined in

[src/core/Component.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L122)

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

EngineComponent.getComponent

#### Defined in

[src/core/Component.ts:128](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L128)

___

### getComponents

▸ **getComponents**(): [`Component`](Component.md)[]

Returns all the components in the game object.

#### Returns

[`Component`](Component.md)[]

The found components

#### Inherited from

EngineComponent.getComponents

#### Defined in

[src/core/Component.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L104)

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

EngineComponent.getComponents

#### Defined in

[src/core/Component.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L110)

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

EngineComponent.getCurrentScene

#### Defined in

[src/core/Component.ts:89](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L89)

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

EngineComponent.getGameObject

#### Defined in

[src/core/Component.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L96)

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

EngineComponent.hasComponent

#### Defined in

[src/core/Component.ts:142](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L142)

▸ **hasComponent**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the component to find |

#### Returns

`boolean`

boolean

#### Inherited from

EngineComponent.hasComponent

#### Defined in

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L147)

___

### init

▸ **init**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`RigidBodyOptions`](../interfaces/RigidBodyOptions.md) |

#### Returns

`void`

#### Overrides

EngineComponent.init

#### Defined in

[src/component/RigidBody.ts:90](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L90)

___

### onActiveChange

▸ **onActiveChange**(): `void`

#### Returns

`void`

#### Overrides

EngineComponent.onActiveChange

#### Defined in

[src/component/RigidBody.ts:123](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L123)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Overrides

EngineComponent.onDestroy

#### Defined in

[src/component/RigidBody.ts:127](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L127)

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

EngineComponent.removeComponent

#### Defined in

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

EngineComponent.start

#### Defined in

[src/core/GameActor.ts:94](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L94)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

EngineComponent.update

#### Defined in

[src/component/RigidBody.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L104)
