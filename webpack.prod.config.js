const configs = require('./webpackConsts').configs;


module.exports = (env, argv) => {

    let pathsToClean = [
        'dist',
        'build'
    ];

    return {
        devtool: "cheap-module-source-map",
        entry: [
            '@babel/polyfill',
            configs.frontEntryPoint.js,
        ],
        output: {
            path: configs.path.resolve(__dirname, 'dist'),
            filename: './app/[name].[contenthash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sc|c)ss$/,
                    use: [
                        configs.MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(jpg|jpeg|gif|png)$/,
                    exclude: /node_modules/,
                    loader:'url-loader?limit=1024&name=images/[name].[ext]'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    exclude: /node_modules/,
                    loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
                }
            ]
        },
        plugins: [
            new configs.CleanWebpackPlugin(pathsToClean),
            new configs.MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "./app/[name].[hash].css",
            }),
            new configs.HtmlWebpackPlugin({
                inject: false,
                hash: true,
                template: configs.frontEntryPoint.html,
                filename: 'index.html'
            }),
            new configs.WebpackMd5Hash()
        ]
    };
};


