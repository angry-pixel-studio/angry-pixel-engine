[angry-pixel](../README.md) / [Exports](../modules.md) / ITimeManager

# Interface: ITimeManager

Manages the properties associated with time.

## Table of contents

### Properties

- [browserDeltaTime](ITimeManager.md#browserdeltatime)
- [deltaTime](ITimeManager.md#deltatime)
- [physicsDeltaTime](ITimeManager.md#physicsdeltatime)
- [timeScale](ITimeManager.md#timescale)
- [unscaledDeltaTime](ITimeManager.md#unscaleddeltatime)
- [unscaledPhysicsDeltaTime](ITimeManager.md#unscaledphysicsdeltatime)

## Properties

### browserDeltaTime

• **browserDeltaTime**: `number`

The time difference, in seconds, between the last frame of and the current frame recorded by the browser.

#### Defined in

[src/core/managers/TimeManager.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/TimeManager.ts#L38)

___

### deltaTime

• **deltaTime**: `number`

The time difference, in seconds, between the last frame and the current frame.

#### Defined in

[src/core/managers/TimeManager.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/TimeManager.ts#L23)

___

### physicsDeltaTime

• **physicsDeltaTime**: `number`

The time difference, in seconds, between the last physics frame and the current one.

#### Defined in

[src/core/managers/TimeManager.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/TimeManager.ts#L25)

___

### timeScale

• **timeScale**: `number`

The scale on which time passes. The default value is 1.
For example, if set to 2, the time will run at twice the speed.
If set to 0.5, it will run at half the speed.\
If set to 0, everything associated with the time will stop.

#### Defined in

[src/core/managers/TimeManager.ts:32](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/TimeManager.ts#L32)

___

### unscaledDeltaTime

• **unscaledDeltaTime**: `number`

The time difference, in seconds, between the last frame and the current frame, unaffected by the scale.

#### Defined in

[src/core/managers/TimeManager.ts:34](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/TimeManager.ts#L34)

___

### unscaledPhysicsDeltaTime

• **unscaledPhysicsDeltaTime**: `number`

The time difference, in seconds, between the last physics frame and the current one, unaffected by the scale.

#### Defined in

[src/core/managers/TimeManager.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/TimeManager.ts#L36)
