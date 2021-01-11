game.levels.add('forest1', new Game.Level(game, {
  textures: {
    background: {
      file: 'https://urobbyu.github.io/UEngine/img/Backgrounds/Background1.jpg',
      anchor: [0, 0],
      scale: [128 / 72, 1, 1]
    },
    character: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber.png',
      anchor: [11, 16],
      scale: 33 / 72
    },
    characterIdle: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_idle.png',
      anchor: [11, 16],
      scale: 33 / 72
    },
    characterWalk: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_walk.png',
      anchor: [11, 16],
      scale: 35 / 72
    },
    characterRun: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_run.png',
      anchor: [16, 16],
      scale: 33 / 72
    },
    characterPush: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_push.png',
      anchor: [11, 16],
      scale: 35 / 72
    },
    characterJump: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_jump.png',
      anchor: [17, 16],
      scale: 48 / 72
    },
    characterAttack1: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_attack1.png',
      anchor: [9, 16],
      scale: 43 / 72
    },
    characterAttack2: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_attack2.png',
      anchor: [16, 16],
      scale: 34 / 72
    },
    characterAttack3: {
      file: 'https://urobbyu.github.io/UEngine/img/GraveRobber/GraveRobber_attack3.png',
      anchor: [16, 16],
      scale: 35 / 72
    },
    chest: {
      file: 'https://urobbyu.github.io/UEngine/img/Chest.png',
      anchor: [7, 0],
      scale: 16 / 72
    },
    crate: {
      file: 'https://urobbyu.github.io/UEngine/img/Crate.png',
      anchor: [15, 15],
      scale: 30 / 72
    },
    teleport_arc: {
      file: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_arc.png',
      anchor: [0, 0],
      scale: 34 / 72
    },
    teleport_gems: {
      file: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_gems.png',
      anchor: [0, 0],
      scale: 30 / 72
    },
    teleport_keyboard: {
      file: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_keyboard.png',
      anchor: [6, 3],
      scale: 6 / 72
    },
    teleport_portal: {
      file: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_portal.png',
      anchor: [16, 16],
      scale: 32 / 72
    }
  },
  actions: `return {
    cameraMove: new Game.Action(() => {
      let nextPosX = game.controls.camera.target.position.x + game.controls.speed.x
      let nextPosY = game.controls.camera.target.position.y + game.controls.speed.y
      for (let name in game.solids) {
        let obj = game.solids[name];
        if (game.colliders.intersects([game.objects.character.bounds.x1 + nextPosX, game.objects.character.bounds.y1 + nextPosY, game.objects.character.bounds.x2 + nextPosX, game.objects.character.bounds.y2 + nextPosY], obj.worldBounds)) {
          if (game.controls.curPos != 'characterPush') {
            game.controls.camera.target.isLocked = true
            game.actions[game.controls.curPos].stop();
            game.controls.curPos = 'characterPush';
            if (obj.canMove)
              game.actions[game.controls.curPos].step = 1;
            else
              game.actions[game.controls.curPos].step = 0;
            game.actions[game.controls.curPos].start();
          } else {
            if (game.controls.speed.x === 0) {
              game.actions[game.controls.curPos].pause();
              if (game.objects.character.step === 1 || game.objects.character.step === 5)
                game.objects.character.step = 0
              else if (game.objects.character.step === 2 || game.objects.character.step === 4)
                game.objects.character.step = 3
            } else if (!game.actions[game.controls.curPos].isActive) {
              game.actions[game.controls.curPos].start();
            }
            nextPosX = game.controls.camera.target.position.x;
            if (obj.canMove) {
              let speedX = (game.controls.speed.x > 0 ? 0.1 : (game.controls.speed.x < 0 ? -0.1 : 0));
              nextPosX += speedX;
              obj.position.x += speedX;
            }
          }
        } else if (game.controls.curPos === 'characterPush') {
          game.controls.camera.target.isLocked = false
        }
      }
      if (!game.controls.camera.target.isLocked) {
        if (game.controls.speed.x === 0) {
          if (game.controls.curPos != 'characterIdle') {
            game.actions[game.controls.curPos].stop();
            game.controls.curPos = 'characterIdle';
            game.actions[game.controls.curPos].start();
          }
        } else if ((game.controls.speed.x > 0 && game.controls.speed.x < 0.4) || (game.controls.speed.x < 0 && game.controls.speed.x > -0.4)) {
          if (game.controls.curPos != 'characterWalk') {
            game.actions[game.controls.curPos].stop();
            game.controls.curPos = 'characterWalk';
            game.actions[game.controls.curPos].start();
          }
        } else if ((game.controls.speed.x >= 0.4 && game.controls.speed.x < 0.8) || (game.controls.speed.x <= -0.4 && game.controls.speed.x > -0.8)) {
          if (game.controls.curPos != 'characterRun') {
            game.actions[game.controls.curPos].stop();
            game.controls.curPos = 'characterRun';
            game.actions[game.controls.curPos].start();
          }
        }
      }
			game.controls.camera.target.position.x = nextPosX;
			let screenCenterX = 1 / game.controls.camera.target.scale.z / game.controls.camera.target.scale.x * game.controls.camera.target.texture.image.height / 2;
			let targetPosX = game.controls.camera.target.position.x + (game.controls.camera.target.flipX ? -15 : 15);
			game.controls.camera.position.x -= (targetPosX + game.controls.camera.position.x) * 0.08;
			for (let name in game.objects) {
				let obj = game.objects[name];
				obj.cameraPosition.x = game.controls.camera.position.x + screenCenterX;
			}
		}, 15),
    characterIdle: new Game.AnimationSlideShow(200, 8, 0, 1, game.objects.character, game.sprites.characterIdle),
    characterWalk: new Game.AnimationSlideShow(100, 12, 0, 1, game.objects.character, game.sprites.characterWalk),
    characterPush: new Game.AnimationSlideShow(500, 6, 0, 1, game.objects.character, game.sprites.characterPush),
    characterRun: new Game.AnimationSlideShow(100, 6, 0, 1, game.objects.character, game.sprites.characterRun),
    characterJump: new Game.AnimationSlideShow(130, 6, 0, 1, game.objects.character, game.sprites.characterJump),
    characterAttack1: new Game.AnimationSlideShow(80, 6, 0, 1, game.objects.character, game.sprites.characterAttack1, [0, 1, 2, 3, 4, 5], obj => {
      delete obj.isLocked;
      if (game.keyShift) {
        if (game.keyA) {
          game.actions.characterRun.start();
					game.controls.move(-0.75, 0);
        } else if (game.keyD) {
          game.actions.characterRun.start();
					game.controls.move(0.75, 0);
        } else
          game.actions.characterIdle.start();
      } else {
        if (game.keyA) {
          game.actions.characterWalk.start();
					game.controls.move(-0.32, 0);
        } else if (game.keyD) {
          game.actions.characterWalk.start();
					game.controls.move(0.32, 0);
        } else
          game.actions.characterIdle.start();
      }
    }),
    characterAttack2: new Game.AnimationSlideShow(80, 6, 0, 1, game.objects.character, game.sprites.characterAttack2, [0, 1, 2, 3, 4, 5], obj => {
      delete obj.isLocked;
      if (game.keyShift) {
        if (game.keyA) {
          game.actions.characterRun.start();
					game.controls.move(-0.75, 0);
        } else if (game.keyD) {
          game.actions.characterRun.start();
					game.controls.move(0.75, 0);
        } else
          game.actions.characterIdle.start();
      } else {
        if (game.keyA) {
          game.actions.characterWalk.start();
					game.controls.move(-0.32, 0);
        } else if (game.keyD) {
          game.actions.characterWalk.start();
					game.controls.move(0.32, 0);
        } else
          game.actions.characterIdle.start();
      }
    }),
    characterAttack3: new Game.AnimationSlideShow(100, 6, 0, 1, game.objects.character, game.sprites.characterAttack3, [0, 1, 2, 3, 4, 5], obj => {
      delete obj.isLocked;
      game.controls.move(0, 0);
      if (game.keyShift) {
        if (game.keyA) {
          game.actions.characterRun.start();
					game.controls.move(-0.75, 0);
        } else if (game.keyD) {
          game.actions.characterRun.start();
					game.controls.move(0.75, 0);
        } else
          game.actions.characterIdle.start();
      } else {
        if (game.keyA) {
          game.actions.characterWalk.start();
					game.controls.move(-0.32, 0);
        } else if (game.keyD) {
          game.actions.characterWalk.start();
					game.controls.move(0.32, 0);
        } else
          game.actions.characterIdle.start();
      }
    }),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, game.objects.teleport_arc, game.sprites.teleport_arc),
    teleport_portalChange: new Game.AnimationSlideShow(50, 18, 0, 1, game.objects.teleport_portal, game.sprites.teleport_portal, [1, 0, 1], obj => {
      if (obj.portal) {
        obj.step = 2 + obj.portal.types[obj.portal.cur] * 4;
        obj.portal.ready = true;
      }
    }),
    teleport_portalSwitch: new Game.Animation(() => {
      if (game.objects.teleport_portal.portal.ready) {
        if (game.colliders.intersects(game.objects.character, game.objects.teleport_portal)) {
          if (game.objects.teleport_portal.step < 5 + game.objects.teleport_portal.portal.types[game.objects.teleport_portal.portal.cur] * 4)
            game.objects.teleport_portal.step++;
        } else {
          if (game.objects.teleport_portal.step > 2 + game.objects.teleport_portal.portal.types[game.objects.teleport_portal.portal.cur] * 4)
            game.objects.teleport_portal.step--;
        }
      }
    }, 50, game.objects.teleport_portal, game.sprites.teleport_portal)
  }`,
  objects: `return {
    background: new Game.SpritePlane(0, 0, 1000),
    character: new Game.SpriteSlideShow(40, 28, 1, 0, 100),
    chest: new Game.SpriteSwitch(10, 13, 3, 0, 500),
    crate: new Game.Sprite(130, 26, 80),
    teleport_arc: new Game.SpriteSlideShow(60, 12, 2, 0, 500),
    teleport_gems:  new Game.SpriteSlideShow(61, 14, 4, 0, 500),
    teleport_keyboard:  new Game.SpriteSwitch(109, 27, 1, 0, 499),
    teleport_portal:  new Game.SpriteSlideShow(80, 29, 18, 6, 500)
  }`,
  postLoad: game => {
    game.controls.camera.target = game.objects.character;
    game.objects.teleport_portal.portal = {
      types: {
        forest2: 1,
        forest3: 2,
        forest4: 3
      },
      cur: 'forest2',
      ready: true
    };

    game.objects.background.texture = game.sprites.background;
    game.objects.character.texture = game.sprites.character;
    game.objects.chest.texture = game.sprites.chest;
    game.objects.crate.texture = game.sprites.crate;
    game.objects.teleport_keyboard.texture = game.sprites.teleport_keyboard;
    game.objects.teleport_gems.texture = game.sprites.teleport_gems;
    game.objects.teleport_portal.texture = game.sprites.teleport_portal;

    game.objects.character.bounds = [-4, -16, 6, 10];
    game.objects.chest.bounds = [-6, -2, 7, 13];
    game.objects.crate.bounds = [-16, -15, 16, 15];
    game.objects.crate.canMove = true;
    game.objects.teleport_portal.bounds = [-16, -16, 16, 16];
    game.objects.teleport_keyboard.bounds = [-6, -3, 6, 3];

    game.colliders.add('chest', game.objects.character, game.objects.chest, e => {
        if (e.inside)
          game.objects.chest.uniforms.state.value = 1;
        else
          game.objects.chest.uniforms.state.value = 0;
    });
    game.colliders.add('keyboard', game.objects.character, game.objects.teleport_keyboard, e => {
        if (e.inside)
          game.objects.teleport_keyboard.uniforms.state.value = 1;
        else
          game.objects.teleport_keyboard.uniforms.state.value = 0;
    });

    game.solids.crate = game.objects.crate

    game.controls.curPos = 'characterIdle';
    game.actions.teleport_arcIdle.start();
    game.actions.teleport_portalSwitch.start();
    game.controls.camera.position.x = -55;
    game.actions.cameraMove.start();
  }
}, true))
/*game.levels.add('forest2', new Game.Level(game, {
  textures: {
    background: 'https://urobbyu.github.io/UEngine/img/Backgrounds/Background2.jpg',
    character: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter.png',
    characterIdle: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_idle.png',
    characterWalk: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_walk.png',
    characterRun: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_run.png',
    characterJump: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_jump.png',
    chest: 'https://urobbyu.github.io/UEngine/img/Chest.png',
    teleport_arc: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_arc.png',
    teleport_gems: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_gems.png',
    teleport_keyboard: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_keyboard.png',
    teleport_portal: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_portal.png'
  },
  actions: `return {
    characterIdle: new Game.AnimationSlideShow(300, 4, 0, 1, gameObj.objects.character, gameObj.sprites.characterIdle),
    characterWalk: new Game.AnimationSlideShow(340, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterWalk),
    characterRun: new Game.AnimationSlideShow(170, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterRun),
    characterJump: new Game.AnimationSlideShow(130, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterJump),
    chest: new Game.Action(() => {
      if (gameObj.objects.character.position.x - 5 > gameObj.objects.chest.position.x && gameObj.objects.character.position.x + 5 < gameObj.objects.chest.position.x) {
        gameObj.objects.chest.uniforms.state.value = 1;
      } else {
        gameObj.objects.chest.uniforms.state.value = 0;
      }
    }, 30),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, gameObj.objects.teleport_arc, gameObj.sprites.teleport_arc),
    teleport_keyboard: new Game.Action(() => {
      if (gameObj.objects.teleport_keyboard.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.teleport_keyboard.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 1;
      } else {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 0;
      }
    }, 30),
    teleport_portalChange: new Game.AnimationSlideShow(50, 18, 0, 1, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal, [1, 0, 1], (obj) => {
      if (gameObj.objects.teleport_portal.portal) {
        gameObj.objects.teleport_portal.step = 2 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4;
        gameObj.objects.teleport_portal.portal.ready = true;
      }
    }),
    teleport_portalSwitch: new Game.Animation(() => {
      if (gameObj.objects.teleport_portal.portal.ready) {
        if (gameObj.objects.teleport_portal.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.teleport_portal.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
          if (gameObj.objects.teleport_portal.step < 5 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4)
            gameObj.objects.teleport_portal.step++;
        } else {
          if (gameObj.objects.teleport_portal.step > 2 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4)
            gameObj.objects.teleport_portal.step--;
        }
      }
    }, 50, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal)
  }`,
  objects: `return {
    background: new Game.SpritePlane(0, 0, 1, 1000),
    character: new Game.SpriteSlideShow(20, 12, 2 / 3, 1, 0, 100),
    chest: new Game.SpriteSwitch(40, 13, 18 / 72, 3, 0, 500),
    teleport_arc: new Game.SpriteSlideShow(60, 12, 34 / 72, 2, 0, 500),
    teleport_gems:  new Game.SpriteSlideShow(61, 14, 30 / 72, 4, 0, 500),
    teleport_keyboard:  new Game.SpriteSwitch(103, 24, 6 / 72, 1, 0, 499),
    teleport_portal:  new Game.SpriteSlideShow(64, 13, 32 / 72, 18, 10, 500)
  }`,
  postLoad: gameObj => {
    gameObj.controls.camera.target = gameObj.objects.character;
    gameObj.objects.teleport_portal.portal = {
      types: {
        forest1: 0,
        forest3: 2,
        forest4: 3
      },
      cur: 'forest3',
      ready: true
    };
    gameObj.objects.background.texture = gameObj.sprites.background;
    gameObj.objects.character.texture = gameObj.sprites.character;
    gameObj.objects.chest.texture = gameObj.sprites.chest;
    gameObj.objects.teleport_keyboard.texture = gameObj.sprites.teleport_keyboard;
    gameObj.objects.teleport_gems.texture = gameObj.sprites.teleport_gems;
    gameObj.actions.chest.start();
    gameObj.actions.characterIdle.start();
    gameObj.actions.teleport_arcIdle.start();
    gameObj.actions.teleport_keyboard.start();
    gameObj.actions.teleport_portalSwitch.start();
  }
}, true))
game.levels.add('forest3', new Game.Level(game, {
  textures: {
    backgroundBack: 'https://urobbyu.github.io/UEngine/img/Backgrounds/Background3_back.jpg',
    backgroundFront: 'https://urobbyu.github.io/UEngine/img/Backgrounds/Background3_front.png',
    character: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter.png',
    characterIdle: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_idle.png',
    characterWalk: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_walk.png',
    characterRun: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_run.png',
    characterJump: 'https://urobbyu.github.io/UEngine/img/Woodcutter/Woodcutter_jump.png',
    chest: 'https://urobbyu.github.io/UEngine/img/Chest.png',
    teleport_arc: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_arc.png',
    teleport_gems: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_gems.png',
    teleport_keyboard: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_keyboard.png',
    teleport_portal: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_portal.png'
  },
  actions: `return {
    characterIdle: new Game.AnimationSlideShow(300, 4, 0, 1, gameObj.objects.character, gameObj.sprites.characterIdle),
    characterWalk: new Game.AnimationSlideShow(340, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterWalk),
    characterRun: new Game.AnimationSlideShow(170, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterRun),
    characterJump: new Game.AnimationSlideShow(130, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterJump),
    chest: new Game.Action(() => {
      if (gameObj.objects.chest.position.x < 20 - (3 + gameObj.controls.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.chest.position.x > 0 - (4 + gameObj.controls.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
        gameObj.objects.chest.uniforms.state.value = 1;
      } else {
        gameObj.objects.chest.uniforms.state.value = 0;
      }
    }, 30),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, gameObj.objects.teleport_arc, gameObj.sprites.teleport_arc),
    teleport_keyboard: new Game.Action(() => {
      if (gameObj.objects.teleport_keyboard.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.teleport_keyboard.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 1;
      } else {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 0;
      }
    }, 30),
    teleport_portalChange: new Game.AnimationSlideShow(50, 18, 0, 1, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal, [1, 0, 1], (obj) => {
      if (gameObj.objects.teleport_portal.portal) {
        gameObj.objects.teleport_portal.step = 2 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4;
        gameObj.objects.teleport_portal.portal.ready = true;
      }
    }),
    teleport_portalSwitch: new Game.Animation(() => {
      if (gameObj.objects.teleport_portal.portal.ready) {
        if (gameObj.objects.teleport_portal.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.teleport_portal.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
          if (gameObj.objects.teleport_portal.step < 5 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4)
            gameObj.objects.teleport_portal.step++;
        } else {
          if (gameObj.objects.teleport_portal.step > 2 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4)
            gameObj.objects.teleport_portal.step--;
        }
      }
    }, 50, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal)
  }`,
  objects: `return {
    backgroundBack: new Game.SpritePlane(0, 0, 1, 1000),
    backgroundFront: new Game.SpritePlane(0, 0, 1, 50),
    character: new Game.SpriteSlideShow(20, 12, 2 / 3, 1, 0, 100),
    chest: new Game.SpriteSwitch(40, 13, 18 / 72, 3, 0, 500),
    teleport_arc: new Game.SpriteSlideShow(60, 12, 34 / 72, 2, 0, 500),
    teleport_gems:  new Game.SpriteSlideShow(61, 14, 30 / 72, 4, 0, 500),
    teleport_keyboard:  new Game.SpriteSwitch(103, 24, 6 / 72, 1, 0, 499),
    teleport_portal:  new Game.SpriteSlideShow(64, 13, 32 / 72, 18, 14, 500)
  }`,
  postLoad: gameObj => {
    gameObj.controls.camera.target = gameObj.objects.character;
    gameObj.objects.teleport_portal.portal = {
      types: {
        forest1: 0,
        forest2: 1,
        forest4: 3
      },
      cur: 'forest4',
      ready: true
    };
    gameObj.objects.backgroundBack.texture = gameObj.sprites.backgroundBack;
    gameObj.objects.backgroundFront.texture = gameObj.sprites.backgroundFront;
    gameObj.objects.backgroundFront.material.transparent = true
    gameObj.objects.character.texture = gameObj.sprites.character;
    gameObj.objects.chest.texture = gameObj.sprites.chest;
    gameObj.objects.teleport_keyboard.texture = gameObj.sprites.teleport_keyboard;
    gameObj.objects.teleport_gems.texture = gameObj.sprites.teleport_gems;
    gameObj.actions.chest.start();
    gameObj.actions.characterIdle.start();
    gameObj.actions.teleport_arcIdle.start();
    gameObj.actions.teleport_keyboard.start();
    gameObj.actions.teleport_portalSwitch.start();
  }
}, true))
game.levels.add('forest4', new Game.Level(game, {
  textures: {
    backgroundBack: 'https://urobbyu.github.io/UEngine/img/Backgrounds/Background4_back.jpg',
    backgroundFront: 'https://urobbyu.github.io/UEngine/img/Backgrounds/Background4_front.png',
    character: 'https://urobbyu.github.io/UEngine/img/SteamMan/SteamMan.png',
    characterIdle: 'https://urobbyu.github.io/UEngine/img/SteamMan/SteamMan_idle.png',
    characterWalk: 'https://urobbyu.github.io/UEngine/img/SteamMan/SteamMan_walk.png',
    characterRun: 'https://urobbyu.github.io/UEngine/img/SteamMan/SteamMan_run.png',
    characterJump: 'https://urobbyu.github.io/UEngine/img/SteamMan/SteamMan_jump.png',
    chest: 'https://urobbyu.github.io/UEngine/img/Chest.png',
    teleport_arc: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_arc.png',
    teleport_gems: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_gems.png',
    teleport_keyboard: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_keyboard.png',
    teleport_portal: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_portal.png'
  },
  actions: `return {
    characterIdle: new Game.AnimationSlideShow(300, 4, 0, 1, gameObj.objects.character, gameObj.sprites.characterIdle),
    characterWalk: new Game.AnimationSlideShow(340, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterWalk),
    characterRun: new Game.AnimationSlideShow(170, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterRun),
    characterJump: new Game.AnimationSlideShow(130, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterJump),
    chest: new Game.Action(() => {
      if (gameObj.objects.chest.position.x < 20 - (3 + gameObj.controls.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.chest.position.x > 0 - (4 + gameObj.controls.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
        gameObj.objects.chest.uniforms.state.value = 1;
      } else {
        gameObj.objects.chest.uniforms.state.value = 0;
      }
    }, 30),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, gameObj.objects.teleport_arc, gameObj.sprites.teleport_arc),
    teleport_keyboard: new Game.Action(() => {
      if (gameObj.objects.teleport_keyboard.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.teleport_keyboard.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 1;
      } else {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 0;
      }
    }, 30),
    teleport_portalChange: new Game.AnimationSlideShow(50, 18, 0, 1, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal, [1, 0, 1], (obj) => {
      if (gameObj.objects.teleport_portal.portal) {
        gameObj.objects.teleport_portal.step = 2 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4;
        gameObj.objects.teleport_portal.portal.ready = true;
      }
    }),
    teleport_portalSwitch: new Game.Animation(() => {
      if (gameObj.objects.teleport_portal.portal.ready) {
        if (gameObj.objects.teleport_portal.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x && gameObj.objects.teleport_portal.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.controls.camera.target.position.x) {
          if (gameObj.objects.teleport_portal.step < 5 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4)
            gameObj.objects.teleport_portal.step++;
        } else {
          if (gameObj.objects.teleport_portal.step > 2 + gameObj.objects.teleport_portal.portal.types[gameObj.objects.teleport_portal.portal.cur] * 4)
            gameObj.objects.teleport_portal.step--;
        }
      }
    }, 50, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal)
  }`,
  objects: `return {
    backgroundBack: new Game.SpritePlane(0, 0, 1, 1000),
    backgroundFront: new Game.SpritePlane(0, 0, 1, 50),
    character: new Game.SpriteSlideShow(20, 12, 2 / 3, 1, 0, 100),
    chest: new Game.SpriteSwitch(40, 13, 18 / 72, 3, 0, 500),
    teleport_arc: new Game.SpriteSlideShow(60, 12, 34 / 72, 2, 0, 500),
    teleport_gems:  new Game.SpriteSlideShow(61, 14, 30 / 72, 4, 0, 500),
    teleport_keyboard:  new Game.SpriteSwitch(103, 24, 6 / 72, 1, 0, 499),
    teleport_portal:  new Game.SpriteSlideShow(64, 13, 32 / 72, 18, 2, 500)
  }`,
  postLoad: gameObj => {
    gameObj.controls.camera.target = gameObj.objects.character;
    gameObj.objects.teleport_portal.portal = {
      types: {
        forest1: 0,
        forest2: 1,
        forest3: 2
      },
      cur: 'forest1',
      ready: true
    };
    gameObj.objects.backgroundBack.texture = gameObj.sprites.backgroundBack;
    gameObj.objects.backgroundFront.texture = gameObj.sprites.backgroundFront;
    gameObj.objects.backgroundFront.material.transparent = true
    gameObj.objects.character.texture = gameObj.sprites.character;
    gameObj.objects.chest.texture = gameObj.sprites.chest;
    gameObj.objects.teleport_keyboard.texture = gameObj.sprites.teleport_keyboard;
    gameObj.objects.teleport_gems.texture = gameObj.sprites.teleport_gems;
    gameObj.actions.chest.start();
    gameObj.actions.characterIdle.start();
    gameObj.actions.teleport_arcIdle.start();
    gameObj.actions.teleport_keyboard.start();
    gameObj.actions.teleport_portalSwitch.start();
  }
}, true))*/

game.levels['forest1'].load()
