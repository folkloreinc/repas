const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },

    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.json', '.jsx'],
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10000,
                            },
                        },
                    },
                    {
                        test: /\.svg$/,
                        use: [
                            {
                                loader: require.resolve('@svgr/webpack'),
                                options: {
                                    prettier: false,
                                    svgo: false,
                                    svgoConfig: {
                                        plugins: [{ removeViewBox: false }],
                                    },
                                    titleProp: true,
                                    ref: true,
                                },
                            },
                            {
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'static/media/[name].[hash].[ext]',
                                },
                            },
                        ],
                        issuer: {
                            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                        },
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: require.resolve('babel-loader'),
                            options: {
                                rootMode: 'upward',
                            }
                        },
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        exclude: /\.module\.s[ac]ss$/i,
                        use: [
                            process.env.NODE_ENV !== 'production'
                                ? require.resolve('style-loader')
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 2,
                                    modules: {
                                        mode: 'icss',
                                    },
                                },
                            },
                            require.resolve('postcss-loader'),
                            require.resolve('sass-loader'),
                        ],
                    },
                    {
                        test: /\.module\.s[ac]ss$/i,
                        use: [
                            process.env.NODE_ENV !== 'production'
                                ? require.resolve('style-loader')
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 2,
                                    modules: {
                                        mode: 'local',
                                    },
                                },
                            },
                            require.resolve('postcss-loader'),
                            require.resolve('sass-loader'),
                        ],
                    },
                    {
                        exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        type: 'asset/resource',
                    },
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'src/public/index.html'),
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'src/public'),
        },
        compress: true,
    },
};
