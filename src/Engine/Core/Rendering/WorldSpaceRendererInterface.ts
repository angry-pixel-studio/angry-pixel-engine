import Rectangle from "../../Helper/Rectangle";
import RenderData from "./RenderData";

export default interface WorldSpaceRendererInterface {
    renderImage(RenderData: RenderData, worldSpaceViewRect: Rectangle): void;
    renderText(RenderData: RenderData, worldSpaceViewRect: Rectangle): void;
    renderGeometric(RenderData: RenderData, worldSpaceViewRect: Rectangle): void;
}