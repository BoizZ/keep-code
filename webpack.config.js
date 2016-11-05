module.exports = {
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
    }
};
