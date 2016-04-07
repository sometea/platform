'use strict';

/* globals Phaser: false */

class MainGuy extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 700;
    this.body.collideWorldBounds = true;
    this.body.drag.x = 400;
    this.body.mass = 1;
    this.body.maxVelocity = new Phaser.Point(500, 500);
    this.animations.add('left', [1, 2], 10, true);
    this.animations.add('right', [1, 2], 10, true);
  }
}

export default MainGuy;
