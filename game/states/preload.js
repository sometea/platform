
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.spritesheet('mainguy', 'assets/mainguy.png', 23, 25);
    this.load.image('background', 'assets/background.png');
    this.load.image('block', 'assets/block.png');
    this.load.image('ball', 'assets/ball.png');
  },
  create: function() {

  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
