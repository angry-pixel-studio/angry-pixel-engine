import GameObject from "../../../Engine/GameObject";
import TextRenderer from "../../../Engine/Components/Renderer/TextRenderer";
import SpriteRenderer from "../../../Engine/Components/Renderer/SpriteRenderer";
import Sprite from "../../../Engine/Sprite";
import Vector2 from "../../../Engine/Helper/Vector2";
import { container, gameCanvas } from "../../../Engine/Game";

export default class PlayerStats extends GameObject {
    assetManager = container.getSingleton("AssetManager");

    constructor() {
        super();

        this.ui = true;

        this.addComponent(
            () =>
                new TextRenderer({
                    text: ["Life: 100", "Ammo: 50"],
                    color: "#FFFFFF",
                    size: 16,
                    font: "PressStart2P-Regular",
                }),
            "TextRenderer"
        );

        this.addComponent(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: this.assetManager.getImage("image/demo/avatar.png"),
                        scale: new Vector2(2, 2),
                        smooth: false,
                    }),
                    offsetX: -32,
                }),
            "SpriteRenderer"
        );
    }

    start() {
        this.transform.position.set(100 - gameCanvas.clientWidth / 2, gameCanvas.clientHeight / 2 - 50);
    }
}
