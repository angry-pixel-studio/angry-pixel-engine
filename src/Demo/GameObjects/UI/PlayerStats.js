import GameObject from "../../../Engine/GameObject";
import TextRenderer from "../../../Engine/Components/Renderer/TextRenderer";
import SpriteRenderer from "../../../Engine/Components/Renderer/SpriteRenderer";
import Sprite from "../../../Engine/Sprite";
import Vector2 from "../../../Engine/Helper/Vector2";
import AssetManager from "../../../Engine/AssetManager";

export default class PlayerStats extends GameObject {
    constructor() {
        super();

        this.ui = true;

        this.addComponent(
            () =>
                new TextRenderer({
                    text: ["Life: 100", "Ammo: 50"],
                    color: "#FFFFFF",
                    size: 20,
                    width: 200,
                    height: 200,
                    font: "Courier New",
                }),
            "TextRenderer"
        );

        this.addComponent(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: AssetManager.getImage("image/demo/avatar.png"),
                        scale: new Vector2(2, 2),
                        smooth: false,
                    }),
                    offsetX: -32,
                }),
            "SpriteRenderer"
        );
    }

    start(event) {
        this.transform.position.set(100 - event.canvas.clientWidth / 2, event.canvas.clientHeight / 2 - 50);
    }
}
