[angry-pixel](../README.md) / [Exports](../modules.md) / Camera

# Class: Camera

The Camera component is used to organize the rendering order by layers and to manage the general zooming of these layers.

**`Example`**

```js
const camera = this.addComponent(Camera);
camera.zoom = 1;
camera.depth = 0;
camera.layers = ["Background", "Foreground"];
camera.addLayer("UI");
```

## Hierarchy

- `CameraComponent`

  ↳ **`Camera`**

## Table of contents

### Properties

- [assetManager](Camera.md#assetmanager)
- [depth](Camera.md#depth)
- [domManager](Camera.md#dommanager)
- [gameConfig](Camera.md#gameconfig)
- [gameObject](Camera.md#gameobject)
- [gameObjectManager](Camera.md#gameobjectmanager)
- [inputManager](Camera.md#inputmanager)
- [layers](Camera.md#layers)
- [name](Camera.md#name)
- [physicsManager](Camera.md#physicsmanager)
- [renderManager](Camera.md#rendermanager)
- [sceneManager](Camera.md#scenemanager)
- [timeManager](Camera.md#timemanager)
- [updateEvent](Camera.md#updateevent)
- [viewportRect](Camera.md#viewportrect)
- [worldSpaceRect](Camera.md#worldspacerect)

### Accessors

- [active](Camera.md#active)
- [zoom](Camera.md#zoom)

### Methods

- [addGameObject](Camera.md#addgameobject)
- [addLayer](Camera.md#addlayer)
- [destroyGameObject](Camera.md#destroygameobject)
- [findGameObject](Camera.md#findgameobject)
- [findGameObjects](Camera.md#findgameobjects)
- [findGameObjectsByTag](Camera.md#findgameobjectsbytag)
- [getComponent](Camera.md#getcomponent)
- [getComponents](Camera.md#getcomponents)
- [getCurrentScene](Camera.md#getcurrentscene)
- [getGameObject](Camera.md#getgameobject)
- [hasComponent](Camera.md#hascomponent)
- [init](Camera.md#init)
- [onActiveChange](Camera.md#onactivechange)
- [onDestroy](Camera.md#ondestroy)
- [removeComponent](Camera.md#removecomponent)
- [start](Camera.md#start)
- [update](Camera.md#update)

## Properties

### assetManager

• `Protected` `Readonly` **assetManager**: [`IAssetManager`](../interfaces/IAssetManager.md)

Used to load and retrieve assets.

#### Inherited from

CameraComponent.assetManager

#### Defined in

[src/core/GameActor.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L29)

___

### depth

• **depth**: `number` = `0`

In case you have more than one camera, the depth value determines which camera is rendered first

#### Defined in

[src/component/Camera.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L36)

___

### domManager

• `Protected` `Readonly` **domManager**: [`IDomManager`](../interfaces/IDomManager.md)

Used to access the canvas element.

#### Inherited from

CameraComponent.domManager

#### Defined in

[src/core/GameActor.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L31)

___

### gameConfig

• `Protected` `Readonly` **gameConfig**: [`GameConfig`](../interfaces/GameConfig.md)

Object containing the game configuration.

#### Inherited from

CameraComponent.gameConfig

#### Defined in

[src/core/GameActor.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L45)

___

### gameObject

• `Readonly` **gameObject**: [`GameObject`](GameObject.md)

Object to which it belongs.

#### Inherited from

CameraComponent.gameObject

#### Defined in

[src/core/Component.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L50)

___

### gameObjectManager

• `Protected` `Readonly` **gameObjectManager**: [`IGameObjectManager`](../interfaces/IGameObjectManager.md)

Used to create, retrieve and destroy GameObject instances.

#### Inherited from

CameraComponent.gameObjectManager

#### Defined in

[src/core/GameActor.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L35)

___

### inputManager

• `Protected` `Readonly` **inputManager**: [`IInputManager`](../interfaces/IInputManager.md)

Used to obtain information about the input.

#### Inherited from

CameraComponent.inputManager

#### Defined in

[src/core/GameActor.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L33)

___

### layers

• **layers**: `string`[] = `DEFAULT_LAYERS`

Layers to be rendered by this camera

#### Defined in

[src/component/Camera.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L38)

___

### name

• `Readonly` **name**: `string`

Name given manually at the time of instantiation.

#### Inherited from

CameraComponent.name

#### Defined in

[src/core/Component.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L48)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

CameraComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L37)

___

### renderManager

• `Protected` `Readonly` **renderManager**: [`IRenderManager`](../interfaces/IRenderManager.md)

Used to manage the render and camera data.

#### Inherited from

CameraComponent.renderManager

#### Defined in

[src/core/GameActor.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L39)

___

### sceneManager

• `Protected` `Readonly` **sceneManager**: [`ISceneManager`](../interfaces/ISceneManager.md)

Used to load scenes.

#### Inherited from

CameraComponent.sceneManager

#### Defined in

[src/core/GameActor.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L41)

___

### timeManager

• `Protected` `Readonly` **timeManager**: [`ITimeManager`](../interfaces/ITimeManager.md)

Used to manage and obtain information about the time in the game.

#### Inherited from

CameraComponent.timeManager

#### Defined in

[src/core/GameActor.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L43)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateCamera`

#### Inherited from

CameraComponent.updateEvent

#### Defined in

[src/core/Component.ts:199](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L199)

___

### viewportRect

• `Readonly` **viewportRect**: [`Rectangle`](Rectangle.md)

Rectangle representing the field of view of the camera from the perspective of the screen

#### Defined in

[src/component/Camera.ts:28](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L28)

___

### worldSpaceRect

• `Readonly` **worldSpaceRect**: [`Rectangle`](Rectangle.md)

Rectangle representing the field of view of the camera in the game world

#### Defined in

[src/component/Camera.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L33)

## Accessors

### active

• `get` **active**(): `boolean`

TRUE for enabled object, FALSE for disabled object.

#### Returns

`boolean`

#### Inherited from

CameraComponent.active

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

CameraComponent.active

#### Defined in

[src/core/Component.ts:71](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L71)

___

### zoom

• `get` **zoom**(): `number`

Camera zoom. Default value is 1

#### Returns

`number`

#### Defined in

[src/component/Camera.ts:54](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L54)

• `set` **zoom**(`zoom`): `void`

Camera zoom. Default value is 1

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoom` | `number` |

#### Returns

`void`

#### Defined in

[src/component/Camera.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L45)

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

CameraComponent.addGameObject

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

CameraComponent.addGameObject

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

CameraComponent.addGameObject

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

CameraComponent.addGameObject

#### Defined in

[src/core/GameActor.ts:133](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L133)

___

### addLayer

▸ **addLayer**(`layer`): `void`

Adds a new layer to the end of the stack

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `string` |

#### Returns

`void`

#### Defined in

[src/component/Camera.ts:59](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L59)

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

CameraComponent.destroyGameObject

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

CameraComponent.findGameObject

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

CameraComponent.findGameObject

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

CameraComponent.findGameObjects

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

CameraComponent.findGameObjects

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

CameraComponent.findGameObjectsByTag

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

CameraComponent.getComponent

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

CameraComponent.getComponent

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

CameraComponent.getComponents

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

CameraComponent.getComponents

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

CameraComponent.getCurrentScene

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

CameraComponent.getGameObject

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

CameraComponent.hasComponent

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

CameraComponent.hasComponent

#### Defined in

[src/core/Component.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L147)

___

### init

▸ **init**(): `void`

#### Returns

`void`

#### Overrides

CameraComponent.init

#### Defined in

[src/component/Camera.ts:63](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L63)

___

### onActiveChange

▸ **onActiveChange**(): `void`

This method is called when the active state changes.

#### Returns

`void`

#### Inherited from

CameraComponent.onActiveChange

#### Defined in

[src/core/Component.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L82)

___

### onDestroy

▸ **onDestroy**(): `void`

This method is called before destruction.

#### Returns

`void`

#### Inherited from

CameraComponent.onDestroy

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

CameraComponent.removeComponent

#### Defined in

[src/core/Component.ts:158](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/Component.ts#L158)

___

### start

▸ **start**(): `void`

This method is called only once on the first available frame.

#### Returns

`void`

#### Inherited from

CameraComponent.start

#### Defined in

[src/core/GameActor.ts:94](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/GameActor.ts#L94)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

CameraComponent.update

#### Defined in

[src/component/Camera.ts:68](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/Camera.ts#L68)
