
  'use strict';

  var MainGuy = require('../objects/mainguy');
  var Ball = require('../objects/ball');

  function Play() {};

  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.image(0, 0, 'background');
      this.mainguy = new MainGuy(this.game);
      this.mainguy = this.mainguy.getSprite();
      this.ball = new Ball(this.game);
      this.ball = this.ball.getSprite();
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
