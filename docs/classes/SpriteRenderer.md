[angry-pixel](../README.md) / [Exports](../modules.md) / SpriteRenderer

# Class: SpriteRenderer

The SpriteRenderer component render the Sprite and allow to configure options such as opacity, offser, color, etc.

**`Example`**

```js
this.addComponent(SpriteRenderer, {
  sprite: new Sprite({image: this.assetManager.getImage("image.png")})
});
```

**`Example`**

```js
this.addComponent(SpriteRenderer, {
  sprite: new Sprite({image: this.assetManager.getImage("image.png")}),
  offset: new Vector2(0, 0),
  flipHorizontal:  false,
  flipVertical: false,
  rotation: new Rotation(0),
  opacity: 1,
  tiled: new Vector2(1,1),
  maskColor: "#FF0000",
  maskColorMix: 0,
  tintColor: "#00FF00",
  layer: "Background",
  scale: new Vector2(1,1),
  width: 16,
  height: 16
});
```

## Hierarchy

- `RenderComponent`

  ↳ **`SpriteRenderer`**

## Table of contents

### Properties

- [allowMultiple](SpriteRenderer.md#allowmultiple)
- [assetManager](SpriteRenderer.md#assetmanager)
- [domManager](SpriteRenderer.md#dommanager)
- [flipHorizontal](SpriteRenderer.md#fliphorizontal)
- [flipVertical](SpriteRenderer.md#flipvertical)
- [gameConfig](SpriteRenderer.md#gameconfig)
- [gameObject](SpriteRenderer.md#gameobject)
- [gameObjectManager](SpriteRenderer.md#gameobjectmanager)
- [height](SpriteRenderer.md#height)
- [inputManager](SpriteRenderer.md#inputmanager)
- [layer](SpriteRenderer.md#layer)
- [maskColor](SpriteRenderer.md#maskcolor)
- [maskColorMix](SpriteRenderer.md#maskcolormix)
- [name](SpriteRenderer.md#name)
- [offset](SpriteRenderer.md#offset)
- [opacity](SpriteRenderer.md#opacity)
- [physicsManager](SpriteRenderer.md#physicsmanager)
- [renderManager](SpriteRenderer.md#rendermanager)
- [rotation](SpriteRenderer.md#rotation)
- [scale](SpriteRenderer.md#scale)
- [sceneManager](SpriteRenderer.md#scenemanager)
- [sprite](SpriteRenderer.md#sprite)
- [timeManager](SpriteRenderer.md#timemanager)
- [tintColor](SpriteRenderer.md#tintcolor)
- [updateEvent](SpriteRenderer.md#updateevent)
- [width](SpriteRenderer.md#width)

### Accessors

- [active](SpriteRenderer.md#active)
- [tiled](SpriteRenderer.md#tiled)

### Methods

- [addGameObject](SpriteRenderer.md#addgameobject)
- [destroyGameObject](SpriteRenderer.md#destroygameobject)
- [findGameObject](SpriteRenderer.md#findgameobject)
- [findGameObjects](SpriteRenderer.md#findgameobjects)
- [findGameObjectsByTag](SpriteRenderer.md#findgameobjectsbytag)
- [getComponent](SpriteRenderer.md#getcomponent)
- [getComponents](SpriteRenderer.md#getcomponents)
- [getCurrentScene](SpriteRenderer.md#getcurrentscene)
- [getGameObject](SpriteRenderer.md#getgameobject)
- [hasComponent](SpriteRenderer.md#hascomponent)
- [init](SpriteRenderer.md#init)
- [onActiveChange](SpriteRenderer.md#onactivechange)
- [onDestroy](SpriteRenderer.md#ondestroy)
- [removeComponent](SpriteRenderer.md#removecomponent)
- [start](SpriteRenderer.md#start)
- [update](SpriteRenderer.md#update)

## Properties

### allowMultiple

• `Readonly` **allowMultiple**: `boolean` = `true`

TRUE if several instances of this component are allowed in the same object.

#### Inherited from

RenderComponent.allowMultiple

#### Defined in

[src/core/Component.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L52)

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

### flipHorizontal

• **flipHorizontal**: `boolean`

Flip the image horizontally

#### Defined in

[src/component/rendering/SpriteRenderer.ts:81](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L81)

___

### flipVertical

• **flipVertical**: `boolean`

Flip the image vertically

#### Defined in

[src/component/rendering/SpriteRenderer.ts:83](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L83)

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

Overwrite the original image height

#### Defined in

[src/component/rendering/SpriteRenderer.ts:101](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L101)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

RenderComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L33)

___

### layer

• **layer**: `string`

The render layer

#### Defined in

[src/component/rendering/SpriteRenderer.ts:95](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L95)

___

### maskColor

• **maskColor**: `string`

Define a mask color for the image

#### Defined in

[src/component/rendering/SpriteRenderer.ts:89](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L89)

___

### maskColorMix

• **maskColorMix**: `number`

Define the opacity of the mask color between 1 and 0

#### Defined in

[src/component/rendering/SpriteRenderer.ts:91](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L91)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

RenderComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/Component.ts#L48)

___

### offset

• **offset**: [`Vector2`](Vector2.md)

X-axis and Y-axis offset

#### Defined in

[src/component/rendering/SpriteRenderer.ts:79](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L79)

___

### opacity

• **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/SpriteRenderer.ts:87](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L87)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

RenderComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

RenderComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L39)

___

### rotation

• **rotation**: [`Rotation`](Rotation.md)

Image rotation (degrees or radians)

#### Defined in

[src/component/rendering/SpriteRenderer.ts:85](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L85)

___

### scale

• **scale**: [`Vector2`](Vector2.md)

Scale the image based on a vector

#### Defined in

[src/component/rendering/SpriteRenderer.ts:97](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L97)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

RenderComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameActor.ts#L41)

___

### sprite

• **sprite**: [`Sprite`](Sprite.md)

The sprite to render

#### Defined in

[src/component/rendering/SpriteRenderer.ts:77](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L77)

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

Define a color for tinting the sprite image

#### Defined in

[src/component/rendering/SpriteRenderer.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L93)

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

Overwrite the original image width

#### Defined in

[src/component/rendering/SpriteRenderer.ts:99](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L99)

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

___

### tiled

• `get` **tiled**(): [`Vector2`](Vector2.md)

Render the image in tiles

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/component/rendering/SpriteRenderer.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L132)

• `set` **tiled**(`tiled`): `void`

Renders the image in tiles

#### Parameters

| Name | Type |
| :------ | :------ |
| `tiled` | [`Vector2`](Vector2.md) |

#### Returns

`void`

#### Defined in

[src/component/rendering/SpriteRenderer.ts:137](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L137)

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

▸ **init**(`config?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SpriteRendererOptions`](../interfaces/SpriteRendererOptions.md) |

#### Returns

`void`

#### Overrides

RenderComponent.init

#### Defined in

[src/component/rendering/SpriteRenderer.ts:113](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L113)

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

[src/component/rendering/SpriteRenderer.ts:145](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/rendering/SpriteRenderer.ts#L145)
