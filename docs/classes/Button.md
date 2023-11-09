[angry-pixel](../README.md) / [Exports](../modules.md) / Button

# Class: Button

The Button component is used to interact with the mouse and touch screens.

**`Example`**

```js
cosnt button = this.addComponent(Button, {
   type: ButtonType.Rectangle,
   width: 64,
   height: 64,
   touchEnabled: true,
 });

 button.onClick = () => {
   // some action on click
 };

 button.onPressed = () => {
   // some action on pressed
 };
```

**`Example`**

```js
cosnt button = this.addComponent(Button, {
   type: ButtonType.Circumference,
   radius: 32,
   touchEnabled: true,
 });

 button.onClick = () => {
   // some action on click
 };

 button.onPressed = () => {
   // some action on pressed
 };
```

## Hierarchy

- `EngineComponent`

  ↳ **`Button`**

## Table of contents

### Properties

- [assetManager](Button.md#assetmanager)
- [domManager](Button.md#dommanager)
- [gameConfig](Button.md#gameconfig)
- [gameObject](Button.md#gameobject)
- [gameObjectManager](Button.md#gameobjectmanager)
- [height](Button.md#height)
- [inputManager](Button.md#inputmanager)
- [name](Button.md#name)
- [offset](Button.md#offset)
- [onClick](Button.md#onclick)
- [onPressed](Button.md#onpressed)
- [physicsManager](Button.md#physicsmanager)
- [pressed](Button.md#pressed)
- [radius](Button.md#radius)
- [renderManager](Button.md#rendermanager)
- [sceneManager](Button.md#scenemanager)
- [timeManager](Button.md#timemanager)
- [touchEnabled](Button.md#touchenabled)
- [type](Button.md#type)
- [updateEvent](Button.md#updateevent)
- [width](Button.md#width)

### Accessors

- [active](Button.md#active)

### Methods

- [addGameObject](Button.md#addgameobject)
- [destroyGameObject](Button.md#destroygameobject)
- [findGameObject](Button.md#findgameobject)
- [findGameObjects](Button.md#findgameobjects)
- [findGameObjectsByTag](Button.md#findgameobjectsbytag)
- [getComponent](Button.md#getcomponent)
- [getComponents](Button.md#getcomponents)
- [getCurrentScene](Button.md#getcurrentscene)
- [getGameObject](Button.md#getgameobject)
- [hasComponent](Button.md#hascomponent)
- [init](Button.md#init)
- [onActiveChange](Button.md#onactivechange)
- [onDestroy](Button.md#ondestroy)
- [removeComponent](Button.md#removecomponent)
- [resolveMouseAndCircumference](Button.md#resolvemouseandcircumference)
- [resolveMouseAndRectangle](Button.md#resolvemouseandrectangle)
- [resolveTouchAndCircumference](Button.md#resolvetouchandcircumference)
- [resolveTouchAndRectangle](Button.md#resolvetouchandrectangle)
- [start](Button.md#start)
- [update](Button.md#update)

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

### height

• **height**: `number` = `100`

Height in pixels. Only for rectangle shaped buttons

#### Defined in

[src/component/Button.ts:76](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L76)

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

### offset

• **offset**: [`Vector2`](Vector2.md)

X-axis and Y-axis offset

#### Defined in

[src/component/Button.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L82)

___

### onClick

• **onClick**: () => `void`

#### Type declaration

▸ (): `void`

Function executed when the button's click

##### Returns

`void`

#### Defined in

[src/component/Button.ts:86](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L86)

___

### onPressed

• **onPressed**: () => `void`

#### Type declaration

▸ (): `void`

Function executed when the button is pressed

##### Returns

`void`

#### Defined in

[src/component/Button.ts:88](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L88)

___

### physicsManager

• `Protected` `Readonly` **physicsManager**: [`IPhysicsManager`](../interfaces/IPhysicsManager.md)

Used to manage colliders and rigidBodies.

#### Inherited from

EngineComponent.physicsManager

#### Defined in

[src/core/GameActor.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L37)

___

### pressed

• **pressed**: `boolean` = `false`

TRUE if is pressed

#### Defined in

[src/component/Button.ts:84](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L84)

___

### radius

• **radius**: `number` = `50`

Radius in pixels. Only for circumference shaped buttons

#### Defined in

[src/component/Button.ts:78](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L78)

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

### touchEnabled

• **touchEnabled**: `boolean` = `true`

Enables interaction with touch screens

#### Defined in

[src/component/Button.ts:80](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L80)

___

### type

• **type**: [`ButtonType`](../enums/ButtonType.md)

The shape of the button

#### Defined in

[src/component/Button.ts:72](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L72)

___

### updateEvent

• `Protected` `Readonly` **updateEvent**: `FrameEvent` = `FrameEvent.UpdateEngine`

#### Inherited from

EngineComponent.updateEvent

#### Defined in

[src/core/Component.ts:176](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L176)

___

### width

• **width**: `number` = `100`

Width in pixels. Only for rectangle shaped buttons

#### Defined in

[src/component/Button.ts:74](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L74)

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

▸ **init**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ButtonOptions`](../interfaces/ButtonOptions.md) |

#### Returns

`void`

#### Overrides

EngineComponent.init

#### Defined in

[src/component/Button.ts:102](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L102)

___

### onActiveChange

▸ **onActiveChange**(): `void`

This method is called when the active state changes.

#### Returns

`void`

#### Inherited from

EngineComponent.onActiveChange

#### Defined in

[src/core/Component.ts:82](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Component.ts#L82)

___

### onDestroy

▸ **onDestroy**(): `void`

This method is called before destruction.

#### Returns

`void`

#### Inherited from

EngineComponent.onDestroy

#### Defined in

[src/core/GameActor.ts:103](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameActor.ts#L103)

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

### resolveMouseAndCircumference

▸ **resolveMouseAndCircumference**(): `void`

#### Returns

`void`

#### Defined in

[src/component/Button.ts:163](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L163)

___

### resolveMouseAndRectangle

▸ **resolveMouseAndRectangle**(): `void`

#### Returns

`void`

#### Defined in

[src/component/Button.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L147)

___

### resolveTouchAndCircumference

▸ **resolveTouchAndCircumference**(): `void`

#### Returns

`void`

#### Defined in

[src/component/Button.ts:184](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L184)

___

### resolveTouchAndRectangle

▸ **resolveTouchAndRectangle**(): `void`

#### Returns

`void`

#### Defined in

[src/component/Button.ts:170](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L170)

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

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

EngineComponent.update

#### Defined in

[src/component/Button.ts:111](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/Button.ts#L111)
