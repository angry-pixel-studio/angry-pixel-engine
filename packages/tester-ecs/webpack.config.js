const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({})],
        extensions: [".ts", ".js", ".json"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: false,
        port: 8080,
        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },
    },
};
