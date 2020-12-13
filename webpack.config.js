const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => ({
    mode: env.production ? "production" : "development",
    devtool: env.production ? "source-map" : "eval",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    presets: ["@babel/preset-env"]
                }
            },
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer()
                            ]
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        webpackImporter: false,
                        sassOptions: {
                            includePaths: ["./node_modules"]
                        }
                    }
                }
            ]
        }],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/pages/index.html",
            filename: "index.html"
        })
    ]
})