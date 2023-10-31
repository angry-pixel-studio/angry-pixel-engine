[angry-pixel](../README.md) / [Exports](../modules.md) / GameCamera

# Class: GameCamera

Base class for all objects in the scene.

**`Example`**

```js
class Player extends GameObject {
  init(options) {
    this.tag = "Tag";
    this.layer = "Default";
  }
  start() {
    // executed in the first available frame
  }
  update() {
    // executed on every frame
  }
}
```

**`Example`**

```ts
class Player extends GameObject {
  protected init(options?: InitOptions): void {
    this.tag = "Tag";
    this.layer = "Default";
  }
  protected start(): void {
    // executed in the first available frame
  }
  protected update(): void {
    // executed on every frame
  }
}
```

## Hierarchy

- [`GameObject`](GameObject.md)

  ↳ **`GameCamera`**

## Table of contents

### Properties

- [assetManager](GameCamera.md#assetmanager)
- [camera](GameCamera.md#camera)
- [domManager](GameCamera.md#dommanager)
- [gameConfig](GameCamera.md#gameconfig)
- [gameObjectManager](GameCamera.md#gameobjectmanager)
- [id](GameCamera.md#id)
- [inputManager](GameCamera.md#inputmanager)
- [keep](GameCamera.md#keep)
- [layer](GameCamera.md#layer)
- [name](GameCamera.md#name)
- [physicsManager](GameCamera.md#physicsmanager)
- [renderManager](GameCamera.md#rendermanager)
- [sceneManager](GameCamera.md#scenemanager)
- [tag](GameCamera.md#tag)
- [timeManager](GameCamera.md#timemanager)
- [ui](GameCamera.md#ui)

### Accessors

- [active](GameCamera.md#active)
- [depth](GameCamera.md#depth)
- [layers](GameCamera.md#layers)
- [parent](GameCamera.md#parent)
- [rigidBody](GameCamera.md#rigidbody)
- [transform](GameCamera.md#transform)
- [viewportRect](GameCamera.md#viewportrect)
- [worldSpaceRect](GameCamera.md#worldspacerect)
- [zoom](GameCamera.md#zoom)

### Methods

- [addChild](GameCamera.md#addchild)
- [addComponent](GameCamera.md#addcomponent)
- [addGameObject](GameCamera.md#addgameobject)
- [addLayer](GameCamera.md#addlayer)
- [destroyChildren](GameCamera.md#destroychildren)
- [destroyGameObject](GameCamera.md#destroygameobject)
- [findGameObject](GameCamera.md#findgameobject)
- [findGameObjects](GameCamera.md#findgameobjects)
- [findGameObjectsByTag](GameCamera.md#findgameobjectsbytag)
- [getChild](GameCamera.md#getchild)
- [getChildren](GameCamera.md#getchildren)
- [getComponent](GameCamera.md#getcomponent)
- [getComponents](GameCamera.md#getcomponents)
- [getCurrentScene](GameCamera.md#getcurrentscene)
- [hasComponent](GameCamera.md#hascomponent)
- [init](GameCamera.md#init)
- [onActiveChange](GameCamera.md#onactivechange)
- [onDestroy](GameCamera.md#ondestroy)
- [removeComponent](GameCamera.md#removecomponent)
- [start](GameCamera.md#start)
- [update](GameCamera.md#update)

## Properties

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

[GameObject](GameObject.md).[assetManager](GameObject.md#assetmanager)

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L29)

___

### camera

• **camera**: [`Camera`](Camera.md)

#### Defined in

[src/gameObject/GameCamera.ts:6](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L6)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

[GameObject](GameObject.md).[domManager](GameObject.md#dommanager)

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

[GameObject](GameObject.md).[gameConfig](GameObject.md#gameconfig)

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L45)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

[GameObject](GameObject.md).[gameObjectManager](GameObject.md#gameobjectmanager)

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L35)

___

### id

• `Readonly` **id**: `number`

Id automatically assigned at the time of instantiation.

#### Inherited from

[GameObject](GameObject.md).[id](GameObject.md#id)

#### Defined in

[src/core/GameObject.ts:56](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L56)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

[GameObject](GameObject.md).[inputManager](GameObject.md#inputmanager)

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L33)

___

### keep

• **keep**: `boolean` = `false`

TRUE to prevent the object from being automatically destroyed when changing the scene. Default value is FALSE.

#### Inherited from

[GameObject](GameObject.md).[keep](GameObject.md#keep)

#### Defined in

[src/core/GameObject.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L66)

___

### layer

• **layer**: `string` = `LAYER_DEFAULT`

Layer used for rendering and physics. Default value is "Default".

#### Inherited from

[GameObject](GameObject.md).[layer](GameObject.md#layer)

#### Defined in

[src/core/GameObject.ts:62](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L62)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

[GameObject](GameObject.md).[name](GameObject.md#name)

#### Defined in

[src/core/GameObject.ts:58](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L58)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

[GameObject](GameObject.md).[physicsManager](GameObject.md#physicsmanager)

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

[GameObject](GameObject.md).[renderManager](GameObject.md#rendermanager)

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

[GameObject](GameObject.md).[sceneManager](GameObject.md#scenemanager)

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L41)

___

### tag

• **tag**: `string`

Tag used to group objects and optimize their retrieval.

#### Inherited from

[GameObject](GameObject.md).[tag](GameObject.md#tag)

#### Defined in

[src/core/GameObject.ts:60](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L60)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

[GameObject](GameObject.md).[timeManager](GameObject.md#timemanager)

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L43)

___

### ui

• **ui**: `boolean` = `false`

TRUE for UI objects. Default value is FALSE. Renders the object outside the game world coordinates.

#### Inherited from

[GameObject](GameObject.md).[ui](GameObject.md#ui)

#### Defined in

[src/core/GameObject.ts:64](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L64)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

GameObject.active

#### Defined in

[src/core/GameObject.ts:92](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L92)

• `set` **active**(`active`): `void`

TRUE for enabled object, FALSE for disabled object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`

#### Inherited from

GameObject.active

#### Defined in

[src/core/GameObject.ts:97](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L97)

___

### depth

• `get` **depth**(): `number`

#### Returns

`number`

#### Defined in

[src/gameObject/GameCamera.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L25)

• `set` **depth**(`depth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | `number` |

#### Returns

`void`

#### Defined in

[src/gameObject/GameCamera.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L21)

___

### layers

• `get` **layers**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/gameObject/GameCamera.ts:17](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L17)

• `set` **layers**(`layers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layers` | `string`[] |

#### Returns

`void`

#### Defined in

[src/gameObject/GameCamera.ts:13](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L13)

___

### parent

• `get` **parent**(): [`GameObject`](GameObject.md)

Parent game object. A child object depends on the parent's Transform.

#### Returns

[`GameObject`](GameObject.md)

#### Inherited from

GameObject.parent

#### Defined in

[src/core/GameObject.ts:108](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L108)

• `set` **parent**(`parent`): `void`

Parent game object. A child object depends on the parent's Transform.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`GameObject`](GameObject.md) |

#### Returns

`void`

#### Inherited from

GameObject.parent

#### Defined in

[src/core/GameObject.ts:113](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L113)

___

### rigidBody

• `get` **rigidBody**(): [`RigidBody`](RigidBody.md)

RigidBody Component (if any)

#### Returns

[`RigidBody`](RigidBody.md)

#### Inherited from

GameObject.rigidBody

#### Defined in

[src/core/GameObject.ts:140](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L140)

___

### transform

• `get` **transform**(): [`Transform`](Transform.md)

Transform component added natively in the object

#### Returns

[`Transform`](Transform.md)

#### Inherited from

GameObject.transform

#### Defined in

[src/core/GameObject.ts:135](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L135)

___

### viewportRect

• `get` **viewportRect**(): [`Rectangle`](Rectangle.md)

#### Returns

[`Rectangle`](Rectangle.md)

#### Defined in

[src/gameObject/GameCamera.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L41)

___

### worldSpaceRect

• `get` **worldSpaceRect**(): [`Rectangle`](Rectangle.md)

#### Returns

[`Rectangle`](Rectangle.md)

#### Defined in

[src/gameObject/GameCamera.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L37)

___

### zoom

• `get` **zoom**(): `number`

#### Returns

`number`

#### Defined in

[src/gameObject/GameCamera.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L33)

• `set` **zoom**(`zoom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoom` | `number` |

#### Returns

`void`

#### Defined in

[src/gameObject/GameCamera.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L29)

## Methods

### addChild

▸ **addChild**<`T`\>(`gameObjectClass`, `options?`, `name?`): `T`

Add a child game object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The class of the child game object |
| `options?` | [`InitOptions`](../interfaces/InitOptions.md) | [optional] This options will be passed to the init method |
| `name?` | `string` | [optional] The name of the game object |

#### Returns

`T`

The added child game object

#### Inherited from

[GameObject](GameObject.md).[addChild](GameObject.md#addchild)

#### Defined in

[src/core/GameObject.ts:296](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L296)

___

### addComponent

▸ **addComponent**<`ComponentType`\>(`componentClass`): `ComponentType`

Add a component to the game obejct

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentType` | extends [`Component`](Component.md) = [`Component`](Component.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`ComponentType`\> | The class of the component |

#### Returns

`ComponentType`

The added component

#### Inherited from

[GameObject](GameObject.md).[addComponent](GameObject.md#addcomponent)

#### Defined in

[src/core/GameObject.ts:163](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L163)

▸ **addComponent**<`ComponentType`, `OptionsType`\>(`componentClass`, `options`): `ComponentType`

Add a component to the game obejct

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentType` | extends [`Component`](Component.md) = [`Component`](Component.md) |
| `OptionsType` | extends [`InitOptions`](../interfaces/InitOptions.md) = [`InitOptions`](../interfaces/InitOptions.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`ComponentType`\> | The class of the component |
| `options` | `OptionsType` | The options passed to the init method of the component |

#### Returns

`ComponentType`

The added component

#### Inherited from

[GameObject](GameObject.md).[addComponent](GameObject.md#addcomponent)

#### Defined in

[src/core/GameObject.ts:172](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L172)

▸ **addComponent**<`ComponentType`\>(`componentClass`, `name`): `ComponentType`

Add a component to the game obejct

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentType` | extends [`Component`](Component.md) = [`Component`](Component.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`ComponentType`\> | The class of the component |
| `name` | `string` | The name of the component |

#### Returns

`ComponentType`

The added component

#### Inherited from

[GameObject](GameObject.md).[addComponent](GameObject.md#addcomponent)

#### Defined in

[src/core/GameObject.ts:182](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L182)

▸ **addComponent**<`ComponentType`, `OptionsType`\>(`componentClass`, `options`, `name`): `ComponentType`

Add a component to the game obejct

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentType` | extends [`Component`](Component.md) = [`Component`](Component.md) |
| `OptionsType` | extends [`InitOptions`](../interfaces/InitOptions.md) = [`InitOptions`](../interfaces/InitOptions.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentClass` | `ComponentClass`<`ComponentType`\> | The class of the component |
| `options` | `OptionsType` | The options passed to the init method of the component |
| `name` | `string` | The name of the component |

#### Returns

`ComponentType`

The added component

#### Inherited from

[GameObject](GameObject.md).[addComponent](GameObject.md#addcomponent)

#### Defined in

[src/core/GameObject.ts:193](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L193)

___

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

[GameObject](GameObject.md).[addGameObject](GameObject.md#addgameobject)

#### Defined in

[src/core/GameActor.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L110)

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

[GameObject](GameObject.md).[addGameObject](GameObject.md#addgameobject)

#### Defined in

[src/core/GameActor.ts:117](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L117)

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

[GameObject](GameObject.md).[addGameObject](GameObject.md#addgameobject)

#### Defined in

[src/core/GameActor.ts:124](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L124)

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

[GameObject](GameObject.md).[addGameObject](GameObject.md#addgameobject)

#### Defined in

[src/core/GameActor.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L132)

___

### addLayer

▸ **addLayer**(`layer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `string` |

#### Returns

`void`

#### Defined in

[src/gameObject/GameCamera.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L45)

___

### destroyChildren

▸ **destroyChildren**(): `void`

Destroy all the children game objects

#### Returns

`void`

#### Inherited from

[GameObject](GameObject.md).[destroyChildren](GameObject.md#destroychildren)

#### Defined in

[src/core/GameObject.ts:337](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L337)

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

[GameObject](GameObject.md).[destroyGameObject](GameObject.md#destroygameobject)

#### Defined in

[src/core/GameActor.ts:200](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L200)

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

[GameObject](GameObject.md).[findGameObject](GameObject.md#findgameobject)

#### Defined in

[src/core/GameActor.ts:174](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L174)

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

[GameObject](GameObject.md).[findGameObject](GameObject.md#findgameobject)

#### Defined in

[src/core/GameActor.ts:180](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L180)

___

### findGameObjects

▸ **findGameObjects**(): [`GameObject`](GameObject.md)[]

Returns all the game objects in the scene.

#### Returns

[`GameObject`](GameObject.md)[]

The found game objects

#### Inherited from

[GameObject](GameObject.md).[findGameObjects](GameObject.md#findgameobjects)

#### Defined in

[src/core/GameActor.ts:154](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L154)

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

[GameObject](GameObject.md).[findGameObjects](GameObject.md#findgameobjects)

#### Defined in

[src/core/GameActor.ts:160](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L160)

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

[GameObject](GameObject.md).[findGameObjectsByTag](GameObject.md#findgameobjectsbytag)

#### Defined in

[src/core/GameActor.ts:192](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L192)

___

### getChild

▸ **getChild**<`T`\>(`gameObjectClass`): `T`

Returns the first child found for the given class, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gameObjectClass` | `GameObjectClass`<`T`\> | The class of the child game object to find |

#### Returns

`T`

The found child game object

#### Inherited from

[GameObject](GameObject.md).[getChild](GameObject.md#getchild)

#### Defined in

[src/core/GameObject.ts:321](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L321)

▸ **getChild**<`T`\>(`name`): `T`

Returns the first child found for the given name, or undefined otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the child game object to find |

#### Returns

`T`

The found child game object

#### Inherited from

[GameObject](GameObject.md).[getChild](GameObject.md#getchild)

#### Defined in

[src/core/GameObject.ts:327](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L327)

___

### getChildren

▸ **getChildren**<`T`\>(): `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](GameObject.md) |

#### Returns

`T`[]

The children game objects

#### Inherited from

[GameObject](GameObject.md).[getChildren](GameObject.md#getchildren)

#### Defined in

[src/core/GameObject.ts:312](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L312)

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

[GameObject](GameObject.md).[getComponent](GameObject.md#getcomponent)

#### Defined in

[src/core/GameObject.ts:248](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L248)

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

[GameObject](GameObject.md).[getComponent](GameObject.md#getcomponent)

#### Defined in

[src/core/GameObject.ts:254](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L254)

___

### getComponents

▸ **getComponents**(): [`Component`](Component.md)[]

Returns all the components in the game object.

#### Returns

[`Component`](Component.md)[]

The found components

#### Inherited from

[GameObject](GameObject.md).[getComponents](GameObject.md#getcomponents)

#### Defined in

[src/core/GameObject.ts:226](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L226)

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

[GameObject](GameObject.md).[getComponents](GameObject.md#getcomponents)

#### Defined in

[src/core/GameObject.ts:232](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L232)

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

[GameObject](GameObject.md).[getCurrentScene](GameObject.md#getcurrentscene)

#### Defined in

[src/core/GameObject.ts:154](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L154)

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

[GameObject](GameObject.md).[hasComponent](GameObject.md#hascomponent)

#### Defined in

[src/core/GameObject.ts:268](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L268)

▸ **hasComponent**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the component to find |

#### Returns

`boolean`

boolean

#### Inherited from

[GameObject](GameObject.md).[hasComponent](GameObject.md#hascomponent)

#### Defined in

[src/core/GameObject.ts:273](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L273)

___

### init

▸ **init**(): `void`

This method is called after instantiation (recommended for the creation of game objects).

#### Returns

`void`

#### Overrides

[GameObject](GameObject.md).[init](GameObject.md#init)

#### Defined in

[src/gameObject/GameCamera.ts:8](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/gameObject/GameCamera.ts#L8)

___

### onActiveChange

▸ **onActiveChange**(): `void`

This method is called when the active state changes.

#### Returns

`void`

#### Inherited from

[GameObject](GameObject.md).[onActiveChange](GameObject.md#onactivechange)

#### Defined in

[src/core/GameObject.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L147)

___

### onDestroy

▸ **onDestroy**(): `void`

This method is called before destruction.

#### Returns

`void`

#### Inherited from

[GameObject](GameObject.md).[onDestroy](GameObject.md#ondestroy)

#### Defined in

[src/core/GameActor.ts:103](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L103)

___

### removeComponent

▸ **removeComponent**(`component`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | [`Component`](Component.md) |

#### Returns

`void`

#### Inherited from

[GameObject](GameObject.md).[removeComponent](GameObject.md#removecomponent)

#### Defined in

[src/core/GameObject.ts:280](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameObject.ts#L280)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

[GameObject](GameObject.md).[start](GameObject.md#start)

#### Defined in

[src/core/GameActor.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L93)

___

### update

▸ **update**(): `void`

This method is called on every frame.

#### Returns

`void`

#### Inherited from

[GameObject](GameObject.md).[update](GameObject.md#update)

#### Defined in

[src/core/GameActor.ts:98](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L98)
