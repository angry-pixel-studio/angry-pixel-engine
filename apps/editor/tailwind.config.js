/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Primary colors
                primary: {
                    50: "var(--color-primary-50)",
                    100: "var(--color-primary-100)",
                    200: "var(--color-primary-200)",
                    300: "var(--color-primary-300)",
                    400: "var(--color-primary-400)",
                    500: "var(--color-primary-500)",
                    600: "var(--color-primary-600)",
                    700: "var(--color-primary-700)",
                    800: "var(--color-primary-800)",
                    900: "var(--color-primary-900)",
                },
                // Background colors
                background: {
                    primary: "var(--color-background-primary)",
                    secondary: "var(--color-background-secondary)",
                    tertiary: "var(--color-background-tertiary)",
                    elevated: "var(--color-background-elevated)",
                },
                // Surface colors
                surface: {
                    primary: "var(--color-surface-primary)",
                    secondary: "var(--color-surface-secondary)",
                    tertiary: "var(--color-surface-tertiary)",
                    elevated: "var(--color-surface-elevated)",
                },
                // Text colors
                text: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    tertiary: "var(--color-text-tertiary)",
                    inverse: "var(--color-text-inverse)",
                },
                // Border colors
                border: {
                    primary: "var(--color-border-primary)",
                    secondary: "var(--color-border-secondary)",
                    tertiary: "var(--color-border-tertiary)",
                },
                // Accent colors
                accent: {
                    success: "var(--color-accent-success)",
                    warning: "var(--color-accent-warning)",
                    error: "var(--color-accent-error)",
                    info: "var(--color-accent-info)",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },
            boxShadow: {
                soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
                medium: "0 4px 16px rgba(0, 0, 0, 0.1)",
                strong: "0 8px 32px rgba(0, 0, 0, 0.15)",
            },
        },
    },
    plugins: [],
};
