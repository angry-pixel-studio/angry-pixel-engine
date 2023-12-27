import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const builder = (format, filename) => ({
    exports: "named",
    name: "AngryPixel2dPhysics",
    file: "lib/" + filename,
    format,
});

export default {
    input: "src/index.ts",
    output: [builder("umd", "index.js"), builder("esm", "index.esm.js"), builder("cjs", "index.cjs.js")],
    plugins: [nodeResolve({ preferBuiltins: false }), typescript(), commonjs({ extensions: [".ts", ".js"] }), terser()],
};
