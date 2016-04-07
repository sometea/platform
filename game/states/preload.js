'use strict';

/* globals Phaser: false */

class Preload {
  constructor() {
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.spritesheet('mainguy', 'assets/mainguy.png', 23, 25);
    this.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/tileset.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('block', 'assets/block.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('goal', 'assets/goal.png');
  }

  create() {

  }

  update() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preload;
