const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/game.ts' /*,
        vendors: ['phaser', 'easystar', 'fastpriorityqueue']*/
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: { os: false, https: false, http: false, zlib: false, fs: false, buffer: false }
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        https: true,
        open: {
            app: ['chrome', '--remote-debugging-port=9229', '--new-window']
        },
        port: 9999
    },

    plugins: [
        new webpack.ExternalsPlugin('commonjs', ['electron']),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'webpages/index_webpack.html'),
                    to: path.resolve(__dirname, 'dist/index.html')
                },
                {
                    from: path.resolve(__dirname, 'assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof EXPERIMENTAL': JSON.stringify(true),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
            'typeof FEATURE_SOUND': JSON.stringify(true)
        })
    ],

    optimization: {
        /*splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }*/
        splitChunks: {
            chunks: 'all',
            name: 'vendors.app'
        }
    }
};
