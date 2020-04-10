const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// eslint-disable-next-line no-undef
module.exports = {
  mode: "production",
  entry: "./js/index.js",
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/"
  },
  devtool: "cheap-source-map",
  plugins: [new CleanWebpackPlugin()]

  /*
   * module: {
   *   loaders: [{ test: ".js", loader: "babel-loader" }]
   * }
   */
};
