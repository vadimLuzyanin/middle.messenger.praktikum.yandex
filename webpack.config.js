const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ mode = "development" }) => {
  const outputPath = path.resolve(__dirname, "dist");

  return {
    mode,
    entry: "./src/index.ts",
    target: "web",
    output: {
      filename: "[name].[contenthash].js",
      path: outputPath,
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html"),
        minify: true,
      }),
    ],

    devServer: {
      compress: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      port: 3000,
      static: {
        directory: outputPath,
      },
    },

    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { modules: true },
            },
            "@teamsupercell/typings-for-css-modules-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          options: {
            runtime: path.resolve(__dirname, "./hbsHelpers.js"),
          },
        },
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {},
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
