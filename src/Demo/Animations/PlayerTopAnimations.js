import Sprite from "../../Engine/Sprite";
import Animation from "../../Engine/Animation";
import Vector2 from "../../Engine/Helper/Vector2";

const image = new Image();
image.src = "image/demo/player-top-down.png";

const config = {
    image: image,
    scale: new Vector2(2, 2),
    smooth: false,
};

export const PlayerWalking = new Animation({
    sprites: [
        new Sprite({
            ...config,
            slice: { x: 32, y: 0, width: 32, height: 32 },
        }),
        new Sprite({
            ...config,
            slice: { x: 64, y: 0, width: 32, height: 32 },
        }),
        new Sprite({
            ...config,
            slice: { x: 96, y: 0, width: 32, height: 32 },
        }),
        new Sprite({
            ...config,
            slice: { x: 128, y: 0, width: 32, height: 32 },
        }),
        new Sprite({
            ...config,
            slice: { x: 160, y: 0, width: 32, height: 32 },
        }),
        new Sprite({ ...config, slice: { x: 0, y: 0, width: 32, height: 32 } }),
    ],
    speed: 0.4,
    loop: true,
});
