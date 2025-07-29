import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-del";
import alias from "@rollup/plugin-alias";
import path from "path";

const builderECS = (format, filename) => ({
    exports: "named",
    name: "angry-pixel",
    file: "../../bundles/angry-pixel/lib/" + filename,
    format,
    sourcemap: true,
});

const main = () => {
    return [
        // this generates the modules
        {
            input: "src/index.ts",
            output: [
                builderECS("umd", "index.js"),
                builderECS("esm", "index.esm.js"),
                builderECS("cjs", "index.cjs.js"),
            ],
            plugins: [
                alias({
                    entries: [
                        {
                            find: "@angry-pixel/math",
                            replacement: path.resolve("../../packages/math/dist/index.js"),
                        },
                        {
                            find: "@angry-pixel/input",
                            replacement: path.resolve("../../packages/input/dist/index.js"),
                        },
                        {
                            find: "@angry-pixel/2d-physics",
                            replacement: path.resolve("../../packages/2d-physics/dist/index.js"),
                        },
                        {
                            find: "@angry-pixel/2d-renderer",
                            replacement: path.resolve("../../packages/2d-renderer/dist/index.js"),
                        },
                    ],
                }),
                typescript({
                    compilerOptions: {
                        declaration: false,
                        emitDeclarationOnly: false,
                        declarationDir: undefined,
                    },
                }),
                nodeResolve({
                    extensions: [".ts"],
                    preferBuiltins: false,
                }),
                commonjs({ extensions: [".js"] }),
                terser(),
            ],
        },
        // this generates one file containing all the type declarations
        {
            input: "dist/index.d.ts",
            output: {
                file: "../../bundles/angry-pixel/lib/index.d.ts",
                format: "es",
            },
            plugins: [
                dts({
                    respectExternal: false,
                    compilerOptions: {
                        baseUrl: ".",
                        paths: {
                            "@angry-pixel/*": ["../../packages/*/dist"],
                        },
                    },
                }),
                del({ dest: "../../packages/**/dist" }),
                del({ dest: "../../packages/**/tsconfig.tsbuildinfo" }),
            ],
        },
    ];
};

export default main();
