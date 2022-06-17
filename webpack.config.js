// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const GasWebpackPlugin = require("gas-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  // devServer: {
  //   open: true,
  //   liveReload: true,
  //   host: "localhost",
  // },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new GasWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".yarn")
        ],
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json"
          }
        }
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};