[angry-pixel](../README.md) / [Exports](../modules.md) / TiledTilemapRenderer

# Class: TiledTilemapRenderer

## Hierarchy

- `RenderComponent`

  ↳ **`TiledTilemapRenderer`**

## Implements

- [`ITilemapRenderer`](../interfaces/ITilemapRenderer.md)

## Table of contents

### Properties

- [allowMultiple](TiledTilemapRenderer.md#allowmultiple)
- [alpha](TiledTilemapRenderer.md#alpha)
- [assetManager](TiledTilemapRenderer.md#assetmanager)
- [domManager](TiledTilemapRenderer.md#dommanager)
- [gameConfig](TiledTilemapRenderer.md#gameconfig)
- [gameObject](TiledTilemapRenderer.md#gameobject)
- [gameObjectManager](TiledTilemapRenderer.md#gameobjectmanager)
- [height](TiledTilemapRenderer.md#height)
- [inputManager](TiledTilemapRenderer.md#inputmanager)
- [name](TiledTilemapRenderer.md#name)
- [orientation](TiledTilemapRenderer.md#orientation)
- [physicsManager](TiledTilemapRenderer.md#physicsmanager)
- [realHeight](TiledTilemapRenderer.md#realheight)
- [realWidth](TiledTilemapRenderer.md#realwidth)
- [renderManager](TiledTilemapRenderer.md#rendermanager)
- [sceneManager](TiledTilemapRenderer.md#scenemanager)
- [tileHeight](TiledTilemapRenderer.md#tileheight)
- [tileWidth](TiledTilemapRenderer.md#tilewidth)
- [tiles](TiledTilemapRenderer.md#tiles)
- [timeManager](TiledTilemapRenderer.md#timemanager)
- [tintColor](TiledTilemapRenderer.md#tintcolor)
- [updateEvent](TiledTilemapRenderer.md#updateevent)
- [width](TiledTilemapRenderer.md#width)

### Accessors

- [active](TiledTilemapRenderer.md#active)

### Methods

- [addGameObject](TiledTilemapRenderer.md#addgameobject)
- [destroyGameObject](TiledTilemapRenderer.md#destroygameobject)
- [findGameObject](TiledTilemapRenderer.md#findgameobject)
- [findGameObjects](TiledTilemapRenderer.md#findgameobjects)
- [findGameObjectsByTag](TiledTilemapRenderer.md#findgameobjectsbytag)
- [getComponent](TiledTilemapRenderer.md#getcomponent)
- [getComponents](TiledTilemapRenderer.md#getcomponents)
- [getCurrentScene](TiledTilemapRenderer.md#getcurrentscene)
- [getGameObject](TiledTilemapRenderer.md#getgameobject)
- [hasComponent](TiledTilemapRenderer.md#hascomponent)
- [init](TiledTilemapRenderer.md#init)
- [onActiveChange](TiledTilemapRenderer.md#onactivechange)
- [onDestroy](TiledTilemapRenderer.md#ondestroy)
- [removeComponent](TiledTilemapRenderer.md#removecomponent)
- [start](TiledTilemapRenderer.md#start)
- [update](TiledTilemapRenderer.md#update)

## Properties

### allowMultiple

• `Readonly` **allowMultiple**: `boolean` = `true`

TRUE if several instances of this component are allowed in the same object.

#### Inherited from

RenderComponent.allowMultiple

#### Defined in

[src/core/Component.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L52)

___

### alpha

• **alpha**: `number`

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L25)

___

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

RenderComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L29)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

RenderComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

RenderComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

RenderComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

RenderComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L35)

___

### height

• **height**: `number`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[height](../interfaces/ITilemapRenderer.md#height)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:22](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L22)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

RenderComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L33)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

RenderComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L48)

___

### orientation

• **orientation**: [`TilemapOrientation`](../enums/TilemapOrientation.md)

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[orientation](../interfaces/ITilemapRenderer.md#orientation)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L23)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

RenderComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L37)

___

### realHeight

• **realHeight**: `number`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[realHeight](../interfaces/ITilemapRenderer.md#realheight)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L39)

___

### realWidth

• **realWidth**: `number`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[realWidth](../interfaces/ITilemapRenderer.md#realwidth)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L38)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

RenderComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

RenderComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L41)

___

### tileHeight

• **tileHeight**: `number`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[tileHeight](../interfaces/ITilemapRenderer.md#tileheight)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:20](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L20)

___

### tileWidth

• **tileWidth**: `number`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[tileWidth](../interfaces/ITilemapRenderer.md#tilewidth)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:19](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L19)

___

### tiles

• **tiles**: `number`[] = `[]`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[tiles](../interfaces/ITilemapRenderer.md#tiles)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:18](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L18)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

RenderComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L43)

___

### tintColor

• **tintColor**: `string`

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:24](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L24)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateRender`

#### Inherited from

RenderComponent.updateEvent

#### Defined in

[src/core/Component.ts:204](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L204)

___

### width

• **width**: `number`

#### Implementation of

[ITilemapRenderer](../interfaces/ITilemapRenderer.md).[width](../interfaces/ITilemapRenderer.md#width)

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L21)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

RenderComponent.active

#### Defined in

[src/core/Component.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L66)

• `set` **active**(`active`): `void`

TRUE for enabled object, FALSE for disabled object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`

#### Inherited from

RenderComponent.active

#### Defined in

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L71)

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

RenderComponent.addGameObject

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

RenderComponent.addGameObject

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

RenderComponent.addGameObject

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

RenderComponent.addGameObject

#### Defined in

[src/core/GameActor.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L132)

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

RenderComponent.destroyGameObject

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

RenderComponent.findGameObject

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

RenderComponent.findGameObject

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

RenderComponent.findGameObjects

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

RenderComponent.findGameObjects

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

RenderComponent.findGameObjectsByTag

#### Defined in

[src/core/GameActor.ts:192](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L192)

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

RenderComponent.getComponent

#### Defined in

[src/core/Component.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L122)

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

RenderComponent.getComponent

#### Defined in

[src/core/Component.ts:128](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L128)

___

### getComponents

▸ **getComponents**(): [`Component`](Component.md)[]

Returns all the components in the game object.

#### Returns

[`Component`](Component.md)[]

The found components

#### Inherited from

RenderComponent.getComponents

#### Defined in

[src/core/Component.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L104)

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

RenderComponent.getComponents

#### Defined in

[src/core/Component.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L110)

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

RenderComponent.getCurrentScene

#### Defined in

[src/core/Component.ts:89](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L89)

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

RenderComponent.getGameObject

#### Defined in

[src/core/Component.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L96)

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

RenderComponent.hasComponent

#### Defined in

[src/core/Component.ts:142](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L142)

▸ **hasComponent**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the component to find |

#### Returns

`boolean`

boolean

#### Inherited from

RenderComponent.hasComponent

#### Defined in

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L147)

___

### init

▸ **init**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`TiledTilemapRendererOptions`](../interfaces/TiledTilemapRendererOptions.md) |

#### Returns

`void`

#### Overrides

RenderComponent.init

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L43)

___

### onActiveChange

▸ **onActiveChange**(): `void`

This method is called when the active state changes.

#### Returns

`void`

#### Inherited from

RenderComponent.onActiveChange

#### Defined in

[src/core/Component.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L82)

___

### onDestroy

▸ **onDestroy**(): `void`

This method is called before destruction.

#### Returns

`void`

#### Inherited from

RenderComponent.onDestroy

#### Defined in

[src/core/GameActor.ts:103](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L103)

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

RenderComponent.removeComponent

#### Defined in

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

RenderComponent.start

#### Defined in

[src/core/GameActor.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L93)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

RenderComponent.update

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:68](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/TiledTilemapRenderer.ts#L68)
