const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const designerConfig = require("./webpack.designer.js");
const path = require('path')

const developmentConfig = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    resolve:{
        symlinks: false,
        modules: [
            '../paperbits-common', 'packages/paperbits-common'

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: `./src/config.design.json`, to: `./config.json` },
            ]
        })
    ]
}

module.exports = []
    .concat(designerConfig)
    .map(x => merge(x, developmentConfig));