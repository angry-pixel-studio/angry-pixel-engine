import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
            return savedTheme;
        }

        // Default to system preference
        return "system";
    });

    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const updateTheme = () => {
            let newTheme: "light" | "dark";

            if (theme === "system") {
                newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            } else {
                newTheme = theme;
            }

            setResolvedTheme(newTheme);

            // Apply theme to document
            if (newTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };

        updateTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                updateTheme();
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        changeTheme(newTheme);
    };

    return {
        theme,
        resolvedTheme,
        changeTheme,
        toggleTheme,
        isDark: resolvedTheme === "dark",
        isLight: resolvedTheme === "light",
        isSystem: theme === "system",
    };
};
