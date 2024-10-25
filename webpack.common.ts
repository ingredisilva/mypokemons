import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const config: Configuration = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]", 
          outputPath: "assets/images",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: "/",
      template: "./public/index.html",
      minify: true,
    }),
  ],
};

export default config;
