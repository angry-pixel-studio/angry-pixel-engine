import Sprite from "../../Engine/Sprite";
import Animation from "../../Engine/Animation";

const image = new Image();
image.src = 'image/demo/player.png';

const config = {
    image: image,
    width: 64,
    height: 64,
    smooth: false
}

export const PlayerWalking = new Animation(
    {
        sprites: [
            new Sprite({...config, slice: {x: 0, y: 0, width: 16, height: 16}}),
            new Sprite({...config, slice: {x: 16, y: 0, width: 16, height: 16}}),
            new Sprite({...config, slice: {x: 32, y: 0, width: 16, height: 16}}),
            new Sprite({...config, slice: {x: 16, y: 0, width: 16, height: 16}})
        ],
        speed: 0.4,
        loop: true,
    }
);