const path = require("path");
const webpackUserscript = require("webpack-userscript");

module.exports = {
    entry: "./src/index.user.ts",
    output: {
        filename: "lichtHikari.user.js",
        path: path.resolve(__dirname, "dist"),
        chunkFormat: "array-push"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: [
                                ["@babel/preset-typescript"]
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    mode: "none",
    devServer: {
        port: 9000,
        client: {
            webSocketURL: "ws://localhost:9000/ws"
        },
        allowedHosts: [
            'anilist.co'
        ]
    },
    plugins: [
        new webpackUserscript({
            headers: "./meta.json"
        })
    ],
    externals: ["localforage"],
    target: "es2020"
}