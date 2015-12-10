'use strict';

/* globals window: false, Phaser: false */

//global variables
window.onload = function () {
  var game = new Phaser.Game(600, 400, Phaser.AUTO, 'platform');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
