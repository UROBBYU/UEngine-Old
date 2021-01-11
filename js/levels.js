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
      anchor: [6, 0],
      scale: 6 / 72
    },
    teleport_portal: {
      file: 'https://urobbyu.github.io/UEngine/img/Teleport/Teleport_portal.png',
      anchor: [16, 0],
      scale: 32 / 72
    }
  },
  actions: `return {
    characterIdle: new Game.AnimationSlideShow(300, 4, 0, 1, gameObj.objects.character, gameObj.sprites.characterIdle),
    characterWalk: new Game.AnimationSlideShow(100, 12, 0, 1, gameObj.objects.character, gameObj.sprites.characterWalk),
    characterRun: new Game.AnimationSlideShow(100, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterRun),
    characterJump: new Game.AnimationSlideShow(130, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterJump),
    characterAttack1: new Game.AnimationSlideShow(80, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterAttack1, [0, 1, 2, 3, 4, 5], obj => {
      delete obj.isLocked;
      if (gameObj.keyShift) {
        if (gameObj.keyA) {
          gameObj.actions.characterRun.start();
					gameObj.world.camera.move(-0.75, 0);
        } else if (gameObj.keyD) {
          gameObj.actions.characterRun.start();
					gameObj.world.camera.move(0.75, 0);
        } else
          gameObj.actions.characterIdle.start();
      } else {
        if (gameObj.keyA) {
          gameObj.actions.characterWalk.start();
					gameObj.world.camera.move(-0.32, 0);
        } else if (gameObj.keyD) {
          gameObj.actions.characterWalk.start();
					gameObj.world.camera.move(0.32, 0);
        } else
          gameObj.actions.characterIdle.start();
      }
    }),
    characterAttack2: new Game.AnimationSlideShow(80, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterAttack2, [0, 1, 2, 3, 4, 5], obj => {
      delete obj.isLocked;
      if (gameObj.keyShift) {
        if (gameObj.keyA) {
          gameObj.actions.characterRun.start();
					gameObj.world.camera.move(-0.75, 0);
        } else if (gameObj.keyD) {
          gameObj.actions.characterRun.start();
					gameObj.world.camera.move(0.75, 0);
        } else
          gameObj.actions.characterIdle.start();
      } else {
        if (gameObj.keyA) {
          gameObj.actions.characterWalk.start();
					gameObj.world.camera.move(-0.32, 0);
        } else if (gameObj.keyD) {
          gameObj.actions.characterWalk.start();
					gameObj.world.camera.move(0.32, 0);
        } else
          gameObj.actions.characterIdle.start();
      }
    }),
    characterAttack3: new Game.AnimationSlideShow(100, 6, 0, 1, gameObj.objects.character, gameObj.sprites.characterAttack3, [0, 1, 2, 3, 4, 5], obj => {
      delete obj.isLocked;
      gameObj.world.camera.speed.x = 0
      if (gameObj.keyShift) {
        if (gameObj.keyA) {
          gameObj.actions.characterRun.start();
					gameObj.world.camera.move(-0.75, 0);
        } else if (gameObj.keyD) {
          gameObj.actions.characterRun.start();
					gameObj.world.camera.move(0.75, 0);
        } else
          gameObj.actions.characterIdle.start();
      } else {
        if (gameObj.keyA) {
          gameObj.actions.characterWalk.start();
					gameObj.world.camera.move(-0.32, 0);
        } else if (gameObj.keyD) {
          gameObj.actions.characterWalk.start();
					gameObj.world.camera.move(0.32, 0);
        } else
          gameObj.actions.characterIdle.start();
      }
    }),
    chest: new Game.Action(() => {
      if (gameObj.objects.character.position.x + 5 > gameObj.objects.chest.bounds.x1 && gameObj.objects.character.position.x - 5 < gameObj.objects.chest.bounds.x2) {
        gameObj.objects.chest.uniforms.state.value = 1;
      } else {
        gameObj.objects.chest.uniforms.state.value = 0;
      }
    }, 30),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, gameObj.objects.teleport_arc, gameObj.sprites.teleport_arc),
    teleport_keyboard: new Game.Action(() => {
      if (gameObj.objects.character.position.x + 3 > gameObj.objects.teleport_keyboard.bounds.x1 && gameObj.objects.character.position.x - 3 < gameObj.objects.teleport_keyboard.bounds.x2) {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 1;
      } else {
        gameObj.objects.teleport_keyboard.uniforms.state.value = 0;
      }
    }, 30),
    teleport_portalChange: new Game.AnimationSlideShow(50, 18, 0, 1, gameObj.objects.teleport_portal, gameObj.sprites.teleport_portal, [1, 0, 1], obj => {
      if (obj.teleport_portal.portal) {
        obj.step = 2 + obj.portal.types[obj.portal.cur] * 4;
        obj.portal.ready = true;
      }
    }),
    teleport_portalSwitch: new Game.Animation(() => {
      if (gameObj.objects.teleport_portal.portal.ready) {
        if (gameObj.objects.character.position.x + 2 > gameObj.objects.teleport_portal.bounds.x1 && gameObj.objects.character.position.x - 2 < gameObj.objects.teleport_portal.bounds.x2) {
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
    background: new Game.SpritePlane(0, 0, 1000),
    character: new Game.SpriteSlideShow(40, 28, 1, 0, 100),
    chest: new Game.SpriteSwitch(10, 13, 3, 0, 500),
    teleport_arc: new Game.SpriteSlideShow(60, 12, 2, 0, 500),
    teleport_gems:  new Game.SpriteSlideShow(61, 14, 4, 0, 500),
    teleport_keyboard:  new Game.SpriteSwitch(109, 24, 1, 0, 499),
    teleport_portal:  new Game.SpriteSlideShow(80, 13, 18, 6, 500)
  }`,
  postLoad: gameObj => {
    gameObj.world.camera.target = gameObj.objects.character;
    gameObj.objects.teleport_portal.portal = {
      types: {
        forest2: 1,
        forest3: 2,
        forest4: 3
      },
      cur: 'forest2',
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
      if (gameObj.objects.teleport_keyboard.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.teleport_keyboard.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
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
        if (gameObj.objects.teleport_portal.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.teleport_portal.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
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
    gameObj.world.camera.target = gameObj.objects.character;
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
      if (gameObj.objects.chest.position.x < 20 - (3 + gameObj.world.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.chest.position.x > 0 - (4 + gameObj.world.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
        gameObj.objects.chest.uniforms.state.value = 1;
      } else {
        gameObj.objects.chest.uniforms.state.value = 0;
      }
    }, 30),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, gameObj.objects.teleport_arc, gameObj.sprites.teleport_arc),
    teleport_keyboard: new Game.Action(() => {
      if (gameObj.objects.teleport_keyboard.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.teleport_keyboard.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
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
        if (gameObj.objects.teleport_portal.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.teleport_portal.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
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
    gameObj.world.camera.target = gameObj.objects.character;
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
      if (gameObj.objects.chest.position.x < 20 - (3 + gameObj.world.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.chest.position.x > 0 - (4 + gameObj.world.camera.target.position.x) * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
        gameObj.objects.chest.uniforms.state.value = 1;
      } else {
        gameObj.objects.chest.uniforms.state.value = 0;
      }
    }, 30),
    teleport_arcIdle: new Game.AnimationSlideShow(1000, 2, 0, 1, gameObj.objects.teleport_arc, gameObj.sprites.teleport_arc),
    teleport_keyboard: new Game.Action(() => {
      if (gameObj.objects.teleport_keyboard.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.teleport_keyboard.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
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
        if (gameObj.objects.teleport_portal.position.x < 20 - 3 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x && gameObj.objects.teleport_portal.position.x > 0 - 4 * gameObj.objects.character.flipX + gameObj.world.camera.target.position.x) {
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
    gameObj.world.camera.target = gameObj.objects.character;
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