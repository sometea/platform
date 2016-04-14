
/* globals Phaser: false */

class Goal extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    game.physics.arcade.enable(this);

    this.body.immovable = true;  // the goal will remain in place
  }
}

export default Goal;
