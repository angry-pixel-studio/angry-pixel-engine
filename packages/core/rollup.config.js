import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-del";

const builder = (format, filename) => {
    return {
        exports: "named",
        name: "AngryPixelCore",
        file: "lib/" + filename,
        format,
        sourcemap: true,
    };
};

export default [
    {
        input: "src/index.ts",
        output: [builder("umd", "index.js"), builder("esm", "index.esm.js"), builder("cjs", "index.cjs.js")],
        plugins: [
            nodeResolve({ preferBuiltins: false }),
            typescript(),
            commonjs({ extensions: [".ts", ".js"] }),
            terser(),
        ],
    },
    {
        input: "lib/types/index.d.ts",
        output: [
            {
                file: "lib/index.d.ts",
                format: "es",
            },
        ],
        plugins: [dts(), del({ dest: "lib/types" })],
    },
];
