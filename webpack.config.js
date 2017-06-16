const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // eslint-disable-line

module.exports = {
  entry: {
    content: "./src/content",
    background: "./src/background",
    options: "./src/options",
		agent: "./src/agent",
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "extension"),
    filename: "[name].js"
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "assets" }]),
    new CopyWebpackPlugin([
      { from: "node_modules/primer-core/build/", to: "core.css" },
      { from: "node_modules/primer-forms/build/", to: "form.css" }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  }
};
