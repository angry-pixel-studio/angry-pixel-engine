"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeManager = exports.DomManager = exports.AssetManager = exports.InputManager = exports.SceneManager = exports.Game = void 0;
// helpers and libs
__exportStar(require("./Engine/Helper/Vector2"), exports);
__exportStar(require("./Engine/Libs/Geometric/Shapes/Rectangle"), exports);
// main
var Game_1 = require("./Engine/Game");
Object.defineProperty(exports, "Game", { enumerable: true, get: function () { return Game_1.Game; } });
__exportStar(require("./Engine/Scene"), exports);
__exportStar(require("./Engine/GameObject"), exports);
__exportStar(require("./Engine/Component"), exports);
__exportStar(require("./Engine/Sprite"), exports);
__exportStar(require("./Engine/Animation"), exports);
__exportStar(require("./Engine/Tileset"), exports);
// components
__exportStar(require("./Engine/Components/Colliders/BoxCollider"), exports);
__exportStar(require("./Engine/Components/Colliders/TilemapCollider"), exports);
__exportStar(require("./Engine/Components/Renderer/SpriteRenderer"), exports);
__exportStar(require("./Engine/Components/Renderer/TextRenderer"), exports);
__exportStar(require("./Engine/Components/Renderer/TiledTilemapRenderer"), exports);
__exportStar(require("./Engine/Components/Renderer/CsvTilemapRenderer"), exports);
__exportStar(require("./Engine/Components/Renderer/Tilemap/TiledTilemap"), exports);
__exportStar(require("./Engine/Components/Animator"), exports);
__exportStar(require("./Engine/Components/AudioPlayer"), exports);
__exportStar(require("./Engine/Components/Camera"), exports);
__exportStar(require("./Engine/Components/RigidBody"), exports);
__exportStar(require("./Engine/Components/Transform"), exports);
// game objects
__exportStar(require("./Engine/GameObjects/GameCamera"), exports);
// facades
var SceneManagerFacade_1 = require("./Engine/Facades/SceneManagerFacade");
Object.defineProperty(exports, "SceneManager", { enumerable: true, get: function () { return SceneManagerFacade_1.SceneManagerFacade; } });
var InputManagerFacade_1 = require("./Engine/Facades/InputManagerFacade");
Object.defineProperty(exports, "InputManager", { enumerable: true, get: function () { return InputManagerFacade_1.InputManagerFacade; } });
var AssetManagerFacade_1 = require("./Engine/Facades/AssetManagerFacade");
Object.defineProperty(exports, "AssetManager", { enumerable: true, get: function () { return AssetManagerFacade_1.AssetManagerFacade; } });
var DomManagerFacade_1 = require("./Engine/Facades/DomManagerFacade");
Object.defineProperty(exports, "DomManager", { enumerable: true, get: function () { return DomManagerFacade_1.DomManagerFacade; } });
var TimeManagerFacade_1 = require("./Engine/Facades/TimeManagerFacade");
Object.defineProperty(exports, "TimeManager", { enumerable: true, get: function () { return TimeManagerFacade_1.TimeManagerFacade; } });
// input
__exportStar(require("./Engine/Core/Input/KeyboardController"), exports);
__exportStar(require("./Engine/Core/Input/MouseController"), exports);
__exportStar(require("./Engine/Core/Input/GamepadController"), exports);
//# sourceMappingURL=index.js.map