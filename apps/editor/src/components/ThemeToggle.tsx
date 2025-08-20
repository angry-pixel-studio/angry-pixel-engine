import { useState, useRef, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";
import Icon from "./icons/Icon";

const ThemeToggle = () => {
    const { theme, changeTheme, isDark, isLight, isSystem } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getThemeIcon = () => {
        if (isDark) return Moon;
        if (isLight) return Sun;
        return Monitor;
    };

    const getThemeLabel = () => {
        if (isDark) return "Dark";
        if (isLight) return "Light";
        return "System";
    };

    const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
        changeTheme(newTheme);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors focus:outline-none"
                title="Toggle theme"
            >
                <Icon icon={getThemeIcon()} size="lg" />
                <span className="hidden sm:inline">{getThemeLabel()}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-surface-elevated border border-border-primary rounded-lg shadow-medium z-50">
                    <div className="py-1">
                        <button
                            onClick={() => handleThemeChange("light")}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary transition-colors ${
                                isLight ? "text-primary-600 bg-primary-50" : "text-text-secondary"
                            }`}
                        >
                            <Icon icon={Sun} size="sm" className="mr-2 inline" />
                            Light
                        </button>
                        <button
                            onClick={() => handleThemeChange("dark")}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary transition-colors ${
                                isDark ? "text-primary-600 bg-primary-50" : "text-text-secondary"
                            }`}
                        >
                            <Icon icon={Moon} size="sm" className="mr-2 inline" />
                            Dark
                        </button>
                        <button
                            onClick={() => handleThemeChange("system")}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary transition-colors ${
                                isSystem ? "text-primary-600 bg-primary-50" : "text-text-secondary"
                            }`}
                        >
                            <Icon icon={Monitor} size="sm" className="mr-2 inline" />
                            System
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeToggle;
