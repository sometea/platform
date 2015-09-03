'use strict';

var Ball = function(_game) {
  this.game = _game;
  this.sprite = this.game.add.sprite(100, 0, 'ball');
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.bounce.y = 0.7;
  this.sprite.body.bounce.x = 0.7;
  this.sprite.body.gravity.y = 700;
  this.sprite.body.drag.x = 50;
  this.sprite.body.maxVelocity = new Phaser.Point(500, 500);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.mass = 0.1;
};

Ball.prototype.getSprite = function () {
  return this.sprite;
}

module.exports = Ball;
