import React, { createContext, useState } from "react";
import { ContextMenuContextType, ContextMenuProviderProps, ContextMenuItem } from "../types/contextMenu";
import ContextMenu from "../components/ui/ContextMenu";

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [items, setItems] = useState<ContextMenuItem[]>([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const showContextMenu = (menuItems: ContextMenuItem[], menuPosition: { x: number; y: number }) => {
        setItems(menuItems);
        setPosition(menuPosition);
        setIsVisible(true);
    };

    const hideContextMenu = () => {
        setIsVisible(false);
        setItems([]);
    };

    const contextValue: ContextMenuContextType = {
        showContextMenu,
        hideContextMenu,
        isVisible,
        items,
        position,
    };

    return (
        <ContextMenuContext.Provider value={contextValue}>
            {children}
            <ContextMenu items={items} position={position} visible={isVisible} onClose={hideContextMenu} />
        </ContextMenuContext.Provider>
    );
};

export { ContextMenuContext };
