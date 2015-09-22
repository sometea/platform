
  'use strict';

  var MainGuy = require('../objects/mainguy');
  var Ball = require('../objects/ball');

  function Play() {};

  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      var b = this.game.add.image(0, 0, 'background');
      b.fixedToCamera = true;
      this.mainguy = new MainGuy(this.game, 0, 0, 'mainguy');
      this.ball = new Ball(this.game, 100, 0, 'ball');
      this.game.add.existing(this.mainguy);
      this.game.add.existing(this.ball);

      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('scifi', 'tileset');
      this.map.setCollisionBetween(0,220);
      this.blockLayer = this.map.createLayer('blocks');
      this.blockLayer.resizeWorld();
      this.game.camera.follow(this.mainguy);

      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
      for (var i=0; i<4; i++) {
        var block = this.platforms.create(i*230, this.game.world.height - 25, 'block');
        block.scale.setTo(10, 1);
        block.body.immovable = true;
      }

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
      this.game.physics.arcade.collide(this.mainguy, this.ball);
      this.game.physics.arcade.collide(this.mainguy, this.platforms);
      this.game.physics.arcade.collide(this.ball, this.platforms);
      this.game.physics.arcade.collide(this.mainguy, this.blockLayer);
      this.game.physics.arcade.collide(this.ball, this.blockLayer);
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
      if (this.cursors.up.isDown && (this.mainguy.body.onFloor() || this.mainguy.body.touching.down)) this.mainguy.body.velocity.y = -350;
    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
