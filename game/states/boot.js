/* globals Phaser: false */

class Boot {
  preload() {

  }

  create() {
    this.game.input.maxPointers = 1;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.minWidth = 900;
    this.game.scale.minHeight = 600;
    this.game.scale.maxWidth = 1900;
    this.game.scale.maxHeight = 1600;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();
    this.game.state.start('preload');
  }
}

export default Boot;
