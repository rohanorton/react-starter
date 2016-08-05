const path = require('path');
const validate = require('webpack-validator');
const merge = require('webpack-merge');

// PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

const isProduction = process.env.npm_lifecycle_event === 'build';

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    devtool: isProduction ? 'source-map': 'eval-source-map',

    entry: {
        app: PATHS.app
    },

    output: {
        path: PATHS.build,
        filename: '[name].js'
    },

    plugins: [
        new HtmlWebpackPlugin({ title: "Rohan's Test" }),
        new FlowStatusWebpackPlugin()
    ],

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                include: PATHS.app
            }
        ]
    }
};


const css = {
    module: {
        loaders: [
            {
                test: /\.s?css$/,
                loaders: ['style', 'css', 'sass'],
                include: PATHS.app
            }
        ]
    }
};

const babel = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    plugins: ['transform-flow-strip-types'],
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};

const config = merge(
    common,
    css,
    babel
);

module.exports = validate(config);
