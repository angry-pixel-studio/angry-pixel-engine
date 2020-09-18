import Rectangle from "../../Helper/Rectangle";

export default interface ICollider {
    collidesWith(other: ICollider): boolean;
    getRectangle(): Rectangle;
}
