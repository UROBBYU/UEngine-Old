game.levels.add('forest1', new Game.Level(game, {
  textures: {
    background: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Backgrounds/Background1.jpg',
      anchor: [0, 0],
      scale: [128 / 72, 1, 1]
    },
    character: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber.png',
      anchor: [11, 16],
      scale: 33 / 72
    },
    characterIdle: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_idle.png',
      anchor: [11, 16],
      scale: 33 / 72
    },
    characterWalk: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_walk.png',
      anchor: [11, 16],
      scale: 35 / 72
    },
    characterRun: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_run.png',
      anchor: [16, 16],
      scale: 33 / 72
    },
    characterPush: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_push.png',
      anchor: [11, 16],
      scale: 35 / 72
    },
    characterJump: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_jump.png',
      anchor: [17, 16],
      scale: 48 / 72
    },
    characterAttack1: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_attack1.png',
      anchor: [9, 16],
      scale: 43 / 72
    },
    characterAttack2: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_attack2.png',
      anchor: [16, 16],
      scale: 34 / 72
    },
    characterAttack3: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/GraveRobber/GraveRobber_attack3.png',
      anchor: [16, 16],
      scale: 35 / 72
    },
    chest: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Chest.png',
      anchor: [7, 0],
      scale: 16 / 72
    },
    crate: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Crate.png',
      anchor: [15, 15],
      scale: 30 / 72
    },
    teleport_arc: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Teleport/Teleport_arc.png',
      anchor: [0, 0],
      scale: 34 / 72
    },
    teleport_gems: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Teleport/Teleport_gems.png',
      anchor: [0, 0],
      scale: 30 / 72
    },
    teleport_keyboard: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Teleport/Teleport_keyboard.png',
      anchor: [6, 3],
      scale: 6 / 72
    },
    teleport_portal: {
      file: 'https://urobbyu.github.io/UEngine-Old/img/Teleport/Teleport_portal.png',
      anchor: [16, 16],
      scale: 32 / 72
    },
    pauseMenu: {
      file: 'data:image/png;base64,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',
      anchor: [36, 36],
      scale: 1
    }
  },
  actions: `return {
    cameraMove: new Game.Action(() => {
      let nextPosX = game.controls.camera.target.position.x + game.controls.speed.x;
      let nextPosY = game.controls.camera.target.position.y + game.controls.speed.y;
      for (let name in game.solids) {
        let obj = game.solids[name];
        if (game.colliders.intersects([game.objects.character.bounds.x1 + nextPosX, game.objects.character.bounds.y1 + nextPosY, game.objects.character.bounds.x2 + nextPosX, game.objects.character.bounds.y2 + nextPosY], obj.worldBounds)) {
          if (obj.canMove) {
            if (game.controls.curPos != 'characterPush') {
              game.controls.camera.target.isLocked = true;
              game.actions[game.controls.curPos].stop();
              game.controls.curPos = 'characterPush';
              game.actions[game.controls.curPos].start();
            } else {
              if (game.controls.speed.x === 0) {
                game.actions[game.controls.curPos].pause();
                if (game.objects.character.step === 1 || game.objects.character.step === 2 || game.objects.character.step === 3 || game.objects.character.step === 10 || game.objects.character.step === 11)
                  game.objects.character.step = 0;
                else if (game.objects.character.step === 4 || game.objects.character.step === 5 || game.objects.character.step === 7 || game.objects.character.step === 8 || game.objects.character.step === 9)
                  game.objects.character.step = 6;
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
          } else {
            nextPosX = game.controls.camera.target.position.x;
            nextPosY = game.controls.camera.target.position.y;
            if (game.controls.curPos != 'characterIdle') {
              game.controls.camera.target.isLocked = true;
              game.actions[game.controls.curPos].stop();
              game.controls.curPos = 'characterIdle';
              game.actions[game.controls.curPos].start();
            }
          }
        } else if (game.controls.curPos === 'characterPush' || game.controls.curPos === 'characterIdle') {
          game.controls.camera.target.isLocked = false;
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
			let screenCenterX = 1 / game.controls.camera.target.scale.z / game.controls.camera.target.scale.x * game.controls.camera.target.texture.image.height * display.width / display.height / 2;
      let screenCenterY = 1 / game.controls.camera.target.scale.z / game.controls.camera.target.scale.x * game.controls.camera.target.texture.image.height / 2;
			let targetPosX = game.controls.camera.target.position.x + game.controls.camera.disposition.x * (game.controls.camera.target.flipX ? -1 : 1);
      let targetPosY = game.controls.camera.target.position.y + game.controls.camera.disposition.y * (game.controls.camera.target.flipY ? -1 : 1);
			game.controls.camera.position.x += (targetPosX - game.controls.camera.position.x) * 0.08;
      game.controls.camera.position.y += (targetPosY - game.controls.camera.position.y) * 0.08;
			for (let name in game.objects) {
				let obj = game.objects[name];
				obj.cameraPosition.x = screenCenterX - game.controls.camera.position.x;
        obj.cameraPosition.y = screenCenterY - game.controls.camera.position.y;
			}
		}, 15),
    characterIdle: new Game.AnimationSlideShow(200, 8, 0, 1, game.objects.character, game.sprites.characterIdle),
    characterWalk: new Game.AnimationSlideShow(100, 12, 0, 1, game.objects.character, game.sprites.characterWalk),
    characterPush: new Game.AnimationSlideShow(250, 12, 0, 1, game.objects.character, game.sprites.characterPush),
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
    pauseScreen: new Game.SpriteMenu(36, 36, 1),
    background: new Game.SpritePlane(0, 0, 1000),
    character: new Game.SpriteSlideShow(40, 28, 1, 0, 100),
    chest: new Game.SpriteSwitch(10, 13, 3, 0, 500),
    crate: new Game.Sprite(-20, 26, 80),
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
    [game.controls.camera.position.x, game.controls.camera.position.y] = [55, 36];
    [game.controls.camera.disposition.x, game.controls.camera.disposition.y] = [15, 8];

    game.addEventListener('paused', () => {
      game.objects.pauseScreen.material.visible = true;
    });
    game.addEventListener('resumed', () => {
      game.objects.pauseScreen.material.visible = false;
    });

    game.objects.pauseScreen.texture = game.sprites.pauseMenu;
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

    game.solids.crate = game.objects.crate;

    game.controls.curPos = 'characterIdle';
    game.actions.teleport_arcIdle.start();
    game.actions.teleport_portalSwitch.start();
    game.actions.cameraMove.start();
  }
}, true))
game.levels['forest1'].load()
