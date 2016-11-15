module.exports = {
    devtool: 'eval-source-map',

    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    module: {
        loaders: [{
            est: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },

    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        hot: true,
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    }
};
