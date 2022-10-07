/* eslint-disable import/no-extraneous-dependencies */
const git = require('git-rev-sync');
const path = require('path');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const queryString = require('query-string');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[chunkhash].bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      // CSS/SCSS modules
      {
        test: /\.module\.(css|scss)$/,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { mode: 'pure', localIdentName: '[local]__[hash:base64]' },
            },
          },
          'sass-loader',
        ],
      },
      // Other CSS/SCSS files
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          'sass-loader',
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      // Images
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      // SVG Icons
      {
        test: /\.svg$/,
        use: [
          /**
           * SVGR converts icons into React components. See
           * https://react-svgr.com/docs/webpack/#using-with-url-loader-or-file-loader
           */
          '@svgr/webpack',
          'file-loader',
          /**
           * We can append a 'color' query param, and the fill color of the icon will be replaced
           * with that color. For example:
           *
           *   url("assets/icons/chevron-down.svg?color=FFF")
           */
          (info) => {
            const color = queryString.parse(info.resourceQuery).color;
            const strokeWidth = queryString.parse(info.resourceQuery)['stroke-width'];

            return {
              loader: 'string-replace-loader',
              options: {
                multiple: [
                  { search: /currentColor/g, replace: color ? `#${color}` : 'currentColor' },
                  {search: /currentStrokeWidth/g, replace: strokeWidth ? strokeWidth : 'currentStrokeWidth' },
                ],
              },
            };
          },
        ],
      },
      // Markdown
      {
        test: /\.(txt|md)$/,
        use: ['raw-loader'],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  resolve: {
    modules: [ path.resolve(__dirname, "../src"), "node_modules"],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, '../src/'),
    },
  },
  plugins: [
    new MomentLocalesPlugin(),
    new webpack.DefinePlugin({
      COMMIT_HASH: JSON.stringify(git.long()),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
    }),
    new NodePolyfillPlugin(),
  ],
};
