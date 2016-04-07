

import 'pixi.js';
import 'p2';
import 'phaser';

import Play from './states/play';
import Boot from './states/boot';
import GameOver from './states/gameover';
import Preload from './states/preload';


/* globals window: false, Phaser: false */

// global variables
window.onload = function onload() {
  const game = new Phaser.Game(600, 400, Phaser.AUTO, 'platform');

  // Game States
  game.state.add('boot', Boot);
  game.state.add('gameover', GameOver);
  game.state.add('play', Play);
  game.state.add('preload', Preload);


  game.state.start('boot');
};
