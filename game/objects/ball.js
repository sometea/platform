'use strict';

var Ball = function(game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);
  // this.sprite = this.game.add.sprite(100, 0, 'ball');
  game.physics.arcade.enable(this);
  this.body.bounce.y = 0.7;
  this.body.bounce.x = 0.7;
  this.body.gravity.y = 700;
  this.body.drag.x = 50;
  this.body.maxVelocity = new Phaser.Point(500, 500);
  this.body.collideWorldBounds = true;
  this.body.mass = 0.1;
};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;
// Ball.prototype.getSprite = function () {
//   return this.sprite;
// }

module.exports = Ball;
