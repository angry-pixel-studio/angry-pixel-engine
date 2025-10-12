import { useContext } from "react";
import { ContextMenuContext } from "../providers/ContextMenuProvider";
import { ContextMenuItem } from "../types/contextMenu";

export const useContextMenu = () => {
    const context = useContext(ContextMenuContext);

    if (!context) {
        throw new Error("useContextMenu must be used within a ContextMenuProvider");
    }

    const showContextMenu = (items: ContextMenuItem[], position: { x: number; y: number }) => {
        context.showContextMenu(items, position);
    };

    const hideContextMenu = () => {
        context.hideContextMenu();
    };

    return {
        showContextMenu,
        hideContextMenu,
        isVisible: context.isVisible,
        items: context.items,
        position: context.position,
    };
};
