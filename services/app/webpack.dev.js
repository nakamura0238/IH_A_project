const common = require("./webpack.common");
const { merge } = require("webpack-merge");

const config = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
});

module.exports = config;
