[angry-pixel](../README.md) / [Exports](../modules.md) / TiledTilemapRenderer

# Class: TiledTilemapRenderer

The TiledTilemapRenderer component allows you to render a tile map exported from the Tiled application,
using an instance of the TileSet object.

**`Example`**

```js
import TilemapData from "export.json";

this.addComponent(TiledTilemapRenderer, {
  tileset: {
    image: this.assetManager.getImage("image.png"),
    width: 3,
    tileWidth: 16,
    tileHeight: 16,
  }
  tiledData: TilemapData,
  tilemapLayer: "Layer1",
  tileWidth: 16,
  tileHeight: 16,
});
```

**`Example`**

```js
import TilemapData from "export.json";

this.addComponent(TilemapRenderer, {
  tileset: {
    image: this.assetManager.getImage("image.png"),
    width: 3,
    tileWidth: 16,
    tileHeight: 16,
    margin: new Vector2(0, 0),
    spacing: new Vector2(0, 0),
  }
  tiledData: TilemapData,
  tilemapLayer: "Layer1",
  tileWidth: 16,
  tileHeight: 16,
  layer: "Tilemap",
  orientation: TilemapOrientation.Center,
  smooth: false,
});
```

## Hierarchy

- `RenderComponent`

  ↳ **`TiledTilemapRenderer`**

## Implements

- `ITilemapRenderer`

## Table of contents

### Properties

- [allowMultiple](TiledTilemapRenderer.md#allowmultiple)
- [assetManager](TiledTilemapRenderer.md#assetmanager)
- [domManager](TiledTilemapRenderer.md#dommanager)
- [gameConfig](TiledTilemapRenderer.md#gameconfig)
- [gameObject](TiledTilemapRenderer.md#gameobject)
- [gameObjectManager](TiledTilemapRenderer.md#gameobjectmanager)
- [height](TiledTilemapRenderer.md#height)
- [inputManager](TiledTilemapRenderer.md#inputmanager)
- [name](TiledTilemapRenderer.md#name)
- [opacity](TiledTilemapRenderer.md#opacity)
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

[src/core/Component.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L52)

___

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

RenderComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L29)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

RenderComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

RenderComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

RenderComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

RenderComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L35)

___

### height

• `Readonly` **height**: `number`

The height of the tilemap in tiles (this is calculated by the component)

#### Implementation of

ITilemapRenderer.height

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L93)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

RenderComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L33)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

RenderComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L48)

___

### opacity

• **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:99](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L99)

___

### orientation

• **orientation**: [`TilemapOrientation`](../enums/TilemapOrientation.md)

Direction in which the tilemap will be rendered (default value TilemapOrientation.Center)

#### Implementation of

ITilemapRenderer.orientation

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:95](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L95)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

RenderComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L37)

___

### realHeight

• `Readonly` **realHeight**: `number`

Tilemap height in pixels (this is calculated by the component)

#### Implementation of

ITilemapRenderer.realHeight

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:109](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L109)

___

### realWidth

• `Readonly` **realWidth**: `number`

Tilemap width in pixels (this is calculated by the component)

#### Implementation of

ITilemapRenderer.realWidth

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L104)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

RenderComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

RenderComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L41)

___

### tileHeight

• **tileHeight**: `number`

The height of the tile to render in pixels

#### Implementation of

ITilemapRenderer.tileHeight

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:83](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L83)

___

### tileWidth

• **tileWidth**: `number`

The width of the tile to render in pixels

#### Implementation of

ITilemapRenderer.tileWidth

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:81](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L81)

___

### tiles

• `Readonly` **tiles**: `number`[] = `[]`

Id of tiles separated by commas. The ids start at 1, and increment from left to right,
from top to bottom. ID 0 (zero) represents a space with no tile.

#### Implementation of

ITilemapRenderer.tiles

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:79](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L79)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

RenderComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L43)

___

### tintColor

• **tintColor**: `string`

Define a color for tinting the tiles

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:97](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L97)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateRender`

#### Inherited from

RenderComponent.updateEvent

#### Defined in

[src/core/Component.ts:204](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L204)

___

### width

• `Readonly` **width**: `number`

The width of the tilemap in tiles (this is calculated by the component)

#### Implementation of

ITilemapRenderer.width

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:88](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L88)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

RenderComponent.active

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

RenderComponent.active

#### Defined in

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L71)

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

RenderComponent.addGameObject

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

RenderComponent.addGameObject

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

RenderComponent.addGameObject

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

RenderComponent.destroyGameObject

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

RenderComponent.findGameObject

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

RenderComponent.findGameObject

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

RenderComponent.findGameObjects

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

RenderComponent.findGameObjects

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

RenderComponent.findGameObjectsByTag

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

RenderComponent.getComponent

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

RenderComponent.getComponent

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

RenderComponent.getComponents

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

RenderComponent.getComponents

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

RenderComponent.getCurrentScene

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

RenderComponent.getGameObject

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

RenderComponent.hasComponent

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

RenderComponent.hasComponent

#### Defined in

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L147)

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

[src/component/rendering/TiledTilemapRenderer.ts:124](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L124)

___

### onActiveChange

▸ **onActiveChange**(): `void`

This method is called when the active state changes.

#### Returns

`void`

#### Inherited from

RenderComponent.onActiveChange

#### Defined in

[src/core/Component.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L82)

___

### onDestroy

▸ **onDestroy**(): `void`

This method is called before destruction.

#### Returns

`void`

#### Inherited from

RenderComponent.onDestroy

#### Defined in

[src/core/GameActor.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L104)

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

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

RenderComponent.start

#### Defined in

[src/core/GameActor.ts:94](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L94)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

RenderComponent.update

#### Defined in

[src/component/rendering/TiledTilemapRenderer.ts:149](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/rendering/TiledTilemapRenderer.ts#L149)
