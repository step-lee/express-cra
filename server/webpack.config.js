const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = (env, argv) => {
  const config = {
    target: "node",
    entry: "./src/server.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "server.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: require.resolve("babel-loader"),
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        { test: /\.(scss|css|png|svg|jpg|jpeg|mp3)$/, loader: "url-loader" },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
    plugins: [new CleanWebpackPlugin()],
  };

  if (argv.mode === "development") {
    config.plugins.push(
      new NodemonPlugin({
        // If using more than one entry, you can specify
        // which output file will be restarted.
        script: "./dist/server.js",

        // What to watch.
        watch: path.resolve("./dist"),

        // Files to ignore.
        ignore: ["*.node"],

        // Unlike the cli option, delay here is in milliseconds (also note that it's a string).
        // Here's 1 second delay:
        delay: "1000",

        // Detailed log.
        verbose: true,
      })
    );
  }

  return config;
};
