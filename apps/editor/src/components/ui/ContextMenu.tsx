import React, { useEffect, useRef, useState } from "react";
import { ContextMenuItem, ContextMenuProps } from "../../types/contextMenu";
import Icon from "./Icon";
import { ChevronRight } from "lucide-react";

const ContextMenu: React.FC<ContextMenuProps> = ({ items, position, visible, onClose, className = "" }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [submenuStates, setSubmenuStates] = useState<Record<string, boolean>>({});

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("contextmenu", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("contextmenu", handleClickOutside);
        };
    }, [visible, onClose]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [visible, onClose]);

    // Adjust position to keep menu within viewport
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        if (menuRef.current && visible) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let x = position.x;
            let y = position.y;

            // Adjust horizontal position
            if (x + menuRect.width > viewportWidth) {
                x = viewportWidth - menuRect.width - 10;
            }

            // Adjust vertical position
            if (y + menuRect.height > viewportHeight) {
                y = viewportHeight - menuRect.height - 10;
            }

            setAdjustedPosition({ x: Math.max(10, x), y: Math.max(10, y) });
        }
    }, [position, visible]);

    const handleItemClick = (item: ContextMenuItem) => {
        if (item.disabled) return;

        if (item.children && item.children.length > 0) {
            // Toggle submenu
            setSubmenuStates((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
            }));
        } else if (item.onClick) {
            item.onClick();
            onClose();
        }
    };

    const handleSubmenuClose = (itemId: string) => {
        setSubmenuStates((prev) => ({
            ...prev,
            [itemId]: false,
        }));
    };

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            className={`fixed z-50 bg-surface-elevated border border-border-secondary rounded-lg shadow-lg py-1 min-w-48 ${className}`}
            style={{
                left: adjustedPosition.x,
                top: adjustedPosition.y,
            }}
        >
            {items.map((item, index) => {
                if (item.separator) {
                    return <div key={`separator-${index}`} className="my-1 border-t border-border-secondary" />;
                }

                return (
                    <div key={item.id} className="relative">
                        <button
                            className={`w-full px-2 py-1 text-left text-xs flex items-center justify-between hover:bg-surface-primary transition-colors duration-100 ${
                                item.disabled
                                    ? "text-text-tertiary cursor-not-allowed"
                                    : "text-text-primary cursor-pointer"
                            }`}
                            onClick={() => handleItemClick(item)}
                            disabled={item.disabled}
                        >
                            <div className="flex items-center space-x-2">
                                {item.icon && (
                                    <div className="flex-shrink-0">
                                        {typeof item.icon === "string" ? (
                                            <Icon icon={item.icon as any} size="sm" />
                                        ) : (
                                            item.icon
                                        )}
                                    </div>
                                )}
                                <span>{item.label}</span>
                            </div>
                            {item.children && item.children.length > 0 && (
                                <ChevronRight className="w-4 h-4 text-text-tertiary" />
                            )}
                        </button>

                        {/* Submenu */}
                        {item.children && item.children.length > 0 && submenuStates[item.id] && (
                            <div className="absolute left-full top-0 ml-1 bg-surface-elevated border border-border-primary rounded-lg shadow-lg py-1 min-w-48 z-60">
                                {item.children.map((subItem, subIndex) => {
                                    if (subItem.separator) {
                                        return (
                                            <div
                                                key={`sub-separator-${subIndex}`}
                                                className="my-1 border-t border-border-secondary"
                                            />
                                        );
                                    }

                                    return (
                                        <button
                                            key={subItem.id}
                                            className={`w-full px-3 py-2 text-left text-xs flex items-center space-x-2 hover:bg-surface-secondary transition-colors duration-150 ${
                                                subItem.disabled
                                                    ? "text-text-tertiary cursor-not-allowed"
                                                    : "text-text-primary cursor-pointer"
                                            }`}
                                            onClick={() => {
                                                if (subItem.onClick) {
                                                    subItem.onClick();
                                                    onClose();
                                                }
                                            }}
                                            disabled={subItem.disabled}
                                        >
                                            {subItem.icon && (
                                                <div className="flex-shrink-0">
                                                    {typeof subItem.icon === "string" ? (
                                                        <Icon icon={subItem.icon as any} size="sm" />
                                                    ) : (
                                                        subItem.icon
                                                    )}
                                                </div>
                                            )}
                                            <span>{subItem.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ContextMenu;
