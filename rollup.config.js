import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const builder = (format, filename) => ({
    exports: "named",
    name: "MiniEngine",
    file: "lib/" + filename,
    format,
});

export default {
    input: "src/index.ts",
    output: [builder("umd", "index.js"), builder("esm", "index.esm.js"), builder("cjs", "index.cjs.js")],
    plugins: [
        resolve({ preferBuiltins: false }),
        builtins(),
        typescript(),
        commonjs({ extensions: [".ts", ".js"] }),
        terser(),
    ],
};
