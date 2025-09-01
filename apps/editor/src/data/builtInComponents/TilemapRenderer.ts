import { BuiltInComponent, Component, PropertyType } from "../../types/component";

export const tilemapRenderer: Component = {
    name: BuiltInComponent.TilemapRenderer,
    displayName: "Tilemap Renderer",
    properties: [
        {
            name: "tileset",
            displayName: "Tileset",
            type: PropertyType.Button,
            options: { buttonLabel: "Edit" },
        },
        {
            name: "data",
            displayName: "Tilemap",
            type: PropertyType.Button,
            options: { buttonLabel: "Edit" },
        },
        {
            name: "layer",
            displayName: "Layer",
            type: PropertyType.String,
            defaultValue: "Default",
        },
        {
            name: "tileWidth",
            displayName: "Tile Width",
            type: PropertyType.Number,
            options: { min: 0 },
        },
        {
            name: "tileHeight",
            displayName: "Tile Height",
            type: PropertyType.Number,
            options: { min: 0 },
        },
        {
            name: "tintColor",
            displayName: "Tint Color",
            type: PropertyType.Color,
            defaultValue: "#FFFFFF",
        },
        {
            name: "maskColor",
            displayName: "Mask Color",
            type: PropertyType.Color,
            defaultValue: "#FFFFFF",
        },
        {
            name: "maskColorMix",
            displayName: "Mask Color Mix",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
        },
        {
            name: "opacity",
            displayName: "Opacity",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 1,
        },
        {
            name: "smooth",
            displayName: "Smooth",
            type: PropertyType.Boolean,
            defaultValue: false,
        },
    ],
};
