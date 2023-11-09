[angry-pixel](../README.md) / [Exports](../modules.md) / VideoRenderer

# Class: VideoRenderer

The VideoRenderer component plays and renders a video element, and allows configuring options such as its dimensions, coloring, etc.

```js
this.addComponent(VideoRenderer, {
  video: this.assetManager.getVideo("video.mp4"),
});
```

```js
this.addComponent(VideoRenderer, {
  video: this.assetManager.getVideo("video.mp4"),
  width: 1920,
  height: 1080,
  offset: new Vector2(0, 0),
  flipHorizontal:  false,
  flipVertical: false,
  rotation: new Rotation(0),
  opacity: 1,
  maskColor: "#FF0000",
  maskColorMix: 0,
  tintColor: "#00FF00",
  layer: "Video",
  slice: {x: 0, y:0, width: 1920, height: 1080},
  volume: 1,
  loop: false,
});
```

## Hierarchy

- `RenderComponent`

  ↳ **`VideoRenderer`**

## Table of contents

### Properties

- [allowMultiple](VideoRenderer.md#allowmultiple)
- [assetManager](VideoRenderer.md#assetmanager)
- [domManager](VideoRenderer.md#dommanager)
- [flipHorizontal](VideoRenderer.md#fliphorizontal)
- [flipVertical](VideoRenderer.md#flipvertical)
- [gameConfig](VideoRenderer.md#gameconfig)
- [gameObject](VideoRenderer.md#gameobject)
- [gameObjectManager](VideoRenderer.md#gameobjectmanager)
- [height](VideoRenderer.md#height)
- [inputManager](VideoRenderer.md#inputmanager)
- [layer](VideoRenderer.md#layer)
- [maskColor](VideoRenderer.md#maskcolor)
- [maskColorMix](VideoRenderer.md#maskcolormix)
- [name](VideoRenderer.md#name)
- [offset](VideoRenderer.md#offset)
- [opacity](VideoRenderer.md#opacity)
- [physicsManager](VideoRenderer.md#physicsmanager)
- [renderManager](VideoRenderer.md#rendermanager)
- [rotation](VideoRenderer.md#rotation)
- [sceneManager](VideoRenderer.md#scenemanager)
- [slice](VideoRenderer.md#slice)
- [timeManager](VideoRenderer.md#timemanager)
- [tintColor](VideoRenderer.md#tintcolor)
- [updateEvent](VideoRenderer.md#updateevent)
- [video](VideoRenderer.md#video)
- [width](VideoRenderer.md#width)

### Accessors

- [active](VideoRenderer.md#active)
- [loop](VideoRenderer.md#loop)
- [paused](VideoRenderer.md#paused)
- [playing](VideoRenderer.md#playing)
- [volume](VideoRenderer.md#volume)

### Methods

- [addGameObject](VideoRenderer.md#addgameobject)
- [destroyGameObject](VideoRenderer.md#destroygameobject)
- [findGameObject](VideoRenderer.md#findgameobject)
- [findGameObjects](VideoRenderer.md#findgameobjects)
- [findGameObjectsByTag](VideoRenderer.md#findgameobjectsbytag)
- [getComponent](VideoRenderer.md#getcomponent)
- [getComponents](VideoRenderer.md#getcomponents)
- [getCurrentScene](VideoRenderer.md#getcurrentscene)
- [getGameObject](VideoRenderer.md#getgameobject)
- [hasComponent](VideoRenderer.md#hascomponent)
- [init](VideoRenderer.md#init)
- [onActiveChange](VideoRenderer.md#onactivechange)
- [onDestroy](VideoRenderer.md#ondestroy)
- [pause](VideoRenderer.md#pause)
- [play](VideoRenderer.md#play)
- [removeComponent](VideoRenderer.md#removecomponent)
- [start](VideoRenderer.md#start)
- [stop](VideoRenderer.md#stop)
- [update](VideoRenderer.md#update)

## Properties

### allowMultiple

• `Readonly` **allowMultiple**: `boolean` = `true`

TRUE if several instances of this component are allowed in the same object.

#### Inherited from

RenderComponent.allowMultiple

#### Defined in

[src/core/Component.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L52)

___

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

RenderComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L29)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

RenderComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L31)

___

### flipHorizontal

• **flipHorizontal**: `boolean`

Flip the video horizontally

#### Defined in

[src/component/rendering/VideoRenderer.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L96)

___

### flipVertical

• **flipVertical**: `boolean`

Flip the video vertically

#### Defined in

[src/component/rendering/VideoRenderer.ts:98](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L98)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

RenderComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

RenderComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

RenderComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L35)

___

### height

• **height**: `number`

Overwrite the original video height

#### Defined in

[src/component/rendering/VideoRenderer.ts:90](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L90)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

RenderComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L33)

___

### layer

• **layer**: `string`

The render layer

#### Defined in

[src/component/rendering/VideoRenderer.ts:108](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L108)

___

### maskColor

• **maskColor**: `string`

Define a mask color for the video

#### Defined in

[src/component/rendering/VideoRenderer.ts:102](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L102)

___

### maskColorMix

• **maskColorMix**: `number`

Define the opacity of the mask color between 1 and 0

#### Defined in

[src/component/rendering/VideoRenderer.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L104)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

RenderComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L48)

___

### offset

• **offset**: [`Vector2`](Vector2.md)

X-axis and Y-axis offset

#### Defined in

[src/component/rendering/VideoRenderer.ts:92](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L92)

___

### opacity

• **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/VideoRenderer.ts:100](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L100)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

RenderComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

RenderComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L39)

___

### rotation

• **rotation**: [`Rotation`](Rotation.md)

Video rotation (degrees or radians)

#### Defined in

[src/component/rendering/VideoRenderer.ts:94](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L94)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

RenderComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L41)

___

### slice

• `Optional` **slice**: [`Slice`](../interfaces/Slice.md)

Cut the video based on straight coordinates starting from the top left downward

#### Defined in

[src/component/rendering/VideoRenderer.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L110)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

RenderComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L43)

___

### tintColor

• **tintColor**: `string`

Define a color for tinting the video

#### Defined in

[src/component/rendering/VideoRenderer.ts:106](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L106)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateRender`

#### Inherited from

RenderComponent.updateEvent

#### Defined in

[src/core/Component.ts:204](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L204)

___

### video

• **video**: `HTMLVideoElement`

The video element to render

#### Defined in

[src/component/rendering/VideoRenderer.ts:86](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L86)

___

### width

• **width**: `number`

Overwrite the original video width

#### Defined in

[src/component/rendering/VideoRenderer.ts:88](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L88)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

RenderComponent.active

#### Defined in

[src/core/Component.ts:66](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L66)

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

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L71)

___

### loop

• `get` **loop**(): `boolean`

TRUE if the video will play in loop

#### Returns

`boolean`

#### Defined in

[src/component/rendering/VideoRenderer.ts:139](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L139)

• `set` **loop**(`loop`): `void`

TRUE if the video will play in loop

#### Parameters

| Name | Type |
| :------ | :------ |
| `loop` | `boolean` |

#### Returns

`void`

#### Defined in

[src/component/rendering/VideoRenderer.ts:133](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L133)

___

### paused

• `get` **paused**(): `boolean`

TRUE if the video is paused

#### Returns

`boolean`

#### Defined in

[src/component/rendering/VideoRenderer.ts:149](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L149)

___

### playing

• `get` **playing**(): `boolean`

TRUE if the video is playing

#### Returns

`boolean`

#### Defined in

[src/component/rendering/VideoRenderer.ts:144](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L144)

___

### volume

• `get` **volume**(): `number`

The volume of the video

#### Returns

`number`

#### Defined in

[src/component/rendering/VideoRenderer.ts:128](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L128)

• `set` **volume**(`volume`): `void`

The volume of the video

#### Parameters

| Name | Type |
| :------ | :------ |
| `volume` | `number` |

#### Returns

`void`

#### Defined in

[src/component/rendering/VideoRenderer.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L122)

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

[src/core/GameActor.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L110)

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

[src/core/GameActor.ts:117](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L117)

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

[src/core/GameActor.ts:124](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L124)

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

[src/core/GameActor.ts:132](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L132)

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

[src/core/GameActor.ts:200](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L200)

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

[src/core/GameActor.ts:174](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L174)

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

[src/core/GameActor.ts:180](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L180)

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

[src/core/GameActor.ts:154](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L154)

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

[src/core/GameActor.ts:160](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L160)

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

[src/core/GameActor.ts:192](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L192)

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

[src/core/Component.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L122)

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

[src/core/Component.ts:128](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L128)

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

[src/core/Component.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L104)

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

[src/core/Component.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L110)

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

[src/core/Component.ts:89](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L89)

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

[src/core/Component.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L96)

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

[src/core/Component.ts:142](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L142)

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

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L147)

___

### init

▸ **init**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`VideoRendererOptions`](../interfaces/VideoRendererOptions.md) |

#### Returns

`void`

#### Overrides

RenderComponent.init

#### Defined in

[src/component/rendering/VideoRenderer.ts:153](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L153)

___

### onActiveChange

▸ **onActiveChange**(): `void`

#### Returns

`void`

#### Overrides

RenderComponent.onActiveChange

#### Defined in

[src/component/rendering/VideoRenderer.ts:299](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L299)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Overrides

RenderComponent.onDestroy

#### Defined in

[src/component/rendering/VideoRenderer.ts:305](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L305)

___

### pause

▸ **pause**(): `void`

Plause the current video

#### Returns

`void`

#### Defined in

[src/component/rendering/VideoRenderer.ts:232](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L232)

___

### play

▸ **play**(): `void`

Play the loaded video

#### Returns

`void`

#### Defined in

[src/component/rendering/VideoRenderer.ts:184](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L184)

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

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

RenderComponent.start

#### Defined in

[src/core/GameActor.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L93)

___

### stop

▸ **stop**(): `void`

Stop playing the current video

#### Returns

`void`

#### Defined in

[src/component/rendering/VideoRenderer.ts:218](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L218)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

RenderComponent.update

#### Defined in

[src/component/rendering/VideoRenderer.ts:255](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/VideoRenderer.ts#L255)
