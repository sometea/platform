import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

require('es6-promise').polyfill();

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const config = {
  entry: path.join(__dirname, 'game', 'main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/game.js'
  },
  module: {
    loaders: [
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
      {
        test: /\.js$/, // Transpile all .js files from ES6 to ES5
        exclude: /(pixi|phaser-split|p2)\.js/,
        loaders: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2,
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'css', to: 'css' },
      { from: 'assets', to: 'assets' },
      { from: 'index.html', to: 'index.html' },
    ]),
  ],
};

export default config;
