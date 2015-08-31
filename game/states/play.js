
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
