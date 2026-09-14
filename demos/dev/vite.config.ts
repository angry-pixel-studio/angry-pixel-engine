import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    base: "./",
    server: {
        port: 3003,
        host: true,
    },
});
