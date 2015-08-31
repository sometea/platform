(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(600, 400, Phaser.AUTO, 'platform');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/play":4,"./states/preload":5}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {

  },
  create: function() {
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
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.image(0, 0, 'background');
      this.mainguy = this.game.add.sprite(0, 0, 'mainguy');
      // this.mainguy.scale.setTo(2,2);
      this.mainguy.anchor.setTo(.5,.5);
      this.ball = this.game.add.sprite(100, 0, 'ball');
      // this.ball.scale.setTo(2,2);
      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
      for (var i=0; i<4; i++) {
        var block = this.platforms.create(i*230, this.game.world.height - 25, 'block');
        block.scale.setTo(10, 1);
        block.body.immovable = true;
      }

      this.game.physics.arcade.enable(this.mainguy);
      this.game.physics.arcade.enable(this.ball);
      this.mainguy.body.bounce.y = 0.2;
      this.mainguy.body.gravity.y = 700;
      this.mainguy.body.collideWorldBounds = true;
      this.mainguy.animations.add('left', [1, 2], 10, true);
      this.mainguy.animations.add('right', [1, 2], 10, true);
      this.ball.body.bounce.y = 0.7;
      this.ball.body.bounce.x = 0.7;
      this.ball.body.gravity.y = 700;
      this.ball.body.collideWorldBounds = true;
      this.ball.body.mass = 0.1;

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
      this.game.physics.arcade.collide(this.mainguy, this.platforms);
      this.game.physics.arcade.collide(this.ball, this.platforms);
      this.game.physics.arcade.collide(this.mainguy, this.ball);
      this.mainguy.body.velocity.x = 0;
      if (this.cursors.left.isDown) {
        this.mainguy.body.velocity.x = -150;
        if (this.mainguy.scale.x > 0) this.mainguy.scale.x = - this.mainguy.scale.x;
        this.mainguy.animations.play('left');
      }
      else if (this.cursors.right.isDown) {
        this.mainguy.body.velocity.x = 150;
        if (this.mainguy.scale.x < 0) this.mainguy.scale.x = - this.mainguy.scale.x;
        this.mainguy.animations.play('right');
      }
      else {
        this.mainguy.animations.stop();
        this.mainguy.frame = 0;
      }
      if (this.cursors.up.isDown && this.mainguy.body.touching.down) this.mainguy.body.velocity.y = -350;
    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;

},{}],5:[function(require,module,exports){

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

},{}]},{},[1])