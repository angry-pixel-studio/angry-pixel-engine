"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = exports.AssetType = void 0;
var AssetType;
(function (AssetType) {
    AssetType["Image"] = "Image";
    AssetType["Audio"] = "Audio";
    AssetType["Video"] = "Video";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
var Asset = /** @class */ (function () {
    function Asset() {
        this.type = null;
        this.url = null;
        this.loaded = false;
        this.element = null;
    }
    return Asset;
}());
var AssetManager = /** @class */ (function () {
    function AssetManager() {
        this.assets = [];
    }
    AssetManager.prototype.getAssetsLoaded = function () {
        return this.assets.reduce(function (prev, asset) { return prev && asset.loaded; }, true);
    };
    AssetManager.prototype.createImage = function (url) {
        var asset = this.createAsset(url, AssetType.Image);
        asset.element = new Image();
        asset.element.src = url;
        if (asset.element.naturalWidth) {
            asset.loaded = true;
        }
        else {
            asset.element.addEventListener("load", function () { return (asset.loaded = true); });
        }
        return asset.element;
    };
    AssetManager.prototype.createAudio = function (url) {
        var asset = this.createAsset(url, AssetType.Audio);
        asset.element = new Audio();
        asset.element.src = url;
        if (asset.element.duration) {
            asset.loaded = true;
        }
        else {
            asset.element.addEventListener("canplaythrough", function () { return (asset.loaded = true); });
        }
        return asset.element;
    };
    AssetManager.prototype.createVideo = function (url) {
        var asset = this.createAsset(url, AssetType.Video);
        asset.element = document.createElement("video");
        asset.element.src = url;
        if (asset.element.duration) {
            asset.loaded = true;
        }
        else {
            asset.element.addEventListener("canplaythrough", function () { return (asset.loaded = true); });
        }
        return asset.element;
    };
    AssetManager.prototype.getImage = function (url) {
        return this.getAsset(url, AssetType.Image);
    };
    AssetManager.prototype.getVideo = function (url) {
        return this.getAsset(url, AssetType.Video);
    };
    AssetManager.prototype.getAudio = function (url) {
        return this.getAsset(url, AssetType.Audio);
    };
    AssetManager.prototype.getAsset = function (url, type) {
        if (type === void 0) { type = null; }
        return this.assets.reduce(function (prev, asset) {
            return asset.url === url && (type === null || type === asset.type) ? asset : prev;
        }, null).element;
    };
    AssetManager.prototype.createAsset = function (url, type) {
        var asset = new Asset();
        asset.type = type;
        asset.url = url;
        this.assets.push(asset);
        return asset;
    };
    return AssetManager;
}());
exports.AssetManager = AssetManager;
//# sourceMappingURL=AssetManager.js.map