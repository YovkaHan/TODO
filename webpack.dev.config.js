const _conf = require('./webpackConsts').configs;

module.exports = (env, argv) => {

    let pathsToClean = [
        'dist',
        'build'
    ];

    return {
        devtool: "inline-cheap-module-source-map",
        entry: [
            '@babel/polyfill',
            `webpack-dev-server/client?http://${_conf.server.host}:${_conf.server.port}`,
            _conf.frontEntryPoint.js,
        ],
        output: {
            path: _conf.path.resolve(__dirname, 'dist'),
            filename: './front/[name].[hash].js'
        },
        devServer: {
            host: _conf.server.host,
            port: _conf.server.port,
            historyApiFallback: true,
            contentBase: __dirname,
            hot: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS"
            }
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
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(jpg|jpeg|gif|png)$/i,
                    exclude: /node_modules/,
                    loader: 'url-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/i,
                    exclude: /node_modules/,
                    loader: 'url-loader'
                }
            ]
        },
        plugins: [
            new _conf.CleanWebpackPlugin(pathsToClean),
            new _conf.webpack.HotModuleReplacementPlugin(),
            new _conf.MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "./front/[name].[hash].css",
            }),
            new _conf.HtmlWebpackPlugin({
                inject: false,
                hash: true,
                template: _conf.frontEntryPoint.html,
                filename: 'index.html'
            }),
            new _conf.WebpackMd5Hash()
        ]
    };
};


