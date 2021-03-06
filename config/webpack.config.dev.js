const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const paths = require('./paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const isPackaging = env.packaging === 'true';

  const indexEntries = [path.join(paths.appSrc, 'index.js')];

  if (!isPackaging) {
    indexEntries.push(require.resolve('react-dev-utils/webpackHotDevClient'));
  }

  return {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    entry: {
      index: indexEntries,
      background: path.join(paths.appSrc, 'background.js'),
      injected: path.join(paths.appSrc, 'injected.js'),
      contentscript: path.join(paths.appSrc, 'contentscript.js'),
    },
    output: {
      path: paths.appBuild,
      pathinfo: true,
      filename: '[name].bundle.js',
    },
    resolve: {
      modules: ['node_modules', paths.appDirectory],
      extensions: ['.js', '.json', '.jsx'],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|jsx|mjs)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
              },
            },
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new CopyWebpackPlugin([
        { from: 'manifest.json' },
        {
          from: 'public/icon16.png',
        },
        {
          from: 'public/icon32.png',
        },
        {
          from: 'public/icon48.png',
        },
        {
          from: 'public/icon128.png',
        },
      ]),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        chunks: ['index'],
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  };
};
