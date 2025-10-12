import { ReactNode } from "react";

export interface ContextMenuItem {
    id: string;
    label?: string;
    icon?: ReactNode;
    disabled?: boolean;
    separator?: boolean;
    onClick?: () => void;
    children?: ContextMenuItem[];
}

export interface ContextMenuProps {
    items: ContextMenuItem[];
    position: { x: number; y: number };
    visible: boolean;
    onClose: () => void;
    className?: string;
}

export interface ContextMenuContextType {
    showContextMenu: (items: ContextMenuItem[], position: { x: number; y: number }) => void;
    hideContextMenu: () => void;
    isVisible: boolean;
    items: ContextMenuItem[];
    position: { x: number; y: number };
}

export interface ContextMenuProviderProps {
    children: ReactNode;
}
