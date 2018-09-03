const webpack = require('webpack');
const path = require('path');

let environment = process.env.NODE_ENV || "development";
console.log("Environment is:", environment);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  // This is the entry point for your application.
  entry: {
    'app': [
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
  resolve: {
    // These are the reasonable defaults supported by the Node ecosystem.
    alias: {
      config: path.join(__dirname, "./src/config", environment)
    }
  },
  // This section specifies how each file should be processed before it is combined into your bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2016'],
          plugins: ['transform-class-properties']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
    ]
  },

  // Configure webpack-dev-server
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    host: "snowroom-dev.com",
    port: 3000
  },

  plugins: [
    //Enable Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
