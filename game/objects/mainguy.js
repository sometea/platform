'use strict';

var MainGuy = function (_game) {
  this.game = _game;
  this.sprite = this.game.add.sprite(0, 0, 'mainguy');
  this.sprite.anchor.setTo(.5,.5);
  this.game.physics.arcade.enable(this.sprite);
  this.sprite.body.bounce.y = 0.2;
  this.sprite.body.gravity.y = 700;
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.drag.x = 400;
  this.sprite.body.mass = 1;
  this.sprite.body.maxVelocity = new Phaser.Point(500, 500);
  this.sprite.animations.add('left', [1, 2], 10, true);
  this.sprite.animations.add('right', [1, 2], 10, true);
};

MainGuy.prototype.getSprite = function () {
  return this.sprite;
}

module.exports = MainGuy;
