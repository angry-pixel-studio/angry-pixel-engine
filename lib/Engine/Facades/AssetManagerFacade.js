"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManagerFacade = void 0;
var Game_1 = require("../Game");
var AssetManagerFacade = /** @class */ (function () {
    function AssetManagerFacade() {
    }
    AssetManagerFacade.initialize = function () {
        this.assetManager = Game_1.container.getSingleton("AssetManager");
    };
    AssetManagerFacade.getAssetsLoaded = function () {
        return this.assetManager.getAssetsLoaded();
    };
    AssetManagerFacade.createImage = function (url) {
        return this.assetManager.createImage(url);
    };
    AssetManagerFacade.createAudio = function (url) {
        return this.assetManager.createAudio(url);
    };
    AssetManagerFacade.createVideo = function (url) {
        return this.assetManager.createVideo(url);
    };
    AssetManagerFacade.getImage = function (url) {
        return this.assetManager.getImage(url);
    };
    AssetManagerFacade.getVideo = function (url) {
        return this.assetManager.getVideo(url);
    };
    AssetManagerFacade.getAudio = function (url) {
        return this.assetManager.getAudio(url);
    };
    AssetManagerFacade.assetManager = null;
    return AssetManagerFacade;
}());
exports.AssetManagerFacade = AssetManagerFacade;
//# sourceMappingURL=AssetManagerFacade.js.map