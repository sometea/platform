
/* globals Phaser: false */

class Ball extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    game.physics.arcade.enable(this);
    this.body.bounce.y = 0.7;
    this.body.bounce.x = 0.7;
    this.body.gravity.y = 700;
    this.body.drag.x = 50;
    this.body.maxVelocity = new Phaser.Point(500, 500);
    this.body.collideWorldBounds = true;
    this.body.mass = 0.1;
  }
}

export default Ball;
