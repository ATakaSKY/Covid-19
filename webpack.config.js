const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// eslint-disable-next-line no-undef
module.exports = {
  mode: "development",
  entry: "./js/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/"
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [new CleanWebpackPlugin()]
};
