const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const BUILD_ROOT = path.join(__dirname, "/dist");
const SRC_ROOT = path.join(__dirname, "/src");

module.exports = {
  context: SRC_ROOT,
  target: "node",
  entry: path.resolve("src", "index.ts"),
  externals: [nodeExternals()],
  output: {
    filename: "index.js",
    path: BUILD_ROOT,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.join(__dirname, "/src/"),
      "@test": path.join(__dirname, "/__test__/"),
      "@components": path.join(__dirname, "/src/components/"),
      "@config": path.join(__dirname, "/src/config/"),
      "@lib": path.join(__dirname, "/src/lib/"),
      "@middlewares": path.join(__dirname, "/src/middlewares/"),
    },
  },
};
