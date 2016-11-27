var webpack = require("webpack");

var libraryName = 'ActionsCreatorFactory';
var fileName = 'index';

module.exports = {
    entry: ["./src/" + fileName + ".js"],
    devtool: "source-map",
    output: {
        path: __dirname,
        filename: "dist/" + fileName + ".min.js",
        libraryTarget: "umd",
        library: libraryName,
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};
