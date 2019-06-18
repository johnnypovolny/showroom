const webpack = require('webpack');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const CompressionPlugin = require('compression-webpack-plugin');

console.log('Environment is:', environment);

module.exports = {
  mode: environment === 'production' ? 'production' : 'development',
  devtool: environment === 'development' ? 'cheap-module-eval-source-map' : '',

  // This is the entry point for your application.
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './src/root.js'
    ]
  },
  // Target directory and name of output
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // This section specifies how each file should be processed before it is combined into your bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['transform-class-properties']
        }
      },
      { test: /\.(s*)css$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'image-webpack-loader', enforce: 'pre', options: { bypassOnDebug: true } },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/, loader: 'url-loader', options: { limit: 10 * 1024 }
      }
    ]
  },
  // Configure webpack-dev-server
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dev'),
    host: 'snowroom-dev.tech',
    port: 8080,
    disableHostCheck: true
  },

  optimization: environment === 'development'
    ? {}
    : {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
          }
        }
      },
      minimize: true
    },

  plugins: [
    // Enable Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
