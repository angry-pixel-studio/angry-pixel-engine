/**
 * Represents a 2D vector and provides static methods for vector calculations.
 * @category Math
 * @public
 * @example
 * ```js
 * const v1 = new Vector2(2, 1);
 * const v2 = new Vector2(3, 2);
 * const v3 = new Vector2(); // zero vector
 *
 * Vector2.add(v3, v1, v2);
 * v3.x // 5
 * v3.y // 3
 * ```
 */
declare class Vector2 {
    private _x;
    private _y;
    private _direction;
    constructor(x?: number, y?: number);
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    /**
     * Get the magnitude of the vector
     *
     * @returns The magnitude of the vector
     */
    get magnitude(): number;
    /**
     * Get the direction as an unit vector
     *
     * @returns The direction vector
     */
    get direction(): Vector2;
    /**
     * Set the vector
     *
     * @param x The x value
     * @param y The y value
     */
    set(x: number, y: number): void;
    /**
     * Copy the target vector properties
     *
     * @param vector The vector to copy from
     */
    copy(vector: Vector2): void;
    /**
     * Compare if two vector are equals
     *
     * @param vector The vector to compare
     * @returns True if the vectors are equals, false if not
     */
    equals(vector: Vector2): boolean;
    /**
     * Colne a vector into a new instace
     *
     * @returns The cloned vector
     */
    clone(): Vector2;
    /**
     * Get the distance with another vector
     *
     * @param vector The vector to compare
     * @returns The magnitude of the distance
     */
    distance(vector: Vector2): number;
    /**
     * Calculates a + b
     * @param out The output vector
     * @param a The first operand
     * @param b The second operand
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(2, 1);
     * const v2 = new Vector2(3, 2);
     * const v3 = Vector2.add(new Vector2(), v1, v2);
     * v3.x // 5
     * v3.y // 3
     * ```
     */
    static add(out: Vector2, a: Vector2, b: Vector2): Vector2;
    /**
     * Calculates a - b
     *
     * @param out The output vector
     * @param a The first operand
     * @param b The second operand
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = new Vector2(2, 1);
     * const v3 = Vector2.subtract(new Vector2(), v1, v2);
     * v3.x // 1
     * v3.y // 1
     * ```
     */
    static subtract(out: Vector2, a: Vector2, b: Vector2): Vector2;
    /**
     * Returns the unit vector
     *
     * @param out The output vector
     * @param a The vector to get the unit
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(3, 0);
     * const v2 = Vector2.unit(new Vector2(), v1);
     * v2.x // 1
     * v2.y // 0
     * ```
     */
    static unit(out: Vector2, a: Vector2): Vector2;
    /**
     * Normalize a vector
     *
     * @param out The output vector
     * @param a The vector to normalize
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(0, 2);
     * const v2 = Vector2.normal(new Vector2(), v1);
     * v2.x // -2
     * v2.y // 0
     * ```
     */
    static normal(out: Vector2, a: Vector2): Vector2;
    /**
     * Scale a vector
     *
     * @param out The output vector
     * @param a The vector to scale
     * @param scalar The scalar value
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = Vector2.scale(new Vector2(), v1, 2);
     * v2.x // 6
     * v2.y // 4
     * ```
     */
    static scale(out: Vector2, a: Vector2, scalar: number): Vector2;
    /**
     * Calculates the dot product of two vectors and returns a scalar value
     *
     * @param a The first operand
     * @param b The second operand
     * @returns The dot product result
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = new Vector2(2, 1);
     * Vector2.dot(v1, v2); // 8
     * ```
     */
    static dot(a: Vector2, b: Vector2): number;
    /**
     * Calculates the cross product of two vectors and returns a scalar value
     *
     * @param a The first operand
     * @param b The second operand
     * @returns The cross produc result
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = new Vector2(2, 1);
     * Vector2.cross(v1, v2); // -1
     * ```
     */
    static cross(a: Vector2, b: Vector2): number;
    /**
     * Rounds a vector
     *
     * @param a The vector to round
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(3.9, 2.2);
     * const v2 = Vector2.round(new Vector2(), v1);
     * v2.x // 4
     * v2.y // 2
     * ```
     */
    static round(out: Vector2, a: Vector2): Vector2;
}

/**
 * Represents an axis aligned rectangle
 * @category Math
 * @public
 */
declare class Rectangle {
    width: number;
    height: number;
    private _position;
    private _center;
    constructor(x?: number, y?: number, width?: number, height?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get x1(): number;
    get y1(): number;
    get position(): Vector2;
    set position(position: Vector2);
    get center(): Vector2;
    /**
     * Set the rectangle
     *
     * @param x
     * @param y
     * @param width
     * @param height
     */
    set(x: number, y: number, width: number, height: number): void;
    /**
     * Compare if two rectangles are equals
     *
     * @param rectangle The rectangle to compare
     * @returns TRUE if the rectangles are equals, FALSE if not
     */
    equals(rectangle: Rectangle): boolean;
    /**
     * Copy the target rectangle properties
     *
     * @param rect The rectangle to copy from
     */
    copy(rect: Rectangle): void;
    /**
     * Check if the target rectangle is overlapping
     *
     * @param rect The target rectangle
     * @returns TRUE or FALSE
     */
    overlaps(rect: Rectangle): boolean;
    /**
     * Check if the target rectangle is contained
     *
     * @param rect The target rectangle
     * @returns TRUE or FALSE
     */
    contains(rect: Rectangle): boolean;
    /**
     * Check if the target vector is contained
     *
     * @param vector The target vector
     * @returns TRUE or FALSE
     */
    contains(vector: Vector2): boolean;
}

/**
 * Clamps the given value between the given minimum and maximum values.
 * @category Math
 * @public
 * @param value number to clamp
 * @param min min value
 * @param max max value
 * @returns clamped value
 */
declare const clamp: (value: number, min: number, max: number) => number;
/**
 * Returns a random integer number between the given minimum and maximum values.
 * @category Math
 * @public
 * @param min min value
 * @param max max value
 * @returns the random int value
 */
declare const randomInt: (min: number, max: number) => number;
/**
 * Returns a random float number between the given minimum and maximum values.
 * @category Math
 * @public
 * @param min min value
 * @param max max value
 * @returns the random float value
 */
declare const randomFloat: (min: number, max: number, decimals?: number) => number;
/**
 * Corrects a floating number to a given number of decimal places.
 * @category Math
 * @public
 * @param value the value to round
 * @param decimals the number of decimals
 * @returns the rounded value
 */
declare const fixedRound: (value: number, decimals: number) => number;
/**
 * Generate an array with a range of numbers.
 * @category Math
 * @public
 * @param start the starting value
 * @param end the end value
 * @param steps the steps to move
 * @returns number range
 */
declare const range: (start: number, end: number, steps?: number) => number[];
/**
 * Evaluates whether the given value is between the minimum and the maximum (both inclusive).
 * @category Math
 * @public
 * @param value number to compare
 * @param min min value
 * @param max max value
 * @returns true if the number is between the min and the max, false instead
 */
declare const between: (value: number, min: number, max: number) => boolean;

interface IShape {
    boundingBox: Rectangle;
    position: Vector2;
    projectionAxes: Vector2[];
    radius: number;
    rotation: number;
    vertexModel: Vector2[];
    vertices: Vector2[];
}
declare class Polygon implements IShape {
    rotation: number;
    position: Vector2;
    vertices: Vector2[];
    projectionAxes: Vector2[];
    boundingBox: Rectangle;
    radius: number;
    private _vertexModel;
    get vertexModel(): Vector2[];
    set vertexModel(vertexModel: Vector2[]);
    constructor(vertexModel: Vector2[], rotation?: number);
}
declare class Circumference implements IShape {
    radius: number;
    position: Vector2;
    vertices: Vector2[];
    vertexModel: Vector2[];
    rotation: number;
    projectionAxes: Vector2[];
    boundingBox: Rectangle;
    constructor(radius: number);
}

interface ICollisionResolution {
    penetration: number;
    direction: Vector2;
}

/**
 * Resolution phase collision methods
 * - AABB (axis-aligned bounding box): It only works with axis-aligned rectangles and lines and cimcurferences.
 * - SAT (Separation axis theorem): It works with every type of shape.
 * @category Config
 * @public
 */
declare enum CollisionMethods {
    AABB = 0,
    SAT = 1
}

/**
 * The type of the rigid body to create:
 * - Dynamic: This type of body is affected by gravity and velopcity.
 * - Static: This type of body is immovable, is unaffected by velocity and gravity.
 * @category Components
 * @public
 */
declare enum RigidBodyType {
    Dynamic = 0,
    Static = 1
}
interface IRigidBody {
    type: RigidBodyType;
    gravity: number;
    velocity: Vector2;
    acceleration: Vector2;
}

interface ITransform {
    /** Position relative to the zero point of the simulated world, or relative to the parent if it has one */
    position: Vector2;
    /** Scale on x-axis and y-axis */
    scale: Vector2;
    /** Rotation expressed in radians */
    rotation: number;
    /** The position became relative to this transform */
    parent?: ITransform;
    /** The real position in the simulated world. It is the same as position if there is no parent */
    localPosition: Vector2;
    /** The real scale in the simulated world. It has the same value as `scale` property if there is no parent */
    localScale: Vector2;
    /** The real rotation in the simulated world. It has the same value as `rotation` property if there is no parent */
    localRotation: number;
}

interface ICollider<T extends IShape = IShape> {
    entity?: number;
    id?: number;
    shape: T;
    layer: string;
    physics: boolean;
    updateCollisions: boolean;
    offset: Vector2;
}

type PhysicsEntity = [number, ITransform, IRigidBody?, ICollider[]?];

/**
 * Broad phase collision methods
 * - QuadTree: Stores the colliders in an incremental quad tree.
 * - SpartialGrid: Stores the colliders in an incremental spartial grid.
 * @category Config
 * @public
 */
declare enum BroadPhaseMethods {
    QuadTree = 0,
    SpartialGrid = 1
}

/**
 * Represent a collision. It contains the colliders involved and the resolution data.
 * @category Components
 * @public
 */
interface ICollision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    resolution: ICollisionResolution;
}

/**
 * Array containing which layers will collide with each other.
 * @category Config
 * @public
 */
type CollisionMatrix = [string, string][];

interface IPhysicsManager {
    update(time: number): void;
    addTransform(entityId: number, transform: ITransform): void;
    addRigidBody(entityId: number, rigidBody: IRigidBody): void;
    addCollider(entityId: number, collider: ICollider): void;
    getEntities(): PhysicsEntity[];
    removeAllEntities(): void;
    getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[];
    getCollisionsForCollider(collider: ICollider): ICollision[];
}

/**
 * It represents a connected gamepad and has the information of all its buttons and axes..
 * @public
 * @category Input
 * @example
 * ```js
 * const gamepad = this.inputManager.gamepads[0];
 *
 * if (gamepad.dpadAxes.x > 1) {
 *   // if the depad x-axis is pressed to the right, do some action
 * }
 *
 * if (gamepad.rightFace) {
 *   // if the right face button is pressed, do some action
 * }
 * ```
 */
declare class GamepadController {
    /** @internal */
    readonly buttons: Map<number, boolean>;
    /** @internal */
    readonly axes: Map<number, number>;
    private readonly _dpadAxes;
    private readonly _leftStickAxes;
    private readonly _rightStickAxes;
    /**
     * The gamepad id
     */
    id: string;
    /**
     * The gamepad index
     */
    index: number;
    /**
     * TRUE if the gamepad is connected
     */
    connected: boolean;
    /**
     * The values of the d-pad axes represented as a xy vector
     */
    get dpadAxes(): Vector2;
    /**
     * The values of the left stick axes represented as a xy vector
     */
    get leftStickAxes(): Vector2;
    /**
     * The values of the right stick axes represented as a xy vector
     */
    get rightStickAxes(): Vector2;
    /**
     * TRUE if d-pad up is pressed
     */
    get dpadUp(): boolean;
    /**
     * TRUE if d-pad down is pressed
     */
    get dpadDown(): boolean;
    /**
     * TRUE if d-pad left is pressed
     */
    get dpadLeft(): boolean;
    /**
     * TRUE if d-pad right is pressed
     */
    get dpadRight(): boolean;
    /**
     * TRUE if bottom face button is pressed (Dual Shock: X. Xbox: A. Nintendo: B)
     */
    get bottomFace(): boolean;
    /**
     * TRUE if right face button is pressed (Dual Shock: Square. Xbox: X. Nintendo: Y)
     */
    get rightFace(): boolean;
    /**
     * TRUE if left face button is pressed (Dual Shock: Circle. Xbox: B. Nintendo: A)
     */
    get leftFace(): boolean;
    /**
     * TRUE if top face button is pressed (Dual Shock: Triangle. Xbox: Y. Nintendo: X)
     */
    get topFace(): boolean;
    /**
     * TRUE if left shoulder button is pressed (Dual Shock: L1. Xbox: LB. Nintendo: L)
     */
    get leftShoulder(): boolean;
    /**
     * TRUE if right shoulder button is pressed (Dual Shock: R1. Xbox: RB. Nintendo: R)
     */
    get rightShoulder(): boolean;
    /**
     * TRUE if left trigger button is pressed (Dual Shock: L2. Xbox: LT. Nintendo: ZL)
     */
    get leftTrigger(): boolean;
    /**
     * TRUE if right trigger button is pressed (Dual Shock: R2. Xbox: RT. Nintendo: ZR)
     */
    get rightTrigger(): boolean;
    /**
     * TRUE if back button is pressed (a.k.a. select button)
     */
    get back(): boolean;
    /**
     * TRUE if start button is pressed (a.k.a. options button)
     */
    get start(): boolean;
    /**
     * TRUE if left stick button is pressed
     */
    get leftStickButton(): boolean;
    /**
     * TRUE if right stick button is pressed
     */
    get rightStickButton(): boolean;
    /**
     * Left stick horizontal axes value
     */
    get leftStickHorizontal(): number;
    /**
     * Left stick vertical axes value
     */
    get leftStickVertical(): number;
    /**
     * Right stick horizontal axes value
     */
    get rightStickHorizontal(): number;
    /**
     * Right stick vertical axes value
     */
    get rightStickVertical(): number;
    /**
     * TRUE if any button is pressed
     */
    get anyButtonPressed(): boolean;
    /**
     * TRUE if the vibration is on
     */
    vibrating: boolean;
    /**
     * @internal
     */
    vibrationInput: VibrationInput;
    /**
     * Turns on the gamepad vibration
     * @param duration The duration of the effect in milliseconds
     * @param weakMagnitude Rumble intensity of the high-frequency (weak) rumble motors, normalized to the range between 0.0 and 1.0
     * @param strongMagnitude Rumble intensity of the low-frequency (strong) rumble motors, normalized to the range between 0.0 and 1.0
     * @param startDelay The delay in milliseconds before the effect is started
     */
    vibrate(duration?: number, weakMagnitude?: number, strongMagnitude?: number, startDelay?: number): void;
}
type VibrationInput = {
    duration: number;
    weakMagnitude: number;
    strongMagnitude: number;
    startDelay: number;
};

/**
 * Contains the keyboard information in the last frame.
 * It uses the **code** property of the **js keyboard event**.
 * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
 * @public
 * @category Input
 * @example
 * ```js
 * const keyboard = this.inputManager.keyboard;
 *
 * if (keyboard.isPressed("ArrowRight")) {
 *   // if the right arrow key is pressed, do some action
 * }
 *
 * if (keyboard.orPressed("Enter", "Space")) {
 *   // if the enter key or space key are pressed, do some action
 * }
 *
 * if (keyboard.andPressed("ControlLeft", "KeyC")) {
 *   // if the left control key and the letter C key are pressed, do some action
 * }
 * ```
 */
declare class Keyboard {
    /**
     * The current pressed key codes
     */
    pressedKeys: string[];
    /**
     * Returns TRUE if the given key is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCode The code of the key to check
     * @returns TRUE true for pressed, FALSE instead
     */
    isPressed(keyCode: string): boolean;
    /**
     * Returns TRUE if one of the given keys is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @returns TRUE for pressed, FALSE instead
     */
    orPressed(keyCodes: string[]): boolean;
    /**
     * Returns TRUE if all the given keys are being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @returns TRUE for pressed, FALSE instead
     */
    andPressed(keyCodes: string[]): boolean;
    /**
     * This method accepts two parameters that will be returned depending on whether the key is pressed or not.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCode The code of the key to check
     * @param returnTrue The value to return if the key is pressed
     * @param returnFalse The value to return if the key is not pressed
     * @returns The returnTrue for pressed or the returnFalse instead
     */
    isPressedReturn<T>(keyCode: string, returnTrue: T, returnFalse: T): T;
    /**
     * This method accepts two parameters that will be returned depending on whether one of the given keys is being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @param returnTrue The value to return if the key is pressed
     * @param returnFalse The value to return if the key is not pressed
     * @returns The returnTrue for pressed or the returnFalse instead
     */
    orPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T;
    /**
     * This method accepts two parameters that will be returned depending on whether all the given keys are being pressed.
     * @see [KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
     * @param keyCodes The codes of the keys to check
     * @param returnTrue The value to return if the key is pressed
     * @param returnFalse The value to return if the key is not pressed
     * @returns The returnTrue for pressed or the returnFalse instead
     */
    andPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T;
}

/**
 * Contains the mouse information in the last frame
 * @public
 * @category Input
 * @example
 * ```js
 * const mouse = this.inputManager.mouse;
 *
 * if (mouse.positionInViewport.y < 0 && mouse.leftButtonPressed) {
 *   // if the mouse pointer is below the middle of the screen and left click, do something
 * }
 * ```
 */
declare class Mouse {
    /**
     * TRUE if the left button is being pressed
     */
    leftButtonPressed: boolean;
    /**
     * TRUE if the scroll button is being pressed
     */
    scrollButtonPressed: boolean;
    /**
     * TRUE if the right button is beign pressed
     */
    rightButtonPressed: boolean;
    /**
     * The position of the pointer in the screen view port
     */
    positionInViewport: Vector2;
    /**
     * TRUE if the mouse moved during the last frame
     */
    hasMoved: boolean;
    /**
     * The scroll amount of the mouse wheel
     */
    wheelScroll: Vector2;
}

/**
 * The information about one interaction with the screen
 * @public
 * @category Input
 */
interface TouchInteraction {
    /** The interaction position on the screen */
    positionInViewport: Vector2;
    /** The area of the interaction represented as a radius of the ellipse */
    radius: Vector2;
}
/**
 * Contains the information about the touch screen interaction
 * @public
 * @category Input
 * @example
 * ```js
 * const touch = this.inputController.touch;
 *
 * if (touch.touching) {
 *   const interaction = touch.interactions[0];
 * }
 * ```
 */
declare class TouchScreen {
    /**
     * TRUE if there is an interaction with the screen
     */
    touching: boolean;
    /**
     * The information about the interactions with the screen
     */
    interactions: TouchInteraction[];
}

interface IInputManager {
    keyboard: Keyboard;
    mouse: Mouse;
    touchScreen: TouchScreen;
    gamepads: GamepadController[];
    update(): void;
}

/**
 * Manages the asset loading (images, fonts, audios, videos).
 * @public
 * @category Managers
 * @example
 * ```js
 * this.assetManager.loadImage("image.png");
 * this.assetManager.loadAudio("audio.ogg");
 * this.assetManager.loadVideo("video.mp4");
 * this.assetManager.loadFont("custom-font", "custom-font.ttf");
 *
 * const imageElement = this.assetManager.getImage("image.png");
 * const audioElement = this.assetManager.getAudio("audio.ogg");
 * const videoElement = this.assetManager.getVideo("video.mp4");
 * const fontFace = this.assetManager.getFont("custom-font");
 *
 * if (this.assetManager.getAssetsLoaded()) {
 *   // do something when assets are loaded
 * }
 * ```
 */
interface IAssetManager {
    /**
     * Returns TRUE if the assets are loaded
     * @returns TRUE or FALSE
     */
    getAssetsLoaded(): boolean;
    /**
     * Loads an image asset
     * @param url The asset URL
     * @param preloadTexture Creates the texture to be rendered at load time [optional]
     * @returns The HTML Image element created
     */
    loadImage(url: string, preloadTexture?: boolean): HTMLImageElement;
    /**
     * Loads an audio asset
     * @param url The asset URL
     * @returns The HTML Audio element created
     */
    loadAudio(url: string): HTMLAudioElement;
    /**
     * Loads a font asset
     * @param family The font family name
     * @param url The asset URL
     * @returns The FontFace object created
     */
    loadFont(family: string, url: string): FontFace;
    /**
     * Loads an video asset
     * @param url The asset URL
     * @returns The HTML Video element created
     */
    loadVideo(url: string): HTMLVideoElement;
    /**
     * Retrieves an image asset
     * @param url The asset URL
     * @returns The HTML Image element
     */
    getImage(url: string): HTMLImageElement;
    /**
     * Retrieves an audio asset
     * @param url The asset URL
     * @returns The HTML Audio element
     */
    getAudio(url: string): HTMLAudioElement;
    /**
     * Retrieves a font asset
     * @param url The asset URL
     * @returns The Font element
     */
    getFont(family: string): FontFace;
    /**
     * Retrieves a video asset
     * @param url The asset URL
     * @returns The HTML Video element
     */
    getVideo(url: string): HTMLVideoElement;
}

type Entity = number;
type Component = {
    [key: string]: any;
};
type ComponentType<T extends Component = Component> = {
    new (): T;
};
type SearchResult<T extends Component> = {
    entity: Entity;
    component: T;
};
interface IEntityManager {
    createEntity(): Entity;
    createEntity(componentTypes: ComponentType[]): Entity;
    createEntity(components: Component[]): Entity;
    removeEntity(entity: Entity): void;
    removeAllEntities(): void;
    isEntityEnabled(entity: Entity): boolean;
    enableEntity(entity: Entity): void;
    disableEntity(entity: Entity): void;
    addComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    addComponent<T extends Component>(entity: Entity, component: T): T;
    getComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    removeComponent(entity: Entity, componentType: ComponentType): void;
    removeComponent(entity: Entity, component: Component): void;
    search<T extends Component>(componentType: ComponentType<T>, includeDisabled?: boolean): SearchResult<T>[];
    searchInChildren<T extends Component>(parent: Entity, componentType: ComponentType<T>, includeDisabled?: boolean): SearchResult<T>[];
}

interface ISceneManager {
    addScene(name: string, systemTypes: SystemType[], openingScene?: boolean): void;
    loadScene(name: string): void;
    loadOpeningScene(): void;
    update(): void;
}

interface ITimeManager {
    /** @internal */
    fixedGameFramerate: number;
    /** @internal */
    fixedGameDeltaTime: number;
    /** @internal */
    fixedPhysicsFramerate: number;
    /** @internal */
    fixedPhysicsDeltaTime: number;
    /**
     * The scale on which time passes. The default value is 1.\
     * For example, if set to 2, the time will run at twice the speed.\
     * If set to 0.5, it will run at half the speed.\
     * If set to 0, everything associated with the time will stop.
     */
    timeScale: number;
    /** The time difference, in seconds, between the last frame and the current frame. */
    deltaTime: number;
    /** The time difference, in seconds, between the last physics frame and the current one. */
    physicsDeltaTime: number;
    /** The browser delta time affected by time scale. */
    renderDeltaTime: number;
    /** The time difference, in seconds, between the last frame and the current frame, unaffected by the scale. */
    unscaledDeltaTime: number;
    /** The time difference, in seconds, between the last physics frame and the current one, unaffected by the scale. */
    unscaledPhysicsDeltaTime: number;
    /** The time difference, in seconds, between the last frame of and the current frame recorded by the browser. */
    browserDeltaTime: number;
    /** @internal */
    updateForGame(time: number): void;
    /** @internal */
    updateForBrowser(time: number): void;
    /** @internal */
    updateForPhysics(time: number): void;
}

/**
 * Circumference shaped collider for 2d collisions.
 * @public
 * @category Components
 */
declare class BallCollider {
    /** Circumference radius */
    radius: number;
    /** X-Y axis offset */
    offset: Vector2;
    /** Collision layer*/
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** @internal */
    _collider: ICollider<Circumference>;
}

/**
 * Rectangle shaped collider for 2d collisions.
 * @public
 * @category Components
 */
declare class BoxCollider {
    /** Collision layer*/
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** Width of the rectangle */
    width: number;
    /** Height of the rectangle */
    height: number;
    /** X-Y axis offset */
    offset: Vector2;
    /** Rectangle rotation in radians */
    rotation: number;
    /** @internal */
    _collider: ICollider<Polygon>;
}

/**
 * Collider composed of lines defined by its vertices, for 2d collisions.
 * @public
 * @category Components
 */
declare class EdgeCollider {
    /** Collection of 2d vectors representing the vertices of the collider */
    vertexModel: Vector2[];
    /** X-Y axis offset */
    offset: Vector2;
    /** Edges rotation in radians */
    rotation: number;
    /** Collision layer */
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** @internal */
    _colliders: ICollider<Polygon>[];
}

/**
 * Polygon shaped Collider for 2d collisions. Only convex polygons are allowed.
 * @public
 * @category Components
 */
declare class PolygonCollider {
    /** Collection of 2d vectors representing the vertices of the collider */
    vertexModel: Vector2[];
    /** X-Y axis offset */
    offset: Vector2;
    /** Edges rotation in radians */
    rotation: number;
    /** Collision layer */
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** @internal */
    _collider: ICollider<Polygon>;
}

type ColliderComponent = BallCollider | BoxCollider | EdgeCollider | PolygonCollider;
interface ICollisionQueryManager {
    findCollisionsForCollider(collider: ColliderComponent): ICollision[];
    findCollisionsForColliderAndLayer(collider: ColliderComponent, layer: string): ICollision[];
}

declare enum SystemGroup {
    GameLogic = "GameLogic",
    GamePhysics = "GamePhysics",
    GamePreRender = "GamePreRender",
    Physics = "Physics",
    PostGameLogic = "PostGameLogic",
    PreGameLogic = "PreGameLogic",
    Render = "Render"
}
type SystemType<T extends ISystem = ISystem> = {
    new (...args: any[]): T;
};
interface ISystem {
    group: SystemGroup;
    enabled: boolean;
    onCreate(): void;
    onUpdate(): void;
    onDestroy(): void;
}
declare abstract class System implements ISystem {
    group: SystemGroup;
    private _enabled;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    onCreate(): void;
    onEnable(): void;
    onUpdate(): void;
    onDisable(): void;
    onDestroy(): void;
}
declare abstract class GameSystem extends System {
    protected entityManager: IEntityManager;
    protected assetManager: IAssetManager;
    protected sceneManager: ISceneManager;
    protected timeManager: ITimeManager;
    protected inputManager: IInputManager;
    protected collisionQueryManager: ICollisionQueryManager;
    constructor(entityManager: IEntityManager, assetManager: IAssetManager, sceneManager: ISceneManager, timeManager: ITimeManager, inputManager: IInputManager, collisionQueryManager: ICollisionQueryManager);
}
interface ISystemManager {
    addSystem<T extends ISystem>(system: T, enabled?: boolean): T;
    hasSystem<T extends ISystem>(systemType: SystemType<T>): boolean;
    enable<T extends ISystem>(systemType: SystemType<T>): void;
    disable<T extends ISystem>(systemType: SystemType<T>): void;
    remove<T extends ISystem>(systemType: SystemType<T>): void;
    update(group: SystemGroup): void;
}
declare function gameLogicSystem(): <T extends {
    new (...args: any[]): System;
}>(constructor: T) => T;
declare function gamePhysicsSystem(): <T extends {
    new (...args: any[]): System;
}>(constructor: T) => T;
declare function gamePeRenderSystem(): <T extends {
    new (...args: any[]): System;
}>(constructor: T) => T;

interface IGameConfig {
    /** HTML element where the game will be created */
    containerNode: HTMLElement;
    /** Game width */
    width: number;
    /** Game height */
    height: number;
    /** Enables the debug mode */
    debugEnabled?: boolean;
    /** Background color of canvas */
    canvasColor?: string;
    /** Framerate for physics execution. The allowed values are 60, 120, 180, 240.
     * The higher the framerate, the more accurate the physics will be, but it will consume more processor resources.
     * Default value is 180.
     */
    physicsFramerate?: number;
    /** Collision configuration options */
    collisions?: {
        /** Collision detection method: CollisionMethods.SAT or CollisionMethods.ABB. Default value is CollisionMethods.SAT */
        collisionMethod?: CollisionMethods;
        /** Define a fixed rectangular area for collision detection */
        collisionMatrix?: CollisionMatrix;
        /** Collision broad phase method: BroadPhaseMethods.QuadTree or BroadPhaseMethods.SpartialGrid. Default values is BroadPhaseMethods.SpartialGrid */
        collisionBroadPhaseMethod?: BroadPhaseMethods;
    };
}
interface IGame {
    running: boolean;
    start(): void;
    stop(): void;
    addSystem<T extends GameSystem>(systemType: SystemType<T>): T;
    addScene(name: string, systemTypes: SystemType[], openingScene?: boolean): void;
}

declare class RigidBody {
    type: RigidBodyType;
    velocity: Vector2;
    gravity: number;
    acceleration: Vector2;
}

declare class Transform {
    /** Position relative to the zero point of the simulated world, or relative to the parent if it has one */
    position: Vector2;
    /** Scale on x-axis and y-axis */
    scale: Vector2;
    /** Rotation expressed in radians */
    rotation: number;
    /** The real position in the simulated world. It has the same value as `position` property if there is no parent */
    localPosition: Vector2;
    /** The real scale in the simulated world. It has the same value as `scale` property if there is no parent */
    localScale: Vector2;
    /** The real rotation in the simulated world. It has the same value as `rotation` property if there is no parent */
    localRotation: number;
    private _parent;
    /** The parent transform. The position property became relative to this transform */
    get parent(): Transform;
    /** The parent transform. The position property became relative to this transform */
    set parent(parent: Transform);
}

declare class TilemapCollider {
    /** Generate colliders that represent the outer lines of the tile map */
    composite: boolean;
    /** Collision layer */
    layer: string;
}

declare const defaultRenderLayer = "Default";
declare class Camera {
    /** Layers to be rendered by this camera. Layers are rendered in ascending order */
    layers: string[];
    /** Camera zoom. Default value is 1 */
    zoom: number;
    /** In case you have more than one camera, the depth value determines which camera is rendered first. The lesser value, the first to render */
    depth: number;
}

declare class Animator {
    animations: Map<string, Animation>;
    defaultAnimation: string;
    animationToPlay: string;
    action: AnimatorAction;
    currentFrame: number;
    currentTime: number;
    currentAnimation: string;
}
type AnimatorAction = "stop" | "play" | "pause";
declare class Animation {
    image: HTMLImageElement | HTMLImageElement[];
    slice: AnimationSlice;
    frames: number[];
    fps: number;
    loop: boolean;
}
type AnimationSlice = {
    size: Vector2;
    offset: Vector2;
    padding: Vector2;
};

interface ICameraData {
    depth: number;
    layers: string[];
    position: Vector2;
    zoom?: number;
}

declare enum RenderLocation {
    WorldSpace = 0,
    ViewPort = 1
}
declare enum RenderDataType {
    Sprite = 0,
    Text = 1,
    Tilemap = 2,
    Mask = 3,
    Geometric = 4,
    Video = 5,
    Shadow = 6
}
interface IRenderData {
    type: RenderDataType;
    position: Vector2;
    location: RenderLocation;
    layer: string;
}

/**
 * @internal
 */
interface IRenderManager {
    addRenderData<T extends IRenderData>(data: T): void;
    addCameraData(data: ICameraData): void;
    render(): void;
    /** @deprecated use clearRenderData and clearCameraData instead */
    clearData(): void;
    clearRenderData(): void;
    clearCameraData(): void;
    clearScreen(hexColor: string): void;
    preloadTexture(image: HTMLImageElement, smooth?: boolean): void;
    canvas: HTMLCanvasElement | OffscreenCanvas;
}

/**
 * Mask shape: Rectangle or Circumference.
 * @category Components
 * @public
 */
declare enum MaskShape {
    Rectangle = 0,
    Circumference = 1
}

/**
 * Cut the image based on straight coordinates starting from the top left downward.
 * @category Components
 * @public
 */
interface Slice {
    /** Top left x coordinate */
    x: number;
    /** Top left y coordinate */
    y: number;
    /** The width to slice */
    width: number;
    /** The height to slice */
    height: number;
}

/**
 * Direction in which the text will be rendered.
 * @category Components
 * @public
 */
declare enum TextOrientation {
    Center = 0,
    RightUp = 1,
    RightDown = 2,
    RightCenter = 3
}

/**
 * Renders a filled shape (rectangle or circumference)
 * @public
 * @category Components
 * @example
 * ```js
 * maskRenderer.shape    = MaskShape.Rectangle;
 * maskRenderer.width    = 32;
 * maskRenderer.height   = 32;
 * maskRenderer.color    = "#000000";
 * maskRenderer.offset   = new Vector2(0, 0);
 * maskRenderer.rotation = 0;
 * maskRenderer.opacity  = 1;
 * maskRenderer.layer    = "Default";
 * ```
 * @example
 * ```js
 * maskRenderer.shape    = MaskShape.Circumference;
 * maskRenderer.radius   = 16;
 * maskRenderer.color    = "#000000";
 * maskRenderer.offset   = new Vector2(0, 0);
 * maskRenderer.opacity  = 1;
 * maskRenderer.layer    = "Default";
 * ```
 */
declare class MaskRenderer {
    /** Mask shape: Rectangle or Circumference */
    shape: MaskShape;
    /** Mask width in pixels */
    width: number;
    /** Mask height in pixels */
    height: number;
    /** Mask radius in pixels (only for circumference) */
    radius: number;
    /** The color of the mask */
    color: string;
    /** X-axis and Y-axis offset */
    offset: Vector2;
    /** Mask rotation in radians */
    rotation: number;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** The render layer */
    layer: string;
}

declare class SpriteRenderer {
    /** The render layer */
    layer: string;
    /** The image to render */
    image: HTMLImageElement;
    /** Cut the image based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** TRUE for smooth pixels (not recommended for pixel art) */
    smooth: boolean;
    /** X-axis and Y-axis offset */
    offset: Vector2;
    /** Flip the image horizontally */
    flipHorizontally: boolean;
    /** Flip the image vertically */
    flipVertically: boolean;
    /** Image rotation in radians */
    rotation: number;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** Define a mask color for the image */
    maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix: number;
    /** Define a color for tinting the sprite image */
    tintColor: string;
    /** Scale the image based on a vector */
    scale: Vector2;
    /** Overwrite the original image width */
    width: number;
    /** Overwrite the original image height */
    height: number;
}

/**
 * The TextRenderer component allows to render text using font families, colors, and other configuration options.
 * @public
 * @category Components
 * @example
 * ```js
 *   textRenderer.layer: "default";
 *   textRenderer.text: "Hello world!";
 *   textRenderer.font: "Arial";
 *   textRenderer.fontSize: 16;
 *   textRenderer.width: 160;
 *   textRenderer.height: 16;
 *   textRenderer.color: "#000000";
 *   textRenderer.offset: new Vector2();
 *   textRenderer.lineSeparation: 0;
 *   textRenderer.letterSpacing: 0;
 *   textRenderer.charRanges: [32, 126, 161, 255];
 *   textRenderer.smooth: false;
 *   textRenderer.rotation: 0;
 *   textRenderer.opacity: 1;
 *   textRenderer.orientation: TextOrientation.RightDown;
 *   textRenderer.bitmapMargin: new Vector2();
 *   textRenderer.bitmapSpacing: new Vector2();
 * ```
 */
declare class TextRenderer {
    /** The render layer */
    layer: string;
    /** The text to render */
    text: string;
    /** The font family to use */
    font: FontFace | string;
    /** The size of the font in pixels. */
    fontSize: number;
    /** The width of the invisible box where the text is rendered */
    width: number;
    /** The height of the invisible box where the text is rendered */
    height: number;
    /** X-axis and Y-axis offset */
    offset: Vector2;
    /** The text color */
    color: string;
    /** The separation between lines in pixels */
    lineSeparation: number;
    /** The space between chars in pixels */
    letterSpacing: number;
    /** Range of characters covered by the component defined in number pairs.
     * The default value is [32, 126, 161, 255], this means that the component
     * will render characters from 32 to 126 and from 161 to 255. */
    charRanges: number[];
    /** Smoothing pixels (not recommended for bitmap fonts) */
    smooth: boolean;
    /** Text rotation in radians */
    rotation: number;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** Direction in which the text will be rendered. */
    orientation: TextOrientation;
    /** Margin in pixels to correct badly sliced characters. */
    bitmapMargin: Vector2;
    /** Spacing in pixels to correct badly sliced characters. */
    bitmapSpacing: Vector2;
}

/**
 * The VideoRenderer component plays and renders a video element,
 * and allows configuring options such as its dimensions, coloring, etc.
 * @public
 * @category Components
 * @example
 * ```js
 * videoRenderer.video = this.assetManager.getVideo("video.mp4");
 * videoRenderer.width = 1920;
 * videoRenderer.height = 1080;
 * videoRenderer.offset = new Vector2(0, 0);
 * videoRenderer.flipHorizontally =  false;
 * videoRenderer.flipVertically = false;
 * videoRenderer.rotation = 0;
 * videoRenderer.opacity = 1;
 * videoRenderer.maskColor = "#FF0000";
 * videoRenderer.maskColorMix = 0;
 * videoRenderer.tintColor = "#00FF00";
 * videoRenderer.layer = "Default";
 * videoRenderer.slice = {x: 0, y:0, width: 1920, height: 1080};
 * videoRenderer.volume = 1;
 * videoRenderer.loop = false;
 * videoRenderer.play = true;
 * videoRenderer.pause = false;
 * ```
 */
declare class VideoRenderer {
    /**The video element to render */
    video: HTMLVideoElement;
    /** Overwrite the original video width */
    width: number;
    /** Overwrite the original video height */
    height: number;
    /** X-axis and Y-axis offset */
    offset: Vector2;
    /** Video rotation (degrees or radians) */
    rotation: number;
    /** Flip the video horizontally */
    flipHorizontally: boolean;
    /** Flip the video vertically */
    flipVertically: boolean;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** Define a mask color for the video */
    maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix: number;
    /** Define a color for tinting the video */
    tintColor: string;
    /** The render layer */
    layer: string;
    /** Cut the video based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** TRUE to play the video in loop */
    loop: boolean;
    /** The volume of the video (between 1 and 0) */
    volume: number;
    /** TRUE to play the video. If the video stops playing it becomes FALSE */
    play: boolean;
    /** TRUE to pause the video */
    pause: boolean;
}

/**
 * The TilemapRenderer component allows you to render a tile map defined by an array of tile ids, using an instance of the TileSet object.
 * @public
 * @category Components
 */
declare class TilemapRenderer {
    /** The render layer */
    layer: string;
    /** The Tileset instance */
    tileset: Tileset;
    /** Array of tiles. ID 0 (zero) represents empty space.*/
    data: number[];
    /** Array of tile data split into chunks */
    chunks: Chunk[];
    /** The width of the tilemap (in tiles) */
    width: number;
    /** The height of the tilemap (in tiles) */
    height: number;
    /** The width of the tile to render */
    tileWidth: number;
    /** The height of the tile to render */
    tileHeight: number;
    /** Define a color for tinting the tiles */
    tintColor: string;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** TRUE for smooth pixels (not recommended for pixel art) */
    smooth: boolean;
    /** @internal */
    _processed: boolean;
}
/**
 * Tileset configuration to be used with the TilemapRenderer
 * @public
 * @category Components
 */
type Tileset = {
    /** The tileset image element */
    image: HTMLImageElement;
    width: number;
    tileWidth: number;
    tileHeight: number;
    /** Margin of the tile in pixels (space in the top and the left) */
    margin?: Vector2;
    /** Spacing of the tile in pixels (space in the bottom and the right) */
    spacing?: Vector2;
};
/**
 * Chunk of tile data
 * @public
 * @category Components
 */
type Chunk = {
    /** Array of tiles. ID 0 (zero) represents empty space.*/
    data: number[];
    x: number;
    y: number;
    /** Chunk width (in tails) */
    width: number;
    /** Chunk height (in tails) */
    height: number;
};

declare class LightRenderer {
    radius: number;
    smooth: boolean;
    layer: string;
    intensity: number;
    _boundingBox: Rectangle;
}

declare class ShadowRenderer {
    width: number;
    height: number;
    color: string;
    opacity: number;
    layer: string;
    _boundingBox: Rectangle;
}

declare class Button {
    /** The shape of the button */
    shape: ButtonShape;
    /** Width in pixels. Only for rectangle shaped buttons */
    width: number;
    /** Height in pixels. Only for rectangle shaped buttons */
    height: number;
    /** Radius in pixels. Only for circumference shaped buttons */
    radius: number;
    /** Enables interaction with touch screens */
    touchEnabled: boolean;
    /** X-axis and Y-axis offset */
    offset: Vector2;
    /** TRUE if it's pressed */
    pressed: boolean;
    /** Function executed when the button's click */
    onClick: () => void;
    /** Function executed when the button is pressed */
    onPressed: () => void;
}
/** @category Components */
declare enum ButtonShape {
    Rectangle = 0,
    Circumference = 1
}

declare class TiledWrapper {
    tilemap: TiledTilemap;
    layerToRender: string;
}
/** @category Components */
interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: (TiledLayer | TiledObjectLayer)[];
    renderorder: string;
    tilesets: {
        firstgid: number;
    }[];
    tilewidth: number;
    tileheight: number;
    properties?: TiledProperty[];
}
/** @category Components */
interface TiledChunk {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    type?: string;
}
/** @category Components */
interface TiledLayer {
    name: string;
    id: number;
    chunks?: TiledChunk[];
    data?: number[];
    x: number;
    y: number;
    type: "tilelayer";
    width: number;
    height: number;
    opacity: number;
    visible: boolean;
    startx?: number;
    starty?: number;
    offsetx?: number;
    offsety?: number;
    tintcolor?: string;
    properties?: TiledProperty[];
}
/** @category Components */
interface TiledObjectLayer {
    draworder: string;
    id: number;
    name: string;
    objects: TiledObject[];
    opacity: number;
    type: "objectgroup";
    visible: true;
    x: number;
    y: number;
    properties?: TiledProperty[];
}
/** @category Components */
interface TiledObject {
    gid: number;
    height: number;
    id: number;
    name: string;
    rotation: number;
    type: string;
    visible: true;
    width: number;
    x: number;
    y: number;
    properties?: TiledProperty[];
}
/** @category Components */
interface TiledProperty {
    name: string;
    type: "int" | "bool" | "float" | "color" | "string";
    value: number | string | boolean;
}

declare class AudioPlayer {
    audioSource: HTMLAudioElement;
    volume: number;
    loop: boolean;
    action: AudioPlayerAction;
}
type AudioPlayerAction = "stop" | "play" | "pause" | "playing";

/** @internal */
interface ILoopManager {
    start(): void;
    stop(): void;
    running: boolean;
}

declare const createGame: (config: IGameConfig) => IGame;

export { Animation, type AnimationSlice, Animator, type AnimatorAction, AudioPlayer, type AudioPlayerAction, BallCollider, BoxCollider, BroadPhaseMethods, Button, ButtonShape, Camera, type Chunk, type CollisionMatrix, CollisionMethods, type Component, type ComponentType, EdgeCollider, type Entity, GameSystem, GamepadController, type IAssetManager, type ICollider, type ICollision, type ICollisionResolution, type IEntityManager, type IGame, type IGameConfig, type IInputManager, type ILoopManager, type IPhysicsManager, type IRenderManager, type ISceneManager, type ISystem, type ISystemManager, type ITimeManager, Keyboard, LightRenderer, MaskRenderer, MaskShape, Mouse, PolygonCollider, Rectangle, RigidBody, RigidBodyType, type SearchResult, ShadowRenderer, type Slice, SpriteRenderer, SystemGroup, type SystemType, TextOrientation, TextRenderer, type TiledChunk, type TiledLayer, type TiledObject, type TiledObjectLayer, type TiledProperty, type TiledTilemap, TiledWrapper, TilemapCollider, TilemapRenderer, type Tileset, type TouchInteraction, TouchScreen, Transform, Vector2, type VibrationInput, VideoRenderer, between, clamp, createGame, defaultRenderLayer, fixedRound, gameLogicSystem, gamePeRenderSystem, gamePhysicsSystem, randomFloat, randomInt, range };
