[angry-pixel](../README.md) / [Exports](../modules.md) / TilemapRenderer

# Class: TilemapRenderer

The TilemapRenderer component allows you to render a tile map defined by an array of tile ids, using an instance of the TileSet object.

**`Example`**

```js
this.addComponent(TilemapRenderer, {
  tileset: {
    image: this.assetManager.getImage("image.png"),
    width: 3,
    tileWidth: 16,
    tileHeight: 16,
  }
  tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
  width: 8,
  tileWidth: 16,
  tileHeight: 16,
});
```

**`Example`**

```js
this.addComponent(TilemapRenderer, {
  tileset: {
    image: this.assetManager.getImage("image.png"),
    width: 3,
    tileWidth: 16,
    tileHeight: 16,
    margin: new Vector2(0, 0),
    spacing: new Vector2(0, 0),
  }
  tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
  width: 8,
  tileWidth: 16,
  tileHeight: 16,
  layer: "Tilemap",
  orientation: TilemapOrientation.Center,
  smooth: false,
});
```

## Hierarchy

- `RenderComponent`

  ↳ **`TilemapRenderer`**

## Implements

- `ITilemapRenderer`

## Table of contents

### Properties

- [allowMultiple](TilemapRenderer.md#allowmultiple)
- [assetManager](TilemapRenderer.md#assetmanager)
- [domManager](TilemapRenderer.md#dommanager)
- [gameConfig](TilemapRenderer.md#gameconfig)
- [gameObject](TilemapRenderer.md#gameobject)
- [gameObjectManager](TilemapRenderer.md#gameobjectmanager)
- [height](TilemapRenderer.md#height)
- [inputManager](TilemapRenderer.md#inputmanager)
- [name](TilemapRenderer.md#name)
- [opacity](TilemapRenderer.md#opacity)
- [orientation](TilemapRenderer.md#orientation)
- [physicsManager](TilemapRenderer.md#physicsmanager)
- [realHeight](TilemapRenderer.md#realheight)
- [realWidth](TilemapRenderer.md#realwidth)
- [renderManager](TilemapRenderer.md#rendermanager)
- [sceneManager](TilemapRenderer.md#scenemanager)
- [tileHeight](TilemapRenderer.md#tileheight)
- [tileWidth](TilemapRenderer.md#tilewidth)
- [tiles](TilemapRenderer.md#tiles)
- [timeManager](TilemapRenderer.md#timemanager)
- [tintColor](TilemapRenderer.md#tintcolor)
- [updateEvent](TilemapRenderer.md#updateevent)
- [width](TilemapRenderer.md#width)

### Accessors

- [active](TilemapRenderer.md#active)

### Methods

- [addGameObject](TilemapRenderer.md#addgameobject)
- [destroyGameObject](TilemapRenderer.md#destroygameobject)
- [findGameObject](TilemapRenderer.md#findgameobject)
- [findGameObjects](TilemapRenderer.md#findgameobjects)
- [findGameObjectsByTag](TilemapRenderer.md#findgameobjectsbytag)
- [getComponent](TilemapRenderer.md#getcomponent)
- [getComponents](TilemapRenderer.md#getcomponents)
- [getCurrentScene](TilemapRenderer.md#getcurrentscene)
- [getGameObject](TilemapRenderer.md#getgameobject)
- [hasComponent](TilemapRenderer.md#hascomponent)
- [init](TilemapRenderer.md#init)
- [onActiveChange](TilemapRenderer.md#onactivechange)
- [onDestroy](TilemapRenderer.md#ondestroy)
- [removeComponent](TilemapRenderer.md#removecomponent)
- [start](TilemapRenderer.md#start)
- [update](TilemapRenderer.md#update)

## Properties

### allowMultiple

• `Readonly` **allowMultiple**: `boolean` = `true`

TRUE if several instances of this component are allowed in the same object.

#### Inherited from

RenderComponent.allowMultiple

#### Defined in

[src/core/Component.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L52)

___

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

RenderComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L29)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

RenderComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

RenderComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

RenderComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

RenderComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L35)

___

### height

• `Readonly` **height**: `number`

The height of the tilemap in tiles (this is calculated by the component)

#### Implementation of

ITilemapRenderer.height

#### Defined in

[src/component/rendering/TilemapRenderer.ts:117](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L117)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

RenderComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L33)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

RenderComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L48)

___

### opacity

• **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/TilemapRenderer.ts:125](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L125)

___

### orientation

• **orientation**: [`TilemapOrientation`](../enums/TilemapOrientation.md)

Direction in which the tilemap will be rendered (default value TilemapOrientation.Center)

#### Implementation of

ITilemapRenderer.orientation

#### Defined in

[src/component/rendering/TilemapRenderer.ts:127](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L127)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

RenderComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L37)

___

### realHeight

• `Readonly` **realHeight**: `number`

Tilemap height in pixels (this is calculated by the component)

#### Implementation of

ITilemapRenderer.realHeight

#### Defined in

[src/component/rendering/TilemapRenderer.ts:137](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L137)

___

### realWidth

• `Readonly` **realWidth**: `number`

Tilemap width in pixels (this is calculated by the component)

#### Implementation of

ITilemapRenderer.realWidth

#### Defined in

[src/component/rendering/TilemapRenderer.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L132)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

RenderComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

RenderComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L41)

___

### tileHeight

• **tileHeight**: `number`

The height of the tile to render in pixels

#### Implementation of

ITilemapRenderer.tileHeight

#### Defined in

[src/component/rendering/TilemapRenderer.ts:121](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L121)

___

### tileWidth

• **tileWidth**: `number`

The width of the tile to render in pixels

#### Implementation of

ITilemapRenderer.tileWidth

#### Defined in

[src/component/rendering/TilemapRenderer.ts:119](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L119)

___

### tiles

• **tiles**: `number`[] = `[]`

Id of tiles separated by commas. The ids start at 1, and increment from left to right,
from top to bottom. ID 0 (zero) represents a space with no tile.

#### Implementation of

ITilemapRenderer.tiles

#### Defined in

[src/component/rendering/TilemapRenderer.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L110)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

RenderComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L43)

___

### tintColor

• **tintColor**: `string`

Define a color for tinting the tiles

#### Defined in

[src/component/rendering/TilemapRenderer.ts:123](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L123)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateRender`

#### Inherited from

RenderComponent.updateEvent

#### Defined in

[src/core/Component.ts:204](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L204)

___

### width

• **width**: `number`

The width of the tilemap in tiles

#### Implementation of

ITilemapRenderer.width

#### Defined in

[src/component/rendering/TilemapRenderer.ts:112](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L112)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

RenderComponent.active

#### Defined in

[src/core/Component.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L66)

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

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L71)

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

[src/core/GameActor.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L110)

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

[src/core/GameActor.ts:117](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L117)

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

[src/core/GameActor.ts:124](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L124)

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

[src/core/GameActor.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L132)

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

[src/core/GameActor.ts:200](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L200)

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

[src/core/GameActor.ts:174](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L174)

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

[src/core/GameActor.ts:180](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L180)

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

[src/core/GameActor.ts:154](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L154)

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

[src/core/GameActor.ts:160](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L160)

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

[src/core/GameActor.ts:192](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L192)

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

[src/core/Component.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L122)

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

[src/core/Component.ts:128](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L128)

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

[src/core/Component.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L104)

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

[src/core/Component.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L110)

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

[src/core/Component.ts:89](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L89)

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

[src/core/Component.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L96)

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

[src/core/Component.ts:142](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L142)

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

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L147)

___

### init

▸ **init**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`TilemapRendererOptions`](../interfaces/TilemapRendererOptions.md) |

#### Returns

`void`

#### Overrides

RenderComponent.init

#### Defined in

[src/component/rendering/TilemapRenderer.ts:146](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L146)

___

### onActiveChange

▸ **onActiveChange**(): `void`

This method is called when the active state changes.

#### Returns

`void`

#### Inherited from

RenderComponent.onActiveChange

#### Defined in

[src/core/Component.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L82)

___

### onDestroy

▸ **onDestroy**(): `void`

This method is called before destruction.

#### Returns

`void`

#### Inherited from

RenderComponent.onDestroy

#### Defined in

[src/core/GameActor.ts:103](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L103)

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

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

RenderComponent.start

#### Defined in

[src/core/GameActor.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/core/GameActor.ts#L93)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

RenderComponent.update

#### Defined in

[src/component/rendering/TilemapRenderer.ts:190](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/TilemapRenderer.ts#L190)
