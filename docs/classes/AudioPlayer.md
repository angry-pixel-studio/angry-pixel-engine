[angry-pixel](../README.md) / [Exports](../modules.md) / AudioPlayer

# Class: AudioPlayer

The AudioPlayer component is used to play audio files and audio clips, like music and sound fx.

**`Example`**

```js
const audioPlayer = this.addComponent(AudioPlayer);
audioPlayer.addAudioSource(AssetManager.getAudio("audio.ogg"), "AudioName");
audioPlayer.loadAudioSource("AudioName", true, 1);
audioPlayer.play();

// plays a clip only once
audioPlayer.playClip(AssetManager.getAudio("clip.ogg"), 1);
```

## Hierarchy

- `EngineComponent`

  ↳ **`AudioPlayer`**

## Table of contents

### Properties

- [assetManager](AudioPlayer.md#assetmanager)
- [domManager](AudioPlayer.md#dommanager)
- [gameConfig](AudioPlayer.md#gameconfig)
- [gameObject](AudioPlayer.md#gameobject)
- [gameObjectManager](AudioPlayer.md#gameobjectmanager)
- [inputManager](AudioPlayer.md#inputmanager)
- [name](AudioPlayer.md#name)
- [physicsManager](AudioPlayer.md#physicsmanager)
- [renderManager](AudioPlayer.md#rendermanager)
- [sceneManager](AudioPlayer.md#scenemanager)
- [timeManager](AudioPlayer.md#timemanager)
- [updateEvent](AudioPlayer.md#updateevent)

### Accessors

- [active](AudioPlayer.md#active)
- [audioSource](AudioPlayer.md#audiosource)
- [loop](AudioPlayer.md#loop)
- [paused](AudioPlayer.md#paused)
- [playing](AudioPlayer.md#playing)
- [volume](AudioPlayer.md#volume)

### Methods

- [addAudioSource](AudioPlayer.md#addaudiosource)
- [addGameObject](AudioPlayer.md#addgameobject)
- [destroyGameObject](AudioPlayer.md#destroygameobject)
- [findGameObject](AudioPlayer.md#findgameobject)
- [findGameObjects](AudioPlayer.md#findgameobjects)
- [findGameObjectsByTag](AudioPlayer.md#findgameobjectsbytag)
- [getComponent](AudioPlayer.md#getcomponent)
- [getComponents](AudioPlayer.md#getcomponents)
- [getCurrentScene](AudioPlayer.md#getcurrentscene)
- [getGameObject](AudioPlayer.md#getgameobject)
- [hasComponent](AudioPlayer.md#hascomponent)
- [init](AudioPlayer.md#init)
- [loadAudioSource](AudioPlayer.md#loadaudiosource)
- [onActiveChange](AudioPlayer.md#onactivechange)
- [onDestroy](AudioPlayer.md#ondestroy)
- [pause](AudioPlayer.md#pause)
- [play](AudioPlayer.md#play)
- [playClip](AudioPlayer.md#playclip)
- [removeComponent](AudioPlayer.md#removecomponent)
- [start](AudioPlayer.md#start)
- [stop](AudioPlayer.md#stop)
- [update](AudioPlayer.md#update)

## Properties

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

EngineComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L29)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

EngineComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

EngineComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

EngineComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

EngineComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L35)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

EngineComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L33)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

EngineComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L48)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

EngineComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

EngineComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

EngineComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L41)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

EngineComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L43)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateEngine`

#### Inherited from

EngineComponent.updateEvent

#### Defined in

[src/core/Component.ts:176](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L176)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

EngineComponent.active

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

EngineComponent.active

#### Defined in

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L71)

___

### audioSource

• `get` **audioSource**(): `HTMLAudioElement`

The loaded audio source element

#### Returns

`HTMLAudioElement`

#### Defined in

[src/component/AudioPlayer.ts:60](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L60)

___

### loop

• `get` **loop**(): `boolean`

Plays the loaded audio in loop

#### Returns

`boolean`

#### Defined in

[src/component/AudioPlayer.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L82)

• `set` **loop**(`loop`): `void`

Plays the loaded audio in loop

#### Parameters

| Name | Type |
| :------ | :------ |
| `loop` | `boolean` |

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:76](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L76)

___

### paused

• `get` **paused**(): `boolean`

The loaded audio is paused

#### Returns

`boolean`

#### Defined in

[src/component/AudioPlayer.ts:92](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L92)

___

### playing

• `get` **playing**(): `boolean`

The loaded audio is playing

#### Returns

`boolean`

#### Defined in

[src/component/AudioPlayer.ts:87](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L87)

___

### volume

• `get` **volume**(): `number`

The loaded audio volume

#### Returns

`number`

#### Defined in

[src/component/AudioPlayer.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L71)

• `set` **volume**(`volume`): `void`

The loaded audio volume

#### Parameters

| Name | Type |
| :------ | :------ |
| `volume` | `number` |

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:65](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L65)

## Methods

### addAudioSource

▸ **addAudioSource**(`audioSource`, `name?`): `void`

Add a new audio source

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `audioSource` | `HTMLAudioElement` | `undefined` | The audio source element |
| `name` | `string` | `defaultAudioSourceName` | The name to identify the audio source. Optional if the AudioPlayer will only play one audio. |

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:124](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L124)

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

EngineComponent.addGameObject

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

EngineComponent.addGameObject

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

EngineComponent.addGameObject

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

EngineComponent.addGameObject

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

EngineComponent.destroyGameObject

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

EngineComponent.findGameObject

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

EngineComponent.findGameObject

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

EngineComponent.findGameObjects

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

EngineComponent.findGameObjects

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

EngineComponent.findGameObjectsByTag

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

EngineComponent.getComponent

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

EngineComponent.getComponent

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

EngineComponent.getComponents

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

EngineComponent.getComponents

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

EngineComponent.getCurrentScene

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

EngineComponent.getGameObject

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

EngineComponent.hasComponent

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

EngineComponent.hasComponent

#### Defined in

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L147)

___

### init

▸ **init**(`«destructured»?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`AudioPlayerOptions`](../interfaces/AudioPlayerOptions.md) |

#### Returns

`void`

#### Overrides

EngineComponent.init

#### Defined in

[src/component/AudioPlayer.ts:96](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L96)

___

### loadAudioSource

▸ **loadAudioSource**(`audioSourceName`, `loop?`, `volume?`): `void`

Load the given audio source (if there is other audio source playing, it will stop)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audioSourceName` | `string` | The name to identify the audio source |
| `loop?` | `boolean` | [optional] Play the audio in loop |
| `volume?` | `number` | [optional] The audio volume. Values between 1 and 0. |

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:139](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L139)

___

### onActiveChange

▸ **onActiveChange**(): `void`

#### Returns

`void`

#### Overrides

EngineComponent.onActiveChange

#### Defined in

[src/component/AudioPlayer.ts:214](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L214)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Overrides

EngineComponent.onDestroy

#### Defined in

[src/component/AudioPlayer.ts:220](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L220)

___

### pause

▸ **pause**(): `void`

Plause the current audio source

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:190](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L190)

___

### play

▸ **play**(): `void`

Play the loaded audio source

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:150](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L150)

___

### playClip

▸ **playClip**(`audioSource`, `volume?`): `void`

Play once the given audio source

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audioSource` | `HTMLAudioElement` | The audio source element |
| `volume?` | `number` | [optional] The audio volume. Values between 1 and 0. |

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:113](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L113)

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

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

EngineComponent.start

#### Defined in

[src/core/GameActor.ts:93](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L93)

___

### stop

▸ **stop**(): `void`

Stop playing the current audio source

#### Returns

`void`

#### Defined in

[src/component/AudioPlayer.ts:176](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/AudioPlayer.ts#L176)

___

### update

▸ **update**(): `void`

This method is called on every frame.

#### Returns

`void`

#### Inherited from

EngineComponent.update

#### Defined in

[src/core/GameActor.ts:98](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L98)
