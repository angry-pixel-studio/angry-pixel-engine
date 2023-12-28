import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-del";
import { execSync } from "child_process";

const builder = (format, filename) => ({
    exports: "named",
    name: "AngryPixel",
    file: "bundles/angry-pixel/lib/" + filename,
    format,
    sourcemap: true,
});

const main = () => {
    [
        "@angry-pixel/math",
        "@angry-pixel/2d-physics",
        "@angry-pixel/2d-renderer",
        "@angry-pixel/input",
        "@angry-pixel/core",
    ].forEach((pkg) => {
        execSync(`yarn workspace ${pkg} run build`);
    });

    return [
        {
            input: "bundles/angry-pixel/src/index.ts",
            output: [builder("umd", "index.js"), builder("esm", "index.esm.js"), builder("cjs", "index.cjs.js")],
            plugins: [
                nodeResolve({ preferBuiltins: false }),
                typescript(),
                commonjs({ extensions: [".ts", ".js"] }),
                terser(),
            ],
        },
        {
            input: "bundles/angry-pixel/lib/types/bundles/angry-pixel/src/index.d.ts",
            output: [
                {
                    file: "bundles/angry-pixel/lib/index.d.ts",
                    format: "es",
                },
            ],
            plugins: [dts(), del({ dest: "bundles/angry-pixel/lib/types" })],
        },
    ];
};

export default main();
