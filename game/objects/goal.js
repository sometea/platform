'use strict';

/* globals Phaser: false */

var Goal = function(game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);
  game.physics.arcade.enable(this);

  this.body.immovable = true;  // the goal will remain in place
};

Goal.prototype = Object.create(Phaser.Sprite.prototype);
Goal.prototype.constructor = Goal;

module.exports = Goal;
