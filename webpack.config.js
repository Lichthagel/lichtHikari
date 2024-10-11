import path from "node:path";
import WebpackUserscript from "webpack-userscript";

export default {
  entry: "./src/index.user.ts",
  output: {
    filename: "lichtHikari.user.js",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    path: path.resolve("./dist"),
    chunkFormat: "array-push",
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
              presets: [["@babel/preset-typescript"]],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "none",
  devServer: {
    port: 9000,
    client: {
      webSocketURL: "ws://localhost:9000/ws",
    },
    allowedHosts: ["anilist.co"],
  },
  plugins: [
    new WebpackUserscript({
      headers: "./meta.json",
    }),
  ],
  target: "es2020",
};
