const path = require("path");
// const htmlWebpackPlugin = require("html-webpack-plugin");
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
const isDevelopment = process.env.NODE_ENV !== 'production'

console.log("WebPack Dev Run : http://localhost:8080/bundle-documentation-modal.js")

module.exports = {
    target: 'node',
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle-documentation-modal.js"
    },
    resolve: {
        extensions: ['.jsx', '.tsx', ".ts", ".js"]
    },
    devServer: {
        // contentBase: path.resolve(__dirname, 'public'),
        hot: false
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'sass-loader'
                ]
            },
        ],

    }
}