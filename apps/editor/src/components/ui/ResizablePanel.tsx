import { useState, useRef, useEffect } from "react";

interface ResizablePanelProps {
    children: React.ReactNode;
    direction: "horizontal" | "vertical";
    minSize?: number;
    maxSize?: number;
    initialSize?: number;
    onResize?: (size: number) => void;
    className?: string;
    resizeHandlePosition: "left" | "right" | "top" | "bottom";
}

const ResizablePanel = ({
    children,
    direction,
    minSize = 100,
    maxSize = 1000,
    initialSize,
    onResize,
    className = "",
    resizeHandlePosition,
}: ResizablePanelProps) => {
    const [size, setSize] = useState(initialSize || 200);
    const [isResizing, setIsResizing] = useState(false);
    const startPos = useRef(0);
    const startSize = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        startPos.current = direction === "horizontal" ? e.clientX : e.clientY;
        startSize.current = size;
        document.body.style.cursor = direction === "horizontal" ? "ew-resize" : "ns-resize";
        document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
        const delta = currentPos - startPos.current;

        let newSize: number;

        if (resizeHandlePosition === "left" || resizeHandlePosition === "top") {
            newSize = startSize.current - delta;
        } else {
            newSize = startSize.current + delta;
        }

        newSize = Math.max(minSize, Math.min(maxSize, newSize));
        setSize(newSize);
        onResize?.(newSize);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);

    const getResizeHandleStyle = () => {
        const baseStyle = "absolute bg-gray-300 hover:bg-blue-500 transition-colors cursor-ew-resize";

        if (direction === "horizontal") {
            if (resizeHandlePosition === "left") {
                return `${baseStyle} left-0 top-0 bottom-0 w-1 cursor-ew-resize`;
            } else {
                return `${baseStyle} right-0 top-0 bottom-0 w-1 cursor-ew-resize`;
            }
        } else {
            if (resizeHandlePosition === "top") {
                return `${baseStyle} top-0 left-0 right-0 h-1 cursor-ns-resize`;
            } else {
                return `${baseStyle} bottom-0 left-0 right-0 h-1 cursor-ns-resize`;
            }
        }
    };

    const getPanelStyle = () => {
        if (direction === "horizontal") {
            return { width: `${size}px` };
        } else {
            return { height: `${size}px` };
        }
    };

    return (
        <div className={`relative ${className}`} style={getPanelStyle()}>
            {children}
            <div className={getResizeHandleStyle()} onMouseDown={handleMouseDown} title="Drag to resize" />
        </div>
    );
};

export default ResizablePanel;
