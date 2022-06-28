const common = require("./webpack.common");
const { merge } = require("webpack-merge");

const config = merge(common, {
  mode: "production",
});

module.exports = config;
