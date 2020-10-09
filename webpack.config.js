const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'constellio-sdk': './index.ts',
        'constellio-sdk.min': './index.ts'
    },
    output: {
        path: path.resolve(__dirname, '_bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'MyLib',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            },
            sourceMap: true,
            include: /\.min\.js$/,
        })
    ],
    mode:"development",
    module: {
        rules: [{
            test: /\.(t|j)sx?$/,
            use: 'awesome-typescript-loader',
            exclude: /node_modules/
        }]
    },
}