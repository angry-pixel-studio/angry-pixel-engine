import { SpriteRenderer, Transform } from "angry-pixel";
import { MoveAndBounce } from "@component/MoveAndBounce";

export const logo = [
    Transform,
    new SpriteRenderer({
        image: "image/angry-pixel.png",
    }),
    MoveAndBounce,
];
