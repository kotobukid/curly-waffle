const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');

const entry = {
    'public/javascripts/pages/index': './browser/index.ts',
};

module.exports = {
    mode: 'development',
    entry,
    output: {
        filename: '[name].js',
        path: `${__dirname}`
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {test: /\.txt$/, use: 'raw-loader'},
            {test: /\.svg$/, use: 'url-loader'},
            {test: /\.vue$/, use: 'vue-loader'},
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    configFile: path.resolve(__dirname, 'browser/tsconfig.json')
                }
            },
            {test: /\.pug$/, use: 'pug-plain-loader'},
            {
                test: /\.less$/, use: ['vue-style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/, use: ['vue-style-loader', 'css-loader'],
            }
        ]
    },

    devServer: {
        open: true
    },
    cache: true,

    resolve: {
        extensions: [".vue", ".js", ".ts"],
        alias: {
            "src": path.resolve(__dirname, 'src'),
            "@c": path.resolve(__dirname, 'src/components'),
            "vue$": "vue/dist/vue.esm.js"
        }
    }
};