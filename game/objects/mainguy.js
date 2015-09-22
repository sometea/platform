'use strict';

var MainGuy = function (game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);

  //this.sprite = this.game.add.sprite(0, 0, 'mainguy');
  this.anchor.setTo(.5,.5);
  game.physics.arcade.enable(this);
  this.body.bounce.y = 0.2;
  this.body.gravity.y = 700;
  this.body.collideWorldBounds = true;
  this.body.drag.x = 400;
  this.body.mass = 1;
  this.body.maxVelocity = new Phaser.Point(500, 500);
  this.animations.add('left', [1, 2], 10, true);
  this.animations.add('right', [1, 2], 10, true);
};

MainGuy.prototype = Object.create(Phaser.Sprite.prototype);
MainGuy.prototype.constructor = MainGuy;

// MainGuy.prototype.getSprite = function () {
//   return this.sprite;
// }

module.exports = MainGuy;
