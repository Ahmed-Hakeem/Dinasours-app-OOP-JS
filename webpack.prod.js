
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require('webpack'); //to access built-in plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: './src/index.js' , 
  

    module: {
     
        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"],
              },
              {
                test: /\.json5$/i,
                loader: 'json5-loader',
                type: 'javascript/auto',
              },
              {
                test: "/.js$/",
                exclude: /node_modules/,
                loader: "babel-loader",
              },
              
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
              },
              {
                test: /\.scss$/,

                use: ['style-loader', "css-loader", "sass-loader"],
              },
              

        ]
    },
    plugins: [  
          new MiniCssExtractPlugin({ filename: "[name].css" }),
          new HtmlWebPackPlugin({
        template: "./src/views/index.html",
        filename: "./index.html",
      }),
      // new webpack.DefinePlugin({
      //   'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      // }), 
],
output: {
  libraryTarget: "let",
  library: "Client",
},
output: {
  path: path.resolve(__dirname, './product'),
  filename: 'product.js',

},
    // optimization: {
    //     minimizer: [new TerserPlugin({}),new OptimizeCSSAssetsPlugin({})],
    //     },
  } ;

