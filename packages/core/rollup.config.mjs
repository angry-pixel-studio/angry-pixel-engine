import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-del";

const builderECS = (format, filename) => ({
    exports: "named",
    name: "angry-pixel",
    file: "../../bundles/angry-pixel/lib/" + filename,
    format,
    sourcemap: true,
});

const main = () => {
    return [
        // this generates one file containing all the type declarations
        /*{
            input: "../../bundles/angry-pixel/types/index.d.ts",
            output: [
                {
                    file: "../../bundles/angry-pixel/lib/index.d.ts",
                    format: "es",
                },
            ],
            plugins: [dts(), del({ dest: "../../bundles/angry-pixel/types" })],
        },*/
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
                del({ dest: "dist" }),
                del({ dest: "../../packages/math/dist" }),
                del({ dest: "../../packages/input/dist" }),
                del({ dest: "../../packages/2d-physics/dist" }),
                del({ dest: "../../packages/2d-renderer/dist" }),
            ],
        },
        // this generates the modules
        {
            input: "src/index.ts",
            output: [
                builderECS("umd", "index.js"),
                builderECS("esm", "index.esm.js"),
                builderECS("cjs", "index.cjs.js"),
            ],
            external: [
                "@angry-pixel/math",
                "@angry-pixel/input",
                "@angry-pixel/2d-physics",
                "@angry-pixel/2d-renderer",
            ],
            plugins: [
                typescript({
                    tsconfig: "./tsconfig.json",
                    compilerOptions: {
                        declaration: false,
                        emitDeclarationOnly: false,
                    },
                }),
                nodeResolve({
                    extensions: [".ts", ".js"],
                    preferBuiltins: false,
                }),
                commonjs({ extensions: [".js"] }),
                terser(),
            ],
        },
    ];
};

export default main();
