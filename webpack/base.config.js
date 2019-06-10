/* eslint-disable no-process-env, no-undef */
const path = require('path');
const merge = require('webpack-merge');

/* VERSION (from git tags), BRANCH and COMMIT to files header */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const settings = require('./settings');
const loaders = require('./loaders');

module.exports = () => merge([
  {
    context: settings.rootDir,
    entry: {
      app: path.resolve(settings.rootDir, 'app', 'src', 'index.js')
    },
    output: {
      publicPath: '',
      path: path.resolve(settings.rootDir, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'css')),
            loaders.getThreadLoader('css'),
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|gif|jpe?g)$/,
          use: ['file-loader?publicPath=../&name=img/[hash].[ext]']
        },
        {
          test: /\.(svg|woff|woff2|eot|ttf)$/,
          use: ['file-loader?publicPath=../&name=fonts/[hash].[ext]?' + Date.now()]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            loaders.getCacheLoader(path.resolve(settings.cacheDir, 'js')),
            loaders.getThreadLoader('js'),
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: path.resolve(settings.cacheDir, 'babel')
              }
            }
          ]
        },
        {
          test: /\.jsx?$/,
          use: ['eslint-loader'],
          exclude: /(node_modules)/
        }
      ]
    },
    externals: {},
    target: 'web',
    resolve: {
      alias: settings.aliases
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            filename: './js/[name].bundle' + settings.resourcePrefix + '.js',
            chunks: 'all',
            enforce: true
          }
        },
        chunks: 'all'
      }
    }
  }
]);
