var AssetType;
(function (AssetType) {
    AssetType["Image"] = "Image";
    AssetType["Audio"] = "Audio";
    AssetType["Font"] = "Font";
    AssetType["Video"] = "Video";
})(AssetType || (AssetType = {}));
/** @internal */
export class AssetManager {
    constructor(renderManager) {
        this.renderManager = renderManager;
        this.assets = [];
    }
    getAssetsLoaded() {
        return this.assets.reduce((prev, asset) => prev && asset.loaded, true);
    }
    loadImage(url, preloadTexture = false) {
        const image = new Image();
        image.crossOrigin = "";
        image.src = url;
        const asset = this.createAsset(url, AssetType.Image, image);
        const loaded = () => {
            if (preloadTexture)
                this.renderManager.preloadTexture(image);
            asset.loaded = true;
        };
        if (image.naturalWidth) {
            loaded();
        }
        else {
            image.addEventListener("load", loaded);
        }
        return image;
    }
    loadAudio(url) {
        const audio = new Audio();
        audio.src = url;
        const asset = this.createAsset(url, AssetType.Audio, audio);
        if (audio.duration) {
            asset.loaded = true;
        }
        else {
            audio.addEventListener("canplaythrough", () => (asset.loaded = true));
        }
        return audio;
    }
    loadFont(family, url) {
        const font = new FontFace(family, `url(${url})`);
        const asset = this.createAsset(url, AssetType.Font, font);
        asset.family = family;
        font.load().then((font) => {
            // @ts-ignore
            document.fonts.add(font);
            asset.loaded = true;
        });
        return font;
    }
    loadVideo(url) {
        const video = document.createElement("video");
        video.playsInline = true;
        video.src = url;
        const asset = this.createAsset(url, AssetType.Video, video);
        if (video.duration) {
            asset.loaded = true;
        }
        else {
            video.addEventListener("canplaythrough", () => (asset.loaded = true));
        }
        return video;
    }
    getImage(url) {
        var _a;
        return (_a = this.assets.find((asset) => asset.type === AssetType.Image && asset.url === url)) === null || _a === void 0 ? void 0 : _a.element;
    }
    getAudio(url) {
        var _a;
        return (_a = this.assets.find((asset) => asset.type === AssetType.Audio && asset.url === url)) === null || _a === void 0 ? void 0 : _a.element;
    }
    getFont(family) {
        var _a;
        return (_a = this.assets.find((asset) => asset.type === AssetType.Font && asset.family === family)) === null || _a === void 0 ? void 0 : _a.element;
    }
    getVideo(url) {
        var _a;
        return (_a = this.assets.find((asset) => asset.type === AssetType.Video && asset.url === url)) === null || _a === void 0 ? void 0 : _a.element;
    }
    createAsset(url, type, element) {
        const asset = { type, url, element, loaded: false };
        this.assets.push(asset);
        return asset;
    }
}
//# sourceMappingURL=AssetManager.js.map